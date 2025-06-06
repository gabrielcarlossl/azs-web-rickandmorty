import { combineReducers } from 'redux'
import { all } from 'redux-saga/effects'

// Reducers


// Sagas

export function * rootSaga () {
  yield all([

  ])
}

const Reducer = (state = {}, action: any) => state;

export const appReducer = combineReducers({
  appStore: Reducer
})

const rootReducer = (state: any, action: any) => {
  if (action.type === 'app:RESET_STORE') {
    state = undefined
  }
  return appReducer(state, action)
}

export default rootReducer