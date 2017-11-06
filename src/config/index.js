/**
 * App configuration object
 */
const config = {
  api: {},
  version: '1.0.0.alpha.1',
  map: {
    offlineInterval: 70 // minutes
  }
}

config.basename = __PROD__
  ? '/'
  : '/'

/**
 * API base url
 */
config.api.baseUrl = 'https://www.torinometeo.org/api/v1'
config.api.requestTimeout = 1000 * 500

/**
 * request headers used with fetch
 */
config.api.headers = {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
}

export default config
