import {
  FETCH_EPISODES_REQUEST,
  FETCH_EPISODES_SUCCESS,
  FETCH_EPISODES_FAILURE,
  ADD_FAVORITE_EPISODE,
  REMOVE_FAVORITE_EPISODE,
  type EpisodesActions,
  type Episode
} from './types';

const initialState = {
  data: null,
  loading: false,
  error: null,
  favorites: []
};

const EpisodesReducer = (state = initialState, action: EpisodesActions) => {
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
    default:
      return state;
  }
};

export default EpisodesReducer;
