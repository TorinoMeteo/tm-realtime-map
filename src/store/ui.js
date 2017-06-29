// ------------------------------------
// Constants
// ------------------------------------
export const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR'

// ------------------------------------
// Actions
// ------------------------------------
export function toggleSidebar () {
  return {
    type    : TOGGLE_SIDEBAR,
    payload : null
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  displaySidebar: false
}
export default function uiReducer (state = initialState, action) {
  return action.type === TOGGLE_SIDEBAR
    ? { ...state, displaySidebar: !state.displaySidebar }
    : state
}
