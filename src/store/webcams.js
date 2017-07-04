// API

const initialWebcamsData = []

export function webcamsTransformer (data = initialWebcamsData, prevData, action) {
  if (action && (
    action.type === '@@redux-api@webcams_success'
  )) {
    return data || initialWebcamsData
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
