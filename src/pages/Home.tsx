import React, { useEffect, useState } from 'react';

// Components
import { Box, Pagination, Typography } from '@mui/material'
import EpisodeCard from '../components/card/EpisodeCard';
import CardsLoading from '../components/loading/CardsLoading';

// Redux
import { useDispatch } from 'react-redux';
import { fetchEpisodesRequest } from '../store/episodes/actions';
import { useAppSelector } from '../store/configureStore';
import type { Episode } from '../store/episodes/types';

const Home = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useAppSelector(state => state.episode);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchEpisodesRequest(currentPage));
  }, [dispatch, currentPage]);

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };
  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Lista de Episódios
      </Typography>
      {!loading && !error && data?.results.length === 0 ?
        <Typography color="error">
          {
            error ? error : 'Não há episódios disponíveis.'
          }
        </Typography>
        : (
          <React.Fragment>
            {
              loading ? <CardsLoading />
                : <Box
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 4,
                    justifyContent: 'center',
                  }}
                >
                  {
                    data?.results.map((ep: Episode) => {
                      return (
                        <EpisodeCard
                          key={ep.id}
                          episodeData={ep}
                        />
                      )
                    })
                  }
                </Box>
            }
            <Box mt={3} display="flex" justifyContent="center">
              <Pagination
                count={data?.info.pages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                shape="rounded"
              />
            </Box>
          </React.Fragment>
        )}

    </Box>
  )
}

export default Home