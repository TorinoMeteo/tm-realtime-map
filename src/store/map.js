import moment from 'moment'
import * as Db from 'utils/db'

// ------------------------------------
// Constants
// ------------------------------------
export const LIVE_QUANTITY_CHANGED = 'LIVE_QUANTITY_CHANGED'
export const AIRQUALITY_QUANTITY_CHANGED = 'AIRQUALITY_QUANTITY_CHANGED'
export const HISTORY_QUANTITY_CHANGED = 'HISTORY_QUANTITY_CHANGED'
export const HISTORY_DATE_CHANGED = 'HISTORY_DATE_CHANGED'
export const FORECAST_DATE_CHANGED = 'FORECAST_DATE_CHANGED'
export const VIEW_CHANGED = 'VIEW_CHANGED'
export const WEBCAM_SELECTED = 'WEBCAM_SELECTED'
export const AIRQUALITY_STATION_SELECTED = 'AIRQUALITY_STATION_SELECTED'
export const LIVE_STATION_SELECTED = 'LIVE_STATION_SELECTED'
export const HISTORY_STATION_SELECTED = 'HISTORY_STATION_SELECTED'
export const VIEWPORT_CHANGED = 'VIEWPORT_CHANGED'
export const BOUND_FIT_INIT = 'BOUND_FIT_INIT'
export const RADAR_LIVE_STATUS_CHANGED = 'RADAR_LIVE_STATUS_CHANGED'
export const RADAR_LIVE_PRELOADING_CHANGED = 'RADAR_LIVE_PRELOADING_CHANGED'
export const RADAR_LIVE_IMAGE_CHANGED = 'RADAR_LIVE_IMAGE_CHANGED'
export const RADAR_LIVE_PAUSE_CHANGED = 'RADAR_LIVE_PAUSE_CHANGED'
export const RADAR_LIVE_FREQUENCY_CHANGED = 'RADAR_LIVE_FREQUENCY_CHANGED'
export const RADAR_HISTORY_STATUS_CHANGED = 'RADAR_HISTORY_STATUS_CHANGED'
export const RADAR_HISTORY_PRELOADING_CHANGED = 'RADAR_HISTORY_PRELOADING_CHANGED'
export const RADAR_HISTORY_IMAGE_CHANGED = 'RADAR_HISTORY_IMAGE_CHANGED'
export const RADAR_HISTORY_PAUSE_CHANGED = 'RADAR_HISTORY_PAUSE_CHANGED'
export const RADAR_HISTORY_FREQUENCY_CHANGED = 'RADAR_HISTORY_FREQUENCY_CHANGED'
export const HEATMAP_LIVE_STATUS_CHANGED = 'HEATMAP_LIVE_STATUS_CHANGED'
export const HEATMAP_HISTORY_STATUS_CHANGED = 'HEATMAP_HISTORY_STATUS_CHANGED'

// ------------------------------------
// Actions
// ------------------------------------
export function changeLiveQuantity (quantity) {
  return {
    type    : LIVE_QUANTITY_CHANGED,
    payload : quantity
  }
}

export function changeAirQualityQuantity (quantity) {
  return {
    type    : AIRQUALITY_QUANTITY_CHANGED,
    payload : quantity
  }
}

export function changeHistoryQuantity (quantity) {
  return {
    type    : HISTORY_QUANTITY_CHANGED,
    payload : quantity
  }
}

export function changeHistoryDate (year, month, day) {
  return {
    type    : HISTORY_DATE_CHANGED,
    payload : { year, month, day }
  }
}

export function changeForecastDate (date) {
  return {
    type    : FORECAST_DATE_CHANGED,
    payload : { date }
  }
}

export function changeView (view) {
  return {
    type    : VIEW_CHANGED,
    payload : view
  }
}

export function selectWebcam (webcam) {
  return {
    type    : WEBCAM_SELECTED,
    payload : webcam
  }
}

export function selectAirQualityStation (station) {
  return {
    type    : AIRQUALITY_STATION_SELECTED,
    payload : station
  }
}

export function selectLiveStation (stationData) {
  return {
    type    : LIVE_STATION_SELECTED,
    payload : stationData
  }
}

export function selectHistoryStation (stationData) {
  return {
    type    : HISTORY_STATION_SELECTED,
    payload : stationData
  }
}

export function changeMapViewport ({ center, zoom }) {
  return {
    type    : VIEWPORT_CHANGED,
    payload : { center, zoom }
  }
}

export function setInitBoundFit () {
  return {
    type    : BOUND_FIT_INIT,
    payload : null
  }
}

export function changeLiveRadarImage (image) {
  return {
    type    : RADAR_LIVE_IMAGE_CHANGED,
    payload : image
  }
}

export function changeLiveRadarPause (pause) {
  return {
    type    : RADAR_LIVE_PAUSE_CHANGED,
    payload : pause
  }
}

export function changeLiveRadarFrequency (freq) {
  return {
    type    : RADAR_LIVE_FREQUENCY_CHANGED,
    payload : freq
  }
}

export function changeLiveRadarStatus (active) {
  return {
    type    : RADAR_LIVE_STATUS_CHANGED,
    payload : active
  }
}

export function changeLiveRadarPreloading (preloading) {
  return {
    type    : RADAR_LIVE_PRELOADING_CHANGED,
    payload : preloading
  }
}

export function changeHistoryRadarImage (image) {
  return {
    type    : RADAR_HISTORY_IMAGE_CHANGED,
    payload : image
  }
}

export function changeHistoryRadarPause (pause) {
  return {
    type    : RADAR_HISTORY_PAUSE_CHANGED,
    payload : pause
  }
}

export function changeHistoryRadarFrequency (freq) {
  return {
    type    : RADAR_HISTORY_FREQUENCY_CHANGED,
    payload : freq
  }
}

export function changeHistoryRadarStatus (active) {
  return {
    type    : RADAR_HISTORY_STATUS_CHANGED,
    payload : active
  }
}

export function changeHistoryRadarPreloading (preloading) {
  return {
    type    : RADAR_HISTORY_PRELOADING_CHANGED,
    payload : preloading
  }
}

export function changeLiveHeatMapStatus (active) {
  return {
    type    : HEATMAP_LIVE_STATUS_CHANGED,
    payload : active
  }
}

export function changeHistoryHeatMapStatus (active) {
  return {
    type    : HEATMAP_HISTORY_STATUS_CHANGED,
    payload : active
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initLiveStation = Db.get('initLiveStation') || null
const yesterday = moment().subtract(1, 'day')
const initialState = {
  view: 'live',
  center: initLiveStation
    ? { lat: parseFloat(initLiveStation.lat), lng: parseFloat(initLiveStation.lng) }
    : { lat: 45.397, lng: 7.644 },
  zoom: initLiveStation ? 13 : 5,
  boundFit: initLiveStation !== null, // no need to set bounds if station is selected
  live: {
    quantity: 'temperature',
    selected: initLiveStation || null,
    radar: {
      active: false,
      preloading: false,
      image: null,
      pause: false,
      frequency: 500 // ms OK it's not a real frequency
    },
    heatmap: {
      active: false
    }
  },
  history: {
    quantity: 'temperature_mean',
    year: yesterday.format('Y'),
    month: yesterday.format('M'),
    day: yesterday.format('D'),
    selected: null,
    radar: {
      active: false,
      preloading: false,
      image: null,
      pause: false,
      frequency: 500 // ms OK it's not a real frequency
    },
    heatmap: {
      active: false
    }
  },
  forecast: {
    date: moment(new Date()).add(1, 'days')
  },
  webcams: {
    selected: null
  },
  airquality: {
    quantity: 'air_quality_index',
    selected: null
  }
}
export default function mapReducer (state = initialState, action) {
  if (action.type === LIVE_QUANTITY_CHANGED) {
    return { ...state, live: { ...state.live, quantity: action.payload } }
  } else if (action.type === AIRQUALITY_QUANTITY_CHANGED) {
    return { ...state, airquality: { ...state.airquality, quantity: action.payload } }
  } else if (action.type === HISTORY_QUANTITY_CHANGED) {
    return { ...state, history: { ...state.history, quantity: action.payload } }
  } else if (action.type === VIEW_CHANGED) {
    return { ...state, view: action.payload }
  } else if (action.type === HISTORY_DATE_CHANGED) {
    return { ...state, history: { ...state.history, ...action.payload } }
  } else if (action.type === FORECAST_DATE_CHANGED) {
    return { ...state, forecast: { ...state.forecast, ...action.payload } }
  } else if (action.type === WEBCAM_SELECTED) {
    return { ...state, webcams: { ...state.webcams, selected: action.payload } }
  } else if (action.type === AIRQUALITY_STATION_SELECTED) {
    return { ...state, airquality: { ...state.airquality, selected: action.payload } }
  } else if (action.type === LIVE_STATION_SELECTED) {
    return { ...state, live: { ...state.live, selected: action.payload } }
  } else if (action.type === HISTORY_STATION_SELECTED) {
    return { ...state, history: { ...state.history, selected: action.payload } }
  } else if (action.type === VIEWPORT_CHANGED) {
    return { ...state, center: action.payload.center, zoom: action.payload.zoom }
  } else if (action.type === BOUND_FIT_INIT) {
    return { ...state, boundFit: true }
  } else if (action.type === RADAR_LIVE_STATUS_CHANGED) {
    return {
      ...state,
      live: {
        ...state.live,
        radar: {
          ...state.live.radar,
          active: action.payload,
          preloading: action.payload
        }
      }
    }
  } else if (action.type === RADAR_LIVE_PRELOADING_CHANGED) {
    return { ...state, live: { ...state.live, radar: { ...state.live.radar, preloading: action.payload } } }
  } else if (action.type === RADAR_LIVE_IMAGE_CHANGED) {
    return { ...state, live: { ...state.live, radar: { ...state.live.radar, image: action.payload } } }
  } else if (action.type === RADAR_LIVE_PAUSE_CHANGED) {
    return { ...state, live: { ...state.live, radar: { ...state.live.radar, pause: action.payload } } }
  } else if (action.type === RADAR_LIVE_FREQUENCY_CHANGED) {
    return { ...state, live: { ...state.live, radar: { ...state.live.radar, frequency: action.payload } } }
  } else if (action.type === RADAR_HISTORY_STATUS_CHANGED) {
    return {
      ...state,
      history: {
        ...state.history,
        radar: {
          ...state.history.radar,
          active: action.payload,
          preloading: action.payload
        }
      }
    }
  } else if (action.type === RADAR_HISTORY_PRELOADING_CHANGED) {
    return { ...state, history: { ...state.history, radar: { ...state.history.radar, preloading: action.payload } } }
  } else if (action.type === RADAR_HISTORY_IMAGE_CHANGED) {
    return { ...state, history: { ...state.history, radar: { ...state.history.radar, image: action.payload } } }
  } else if (action.type === RADAR_HISTORY_PAUSE_CHANGED) {
    return { ...state, history: { ...state.history, radar: { ...state.history.radar, pause: action.payload } } }
  } else if (action.type === RADAR_HISTORY_FREQUENCY_CHANGED) {
    return { ...state, history: { ...state.history, radar: { ...state.history.radar, frequency: action.payload } } }
  } else if (action.type === HEATMAP_LIVE_STATUS_CHANGED) {
    return {
      ...state,
      live: {
        ...state.live,
        heatmap: {
          ...state.live.heatmap,
          active: action.payload
        }
      }
    }
  } else if (action.type === HEATMAP_HISTORY_STATUS_CHANGED) {
    return {
      ...state,
      history: {
        ...state.history,
        heatmap: {
          ...state.history.heatmap,
          active: action.payload
        }
      }
    }
  }

  return state
}
