import 'isomorphic-fetch'
import reduxApi from 'redux-api'
import adapterFetch from 'lib/adapters/fetch'
// import adapterFetch from "redux-api/lib/adapters/fetch"
import config from 'config'
import { addBaseApiUrl } from 'decorators/Api'
import { webcamsTransformer } from 'store/webcams'

/**
 * Realtime API endpoints
 */
export default reduxApi(addBaseApiUrl(
  {
    /**
     * Retrieves all conferences
     */
    webcams: {
      url: 'webcam/',
      options: config.api.headers,
      reducerName: 'webcams',
      transformer: webcamsTransformer
    }
  }
))
.use('fetch', adapterFetch(fetch))
