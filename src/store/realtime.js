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

const initialWeatherForecstData = []

export function weatherForecastDataTransformer (data = initialWeatherForecstData, prevData, action) {
  if (action && (
    action.type === '@@redux-api@weatherForecast_success'
  )) {
    // ready to do custom transformations
    return data || initialWeatherForecstData
  }
  return data
}

const initialRadarImages = {
  live: [],
  history: []
}

export function radarLiveImagesTransformer (data = initialRadarImages, prevData, action) {
  if (action && (
    action.type === '@@redux-api@radar_success'
  )) {
    // ready to do custom transformations
    return { ...prevData, live: data }
  }
  return data
}

export function radarHistoryImagesTransformer (data = initialRadarImages, prevData, action) {
  if (action && (
    action.type === '@@redux-api@radar_success'
  )) {
    // ready to do custom transformations
    return { ...prevData, history: data }
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
