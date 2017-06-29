import config from 'config'

let addBaseApiUrl = function (reduxApiConfig) {
  for (let key in reduxApiConfig) {
    reduxApiConfig[key].url = config.api.baseUrl + '/' + reduxApiConfig[key].url
  }
  return reduxApiConfig
}

export { addBaseApiUrl }
