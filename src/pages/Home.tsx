import React, { useEffect, useState } from 'react';

// Assets
import ClearIcon from '@mui/icons-material/Clear';

// Components
import { Box, Button, IconButton, InputAdornment, Pagination, TextField, Typography } from '@mui/material'
import EpisodeCard from '../components/card/EpisodeCard';
import CardsLoading from '../components/loading/CardsLoading';

// Redux
import { useDispatch } from 'react-redux';
import { fetchEpisodesRequest } from '../store/episodes/actions';
import { useAppSelector } from '../store/configureStore';
import type { Episode } from '../store/episodes/types';

const Home = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useAppSelector(state => state.episodes);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const emptySearchList = data?.results.length === 0

  useEffect(() => {
    dispatch(fetchEpisodesRequest(currentPage, query));
  }, [dispatch, currentPage, query]);

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearch = () => {
    setCurrentPage(1);
    setQuery(search);
  };

  const handleClear = () => {
    setSearch('');
    setQuery('');
    setCurrentPage(1);
  };

  return (
    <Box p={4}>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        mb: 4,
        flexWrap: 'wrap',
      }}>
        <Typography variant="h2" mb={0} gutterBottom>
          Lista de Episódios
        </Typography>

        <Box display="flex" my={2} gap={2}>
          <TextField
            label="Buscar por nome"
            variant="outlined"
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
            InputProps={{
              endAdornment: (
                search && (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Limpar busca"
                      onClick={handleClear}
                      edge="end"
                      disabled={loading}
                    >
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>
                )
              ),
            }}
          />
          <Button
            disabled={loading}
            variant="contained"
            onClick={handleSearch}>
            Buscar
          </Button>
        </Box>
      </Box>

      {
        !loading && !error && data?.results.length === 0 ?
          <Typography component='p' color="error">
            {
              error
                ? error
                : emptySearchList
                  ? (
                    <React.Fragment>
                      Não existe episódio com o nome
                      <Typography
                        component='span'
                        style={{
                          color: '#1976d2',
                          fontWeight: 600,
                          marginLeft: 4,
                          fontStyle: 'italic',
                          fontSize: '20px',
                        }}
                      >
                        {search}
                      </Typography>
                    </React.Fragment>
                  )
                  : 'Não há episódios disponíveis.'
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
          )
      }
    </Box>
  )
}

export default Home