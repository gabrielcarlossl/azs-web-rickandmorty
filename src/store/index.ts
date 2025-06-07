import { combineReducers } from 'redux'
import { all } from 'redux-saga/effects'

// Reducers
import EpisodesReducer from './episodes/reducer';

// Sagas
import EpisodesSaga from './episodes/sagas';

export function * rootSaga () {
  yield all([
    EpisodesSaga()
  ])
}

export const appReducer = combineReducers({
  episodes: EpisodesReducer
})

const rootReducer = (state: any, action: any) => {
  if (action.type === 'app:RESET_STORE') {
    state = undefined
  }
  return appReducer(state, action)
}

export default rootReducer