import { addFavoriteEpisode, removeFavoriteEpisode } from '../store/episodes/actions';
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