import config from 'config'
import { browserHistory } from 'react-router'

// simulates request timeout
function promiseTimeout (ms, promise) {
  return new Promise(function (resolve, reject) {
    // create a timeout to reject promise if not resolved
    var timer = setTimeout(function () {
      browserHistory.push('/low-bandwidth')
      reject(new Error('promise timeout'))
    }, ms)

    promise
      .then(function (res) {
        clearTimeout(timer)
        resolve(res)
      })
      .catch(function (err) {
        clearTimeout(timer)
        reject(err)
      })
  })
}

export default function adapterFetch (fetch) {
  return function (url, opts) {
    return promiseTimeout(config.api.requestTimeout, fetch(url, { ...opts, redirect: 'manual' }).then(function (resp) {
      return toJSON(resp).then(function (data) {
        if (resp.status >= 200 && resp.status < 300) {
          return data
        } else if (resp.status === 0) {
          // redirect
          // location.href = config.basename
        } else if (resp.status === 404) {
          browserHistory.push('/404')
        } else if (resp.status === 403) {
          browserHistory.push('/403') // login
        } else if (resp.status >= 500) {
          browserHistory.push('/503') // login
        } else {
          return Promise.reject(data)
        }
      })
    }))
  }
}

function toJSON (resp) {
  return resp.text().then(function (data) {
    try {
      return JSON.parse(data)
    } catch (err) {
      return data
    }
  })
}
