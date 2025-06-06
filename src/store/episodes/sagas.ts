import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchEpisodeByIdService, fetchEpisodesService } from './services';
import {
  fetchEpisodesSuccess,
  fetchEpisodesFailure,
  fetchEpisodeByIdSuccess,
  fetchEpisodeByIdFailure
} from './actions';
import { FETCH_EPISODE_BY_ID_REQUEST, FETCH_EPISODES_REQUEST, type EpisodesResponse, type FetchEpisodeByIdRequestAction, type FetchEpisodesAction } from './types';

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

function* fetchEpisodeByIdSaga(action: FetchEpisodeByIdRequestAction): SagaIterator {
  try {
    const { id } = action.payload;
    const data = yield call(fetchEpisodeByIdService, id);
    yield put(fetchEpisodeByIdSuccess(data));
  } catch (error: any) {
    yield put(fetchEpisodeByIdFailure(error?.message || 'Erro ao buscar episódio'));
  }
}


export default function* EpisodesSaga() {
  yield takeLatest(FETCH_EPISODES_REQUEST, fetchEpisodesSaga);
  yield takeLatest(FETCH_EPISODE_BY_ID_REQUEST, fetchEpisodeByIdSaga);
}
