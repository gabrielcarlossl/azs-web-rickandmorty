import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchEpisodesService } from './services';
import {
  fetchEpisodesSuccess,
  fetchEpisodesFailure
} from './actions';
import { FETCH_EPISODES_REQUEST, type EpisodesResponse, type FetchEpisodesAction } from './types';

import type { SagaIterator } from 'redux-saga';

function* fetchEpisodesSaga(action: FetchEpisodesAction): SagaIterator {
  try {
    const { page, name } = action.payload;
    const data: EpisodesResponse = yield call(fetchEpisodesService, page, name);
    yield put(fetchEpisodesSuccess(data));
  } catch (error: unknown) {
    let message = 'Erro ao buscar episódios';
    if (error instanceof Error) {
      message = error.message;
    }
    yield put(fetchEpisodesFailure(message));
  }
}

export default function* EpisodesSaga() {
  yield takeLatest(FETCH_EPISODES_REQUEST, fetchEpisodesSaga);
}
