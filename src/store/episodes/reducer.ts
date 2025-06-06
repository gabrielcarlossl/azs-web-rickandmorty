import {
  FETCH_EPISODES_REQUEST,
  FETCH_EPISODES_SUCCESS,
  FETCH_EPISODES_FAILURE,
  ADD_FAVORITE_EPISODE,
  REMOVE_FAVORITE_EPISODE,
  FETCH_EPISODE_BY_ID_REQUEST,
  FETCH_EPISODE_BY_ID_SUCCESS,
  FETCH_EPISODE_BY_ID_FAILURE,
  type EpisodeByIdActions,
  type EpisodesActions,
  type Episode,
  type EpisodesState
} from './types';

const initialState: EpisodesState = {
  data: null,
  loading: false,
  error: null,
  favorites: [],
  episodeDetails: {
    data: null,
    loading: false,
    error: null
  }
};

const EpisodesReducer = (state = initialState, action: EpisodesActions | EpisodeByIdActions) => {
  switch (action.type) {
    case FETCH_EPISODES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_EPISODES_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false
      };
    case FETCH_EPISODES_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case ADD_FAVORITE_EPISODE:
      if (state?.favorites?.find((ep: Episode) => ep.id === action.payload.id)) {
        return state;
      }
      return {
        ...state,
        favorites: [...state.favorites, action.payload]
      };
    case REMOVE_FAVORITE_EPISODE:
      return {
        ...state,
        favorites: state.favorites.filter((ep: Episode) => ep.id !== action.payload)
      };
    case FETCH_EPISODE_BY_ID_REQUEST:
      return {
        ...state,
        episodeDetails: {
          data: null,
          loading: true,
          error: null
        }
      };
    case FETCH_EPISODE_BY_ID_SUCCESS:
      return {
        ...state,
        episodeDetails: {
          data: action.payload,
          loading: false,
          error: null
        }
      };
    case FETCH_EPISODE_BY_ID_FAILURE:
      return {
        ...state,
        episodeDetails: {
          data: null,
          loading: false,
          error: action.payload
        }
      };
    default:
      return state;
  }
};

export default EpisodesReducer;
