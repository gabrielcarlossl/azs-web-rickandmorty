import { addFavoriteEpisode, removeFavoriteEpisode, addWatchedEpisode, removeWatchedEpisode } from '../store/episodes/actions';
import type { Episode } from '../store/episodes/types';
import type { Dispatch } from 'redux';
import { CHARACTER_SPECIES, CHARACTER_STATUS } from './constants';

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

export const translateStatus = (status: string) => {
  switch (status) {
    case CHARACTER_STATUS.alive:
      return 'Vivo';
    case CHARACTER_STATUS.dead:
      return 'Morto';
    case CHARACTER_STATUS.unknown:
      return 'Desconhecido';
    default:
      return status;
  }
}
export const translateSpecies = (species: string) => {
  switch (species) {
    case CHARACTER_SPECIES.human:
      return 'Humano';
    case CHARACTER_SPECIES.alien:
      return 'Alienígena';
    case CHARACTER_SPECIES.humanoid:
      return 'Humanoide';
    case CHARACTER_SPECIES.robot:
      return 'Robô';
    case CHARACTER_SPECIES.unknown:
      return 'Desconhecido';
    case CHARACTER_SPECIES.mythological_creature:
      return 'Criatura Mitológica';
    case CHARACTER_SPECIES.animal:
      return 'Animal';
    case CHARACTER_SPECIES.disease:
      return 'Doença';
    default:
      return species;
  }
}