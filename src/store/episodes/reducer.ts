import {
  FETCH_EPISODES_REQUEST,
  FETCH_EPISODES_SUCCESS,
  FETCH_EPISODES_FAILURE,
  type EpisodesActions
} from './types';

const initialState = {
  data: null,
  loading: false,
  error: null
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
    default:
      return state;
  }
};

export default EpisodesReducer;
