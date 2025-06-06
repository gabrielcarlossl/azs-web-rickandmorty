import axios from 'axios';
import { RICK_AND_MORTY_API } from '../../utils/constants';

export const fetchEpisodesService = async (page: number, name = '') => {
  const query = `
    query($page: Int!, $name: String) {
      episodes(page: $page, filter: { name: $name }) {
        info {
          count
          pages
          next
          prev
        }
        results {
          id
          episode
          name
          air_date
          characters {
            id
          }
        }
      }
    }
  `;

  const response = await axios.post(
    RICK_AND_MORTY_API,
    { query, variables: { page, name } },
    { headers: { 'Content-Type': 'application/json' } }
  );

  return response.data.data.episodes;
};

export const fetchEpisodeByIdService = async (id: string) => {
  const query = `
    query($id: ID!) {
      episode(id: $id) {
        id
        name
        air_date
        episode
        characters {
          id
          name
          status
          species
          image
        }
      }
    }
  `;
  const response = await axios.post(
    RICK_AND_MORTY_API,
    { query, variables: { id } },
    { headers: { 'Content-Type': 'application/json' } }
  );
  return response.data.data.episode;
};