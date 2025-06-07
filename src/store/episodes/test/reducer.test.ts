import { describe, it, expect } from 'vitest'
import EpisodesReducer from '../reducer'
import {
  fetchEpisodesRequest,
  addFavoriteEpisode,
  removeFavoriteEpisode,
  addWatchedEpisode,
  removeWatchedEpisode
} from '../actions'
import type { EpisodesState, Episode } from '../types'

const initialState: EpisodesState = {
  data: null,
  loading: false,
  error: null,
  favorites: [],
  watched: [],
  episodeDetails: {
    data: null,
    loading: false,
    error: null
  }
}

const mockEpisode: Episode = {
  id: '1',
  episode: 'S01E01',
  name: 'Pilot',
  air_date: 'December 2, 2013',
  characters: []
}

describe('EpisodesReducer', () => {
  it('should initialize with the initial state', () => {
    expect(EpisodesReducer(undefined, { type: 'UNKNOWN' } as any)).toEqual(initialState)
  })

  it('should handle fetchEpisodesRequest', () => {
    const nextState = EpisodesReducer(initialState, fetchEpisodesRequest(1, '') as import('../types').EpisodesActions)
    expect(nextState.loading).toBe(true)
    expect(nextState.error).toBeNull()
  })

  it('should add episode to favorites', () => {
    const nextState = EpisodesReducer(initialState, addFavoriteEpisode(mockEpisode) as import('../types').EpisodesActions)
    expect(nextState.favorites).toContainEqual(mockEpisode)
  })

  it('should remove episode from favorites', () => {
    const stateWithFavorite = { ...initialState, favorites: [mockEpisode] }
    const nextState = EpisodesReducer(stateWithFavorite, removeFavoriteEpisode('1') as import('../types').EpisodesActions)
    expect(nextState.favorites).toHaveLength(0)
  })

  it('should add episode to watched', () => {
    const nextState = EpisodesReducer(initialState, addWatchedEpisode(mockEpisode) as import('../types').EpisodesActions)
    expect(nextState.watched).toContainEqual(mockEpisode)
  })

  it('should remove episode from watched', () => {
    const stateWithWatched = { ...initialState, watched: [mockEpisode] }
    const nextState = EpisodesReducer(stateWithWatched, removeWatchedEpisode('1') as import('../types').EpisodesActions)
    expect(nextState.watched).toHaveLength(0)
  })

})