import 'isomorphic-fetch'
import reduxApi from 'redux-api'
import adapterFetch from 'lib/adapters/fetch'
// import adapterFetch from "redux-api/lib/adapters/fetch"
import config from 'config'
import { addBaseApiUrl } from 'decorators/Api'
import { airQualityTransformer } from 'store/airquality'

/**
 * Realtime API endpoints
 */
export default reduxApi(addBaseApiUrl(
  {
    /**
     * Retrieves all airquality stations
     */
    stations: {
      url: 'realtime/airqualitystations/',
      options: config.api.headers,
      reducerName: 'airquality',
      transformer: airQualityTransformer
    }
  }
))
.use('fetch', adapterFetch(fetch))
