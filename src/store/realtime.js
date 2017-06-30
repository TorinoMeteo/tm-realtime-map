import { isOffline } from 'utils/map'
// API

const initialRealtimeData = { data: [], stations: [] }

export function realtimeDataTransformer (data = initialRealtimeData, prevData, action) {
  if (action && (
    action.type === '@@redux-api@realtime_success'
  )) {
    // ready to do custom transformations
    if (data) {
      return {
        data: data.map((obj) => (
          {
            ...obj,
            wind: obj.wind_strength + ' ' + obj.wind_dir_text,
            wind_max: obj.wind_strength_max + ' ' + obj.wind_dir_max_text
          }
        )),
        stations: data.map((obj) => (
          {
            ...obj.station,
            offline: isOffline(obj)
          }
        ))
      }
    } else {
      return initialRealtimeData
    }
  }
  return data
}

const initialHistoricData = []

export function historicDataTransformer (data = initialHistoricData, prevData, action) {
  if (action && (
    action.type === '@@redux-api@history_success'
  )) {
    // ready to do custom transformations
    return data || initialHistoricData
  }
  return data
}

// ------------------------------------
// Constants
// ------------------------------------

// ------------------------------------
// Actions
// ------------------------------------

// ------------------------------------
// Reducer
// ------------------------------------
