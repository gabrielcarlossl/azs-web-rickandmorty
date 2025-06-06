import {
  FETCH_EPISODES_REQUEST,
  FETCH_EPISODES_SUCCESS,
  FETCH_EPISODES_FAILURE,
  ADD_FAVORITE_EPISODE,
  REMOVE_FAVORITE_EPISODE,
  type EpisodesResponse,
  type Episode
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

export const addFavoriteEpisode = (episode: Episode) => ({
  type: ADD_FAVORITE_EPISODE,
  payload: episode
});

export const removeFavoriteEpisode = (id: string) => ({
  type: REMOVE_FAVORITE_EPISODE,
  payload: id
});
