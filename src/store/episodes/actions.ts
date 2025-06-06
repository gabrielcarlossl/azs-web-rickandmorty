import {
  FETCH_EPISODES_REQUEST,
  FETCH_EPISODES_SUCCESS,
  FETCH_EPISODES_FAILURE,
  ADD_FAVORITE_EPISODE,
  REMOVE_FAVORITE_EPISODE,
  type EpisodesResponse,
  type Episode,
  FETCH_EPISODE_BY_ID_REQUEST,
  FETCH_EPISODE_BY_ID_SUCCESS,
  FETCH_EPISODE_BY_ID_FAILURE,
  type EpisodeDetails
} from './types';

// Action Creators
export const fetchEpisodesRequest = (page: number, name: string) => ({
  type: FETCH_EPISODES_REQUEST,
  payload: { page, name }
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

export const fetchEpisodeByIdRequest = (id: string) => ({
  type: FETCH_EPISODE_BY_ID_REQUEST,
  payload: { id }
});

export const fetchEpisodeByIdSuccess = (data: EpisodeDetails) => ({
  type: FETCH_EPISODE_BY_ID_SUCCESS,
  payload: data
});

export const fetchEpisodeByIdFailure = (error: string) => ({
  type: FETCH_EPISODE_BY_ID_FAILURE,
  payload: error
});