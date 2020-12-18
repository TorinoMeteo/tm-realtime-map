// API

const initialAirQualityData = []

export function airQualityTransformer (data = initialAirQualityData, prevData, action) {
  if (action && (
    action.type === '@@redux-api@airquality_success'
  )) {
    return data || initialAirQualityData
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
