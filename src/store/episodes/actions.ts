import {
  FETCH_EPISODES_REQUEST,
  FETCH_EPISODES_SUCCESS,
  FETCH_EPISODES_FAILURE,
  type EpisodesResponse
} from './types';

// Action Creators
export const fetchEpisodesRequest = (page: number) => ({
  type: FETCH_EPISODES_REQUEST,
  payload: { page }
});

export const fetchEpisodesSuccess = (data: EpisodesResponse) => {
  return (
    {
      type: FETCH_EPISODES_SUCCESS,
      payload: data
    })
};

export const fetchEpisodesFailure = (error: string) => ({
  type: FETCH_EPISODES_FAILURE,
  payload: error
});
