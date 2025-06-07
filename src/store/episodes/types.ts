// Action Types
export const FETCH_EPISODES_REQUEST = 'FETCH_EPISODES_REQUEST';
export const FETCH_EPISODES_SUCCESS = 'FETCH_EPISODES_SUCCESS';
export const FETCH_EPISODES_FAILURE = 'FETCH_EPISODES_FAILURE';

export const ADD_FAVORITE_EPISODE = 'ADD_FAVORITE_EPISODE';
export const REMOVE_FAVORITE_EPISODE = 'REMOVE_FAVORITE_EPISODE';

export const ADD_WATCHED_EPISODE = 'ADD_WATCHED_EPISODE';
export const REMOVE_WATCHED_EPISODE = 'REMOVE_WATCHED_EPISODE';

// Episode by ID
export const FETCH_EPISODE_BY_ID_REQUEST = 'FETCH_EPISODE_BY_ID_REQUEST';
export const FETCH_EPISODE_BY_ID_SUCCESS = 'FETCH_EPISODE_BY_ID_SUCCESS';
export const FETCH_EPISODE_BY_ID_FAILURE = 'FETCH_EPISODE_BY_ID_FAILURE';

// Payload Types
export interface FetchEpisodesPayload {
  page: number;
}

export interface CharacterDetails {
  id: string;
  name: string;
  status: string;
  species: string;
  image: string;
}

export interface EpisodeDetails {
  id: string;
  name: string;
  air_date: string;
  episode: string;
  characters: CharacterDetails[];
  loading: false,
  error: null
}

export interface FetchEpisodeByIdRequestAction {
  type: typeof FETCH_EPISODE_BY_ID_REQUEST;
  payload: { id: string };
}

export interface FetchEpisodeByIdSuccessAction {
  type: typeof FETCH_EPISODE_BY_ID_SUCCESS;
  payload: EpisodeDetails;
}

export interface FetchEpisodeByIdFailureAction {
  type: typeof FETCH_EPISODE_BY_ID_FAILURE;
  payload: string;
}

export type EpisodeByIdActions =
  | FetchEpisodeByIdRequestAction
  | FetchEpisodeByIdSuccessAction
  | FetchEpisodeByIdFailureAction;

export type EpisodesActions =
  | FetchEpisodesAction
  | { type: typeof FETCH_EPISODES_SUCCESS; payload: EpisodesResponse }
  | { type: typeof FETCH_EPISODES_FAILURE; payload: string }
  | { type: typeof ADD_FAVORITE_EPISODE; payload: Episode }
  | { type: typeof REMOVE_FAVORITE_EPISODE; payload: string }
  | { type: typeof ADD_WATCHED_EPISODE; payload: Episode }
  | { type: typeof REMOVE_WATCHED_EPISODE; payload: string };

// Sagas Types
export interface FetchEpisodesAction {
  type: typeof FETCH_EPISODES_REQUEST;
  payload: {
    page: number;
    name?: string;
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
  watched: Episode[];
  episodeDetails: {
    data: null,
    loading: false,
    error: null
  }
}
