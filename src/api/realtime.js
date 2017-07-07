import 'isomorphic-fetch'
import reduxApi from 'redux-api'
import adapterFetch from 'lib/adapters/fetch'
// import adapterFetch from "redux-api/lib/adapters/fetch"
import config from 'config'
import { addBaseApiUrl } from 'decorators/Api'
import {
  realtimeDataTransformer,
  historicDataTransformer,
  radarLiveImagesTransformer,
  radarHistoryImagesTransformer
} from 'store/realtime'

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
    },
    historicData: {
      url: 'realtime/history/:year/:month/:day/',
      options: config.api.headers,
      reducerName: 'history',
      transformer: historicDataTransformer
    },
    liveRadarImages: {
      url: 'realtime/radar/:year/:month/:day/',
      options: config.api.headers,
      reducerName: 'radar',
      transformer: radarLiveImagesTransformer
    },
    historyRadarImages: {
      url: 'realtime/radar/:year/:month/:day/',
      options: config.api.headers,
      reducerName: 'radar',
      transformer: radarHistoryImagesTransformer
    }
  }
))
.use('fetch', adapterFetch(fetch))
