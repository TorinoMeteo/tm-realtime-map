// API

const initialRealtimeData = []

export function realtimeDataTransformer (data = initialRealtimeData, prevData, action) {
  if (action && (
    action.type === '@@redux-api@realtimeData_success'
  )) {
    // ready to do custom transformations
    return data || initialRealtimeData
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
