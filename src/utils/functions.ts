import { addFavoriteEpisode, removeFavoriteEpisode, addWatchedEpisode, removeWatchedEpisode } from '../store/episodes/actions';
import type { Episode } from '../store/episodes/types';
import type { Dispatch } from 'redux';

export const isFavorite = (id: string | undefined, favorites: Episode[]) => favorites?.some((ep: Episode) => ep.id === id);

export function handleFavorite(ep: Episode, favorites: Episode[], dispatch: Dispatch) {
  if (isFavorite(ep.id, favorites)) {
    dispatch(removeFavoriteEpisode(ep.id));
  } else {
    dispatch(addFavoriteEpisode(ep));
  }
};

export const isWatched = (id: string | undefined, watched: Episode[]) => watched?.some((ep: Episode) => ep.id === id);

export function handleWatched(ep: Episode, watched: Episode[], dispatch: Dispatch) {
  if (isWatched(ep.id, watched)) {
    dispatch(removeWatchedEpisode(ep.id));
  } else {
    dispatch(addWatchedEpisode(ep));
  }
}