// Action Types
export const FETCH_EPISODES_REQUEST = 'FETCH_EPISODES_REQUEST';
export const FETCH_EPISODES_SUCCESS = 'FETCH_EPISODES_SUCCESS';
export const FETCH_EPISODES_FAILURE = 'FETCH_EPISODES_FAILURE';
export const ADD_FAVORITE_EPISODE = 'ADD_FAVORITE_EPISODE';
export const REMOVE_FAVORITE_EPISODE = 'REMOVE_FAVORITE_EPISODE';

// Payload Types
export interface FetchEpisodesPayload {
  page: number;
}
export type EpisodesActions =
  | FetchEpisodesAction
  | { type: typeof FETCH_EPISODES_SUCCESS; payload: EpisodesResponse }
  | { type: typeof FETCH_EPISODES_FAILURE; payload: string }
  | { type: typeof ADD_FAVORITE_EPISODE; payload: Episode }
  | { type: typeof REMOVE_FAVORITE_EPISODE; payload: string };

// Sagas Types
export interface FetchEpisodesAction {
  type: typeof FETCH_EPISODES_REQUEST;
  payload: {
    page: number;
  };
}

export interface Episode {
  id: string;
  episode: string;
  name: string;
  air_date: string;
  characters: { id: string }[];
}

export interface EpisodesResponse {
  info: {
    count: number;
    pages: number;
    next: number | null;
    prev: number | null;
  };
  results: Episode[];
}

// State Type
export interface EpisodesState {
  data: EpisodesResponse | null;
  loading: boolean;
  error: string | null;
  favorites: Episode[];
}
