import { combineReducers } from 'redux'
import locationReducer from './location'
import uiReducer from './ui'
import mapReducer from './map'
import RealtimeApi from 'api/realtime'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    location: locationReducer,
    ui: uiReducer,
    map: mapReducer,
    ...RealtimeApi.reducers,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
