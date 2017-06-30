// ------------------------------------
// Constants
// ------------------------------------
export const QUANTITY_CHANGED = 'QUANTITY_CHANGED'

// ------------------------------------
// Actions
// ------------------------------------
export function changeQuantity (quantity) {
  return {
    type    : QUANTITY_CHANGED,
    payload : quantity
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  quantity: 'temperature',
  view: 'live'
}
export default function mapReducer (state = initialState, action) {
  return action.type === QUANTITY_CHANGED
    ? { ...state, quantity: action.payload }
    : state
}
