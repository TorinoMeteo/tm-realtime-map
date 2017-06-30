import moment from 'moment'

// ------------------------------------
// Constants
// ------------------------------------
export const LIVE_QUANTITY_CHANGED = 'LIVE_QUANTITY_CHANGED'
export const HISTORY_QUANTITY_CHANGED = 'HISTORY_QUANTITY_CHANGED'
export const HISTORY_DATE_CHANGED = 'HISTORY_DATE_CHANGED'
export const VIEW_CHANGED = 'VIEW_CHANGED'

// ------------------------------------
// Actions
// ------------------------------------
export function changeLiveQuantity (quantity) {
  return {
    type    : LIVE_QUANTITY_CHANGED,
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

export function changeView (view) {
  return {
    type    : VIEW_CHANGED,
    payload : view
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const yesterday = moment().subtract(1, 'day')
const initialState = {
  view: 'live',
  live: {
    quantity: 'temperature'
  },
  history: {
    quantity: 'temperature_mean',
    year: yesterday.format('Y'),
    month: yesterday.format('M'),
    day: yesterday.format('D')
  }
}
export default function mapReducer (state = initialState, action) {
  if (action.type === LIVE_QUANTITY_CHANGED) {
    return { ...state, live: { ...state.live, quantity: action.payload } }
  } else if (action.type === HISTORY_QUANTITY_CHANGED) {
    return { ...state, history: { ...state.history, quantity: action.payload } }
  } else if (action.type === VIEW_CHANGED) {
    return { ...state, view: action.payload }
  } else if (action.type === HISTORY_DATE_CHANGED) {
    return { ...state, history: { ...state.history, ...action.payload } }
  }

  return state
}
