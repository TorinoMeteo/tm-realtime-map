import 'isomorphic-fetch'
import reduxApi from 'redux-api'
import adapterFetch from 'lib/adapters/fetch'
// import adapterFetch from "redux-api/lib/adapters/fetch"
import config from 'config'
import { addBaseApiUrl } from 'decorators/Api'
import { realtimeDataTransformer } from 'store/realtime'

/**
 * Realtime API endpoints
 */
export default reduxApi(addBaseApiUrl(
  {
    /**
     * Retrieves all conferences
     */
    realtimeData: {
      url: 'realtime/data/',
      options: config.api.headers,
      reducerName: 'realtime',
      transformer: realtimeDataTransformer
    }
  }
))
.use('fetch', adapterFetch(fetch))
