import React, { useEffect, useState } from 'react';

// Assets
import ClearIcon from '@mui/icons-material/Clear';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import LiveTvIcon from '@mui/icons-material/LiveTv';

// Components
import { Badge, Box, IconButton, InputAdornment, Pagination, TextField, Tooltip, Typography } from '@mui/material'
import EpisodeCard from '../components/card/EpisodeCard';
import CardsLoading from '../components/loading/CardsLoading';

// Redux
import { useDispatch } from 'react-redux';
import { fetchEpisodesRequest } from '../store/episodes/actions';
import { useAppSelector } from '../store/configureStore';
import type { Episode } from '../store/episodes/types';
import PageTitle from '../components/text/PageTitle';
import ButtonStyled from '../components/button/style/ButtonStyled';
import { useScrollToTopOnChange } from '../hooks/useScrollToTop';

const Home = () => {
  const dispatch = useDispatch();
  const { data, loading, error, watched } = useAppSelector(state => state.episodes);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [searchNotFound, setSearchNotFound] = useState<string>('');
  const [query, setQuery] = useState('');
  const emptySearchList = data?.results.length === 0
  
  useEffect(() => {
    dispatch(fetchEpisodesRequest(currentPage, query));
  }, [dispatch, currentPage, query]);

  useScrollToTopOnChange(currentPage);

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
    setSearchNotFound(search);

  };

  const handleClear = () => {
    setSearch('');
    setQuery('');
    setCurrentPage(1);
    setSearchNotFound('');
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
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          '.MuiBadge-badge': {
            background: '#00B9AE'
          }
        }}
        >
          <PageTitle variant="h2" mb={0} gutterBottom>
            Lista de Episódios
          </PageTitle>
          <Tooltip title="Episódios vistos">
            <Badge badgeContent={watched?.length ?? 0} color="primary">
              <LiveTvIcon sx={{ fontSize: '30px' }} />
            </Badge>
          </Tooltip>
        </Box>

        <Box display="flex" my={2} gap={2}>
          <TextField
            sx={{
              background: '#3D4345',
              borderRadius: '10px',
              '.MuiFormLabel-root': {
                color: '#F9F9F9 !important',
              },
              'input': {
                color: '#F9F9F9 !important',
              },
              outline: 'none'

            }}
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
          <Tooltip title="Buscar">
            <ButtonStyled
              disabled={loading}
              variant="contained"
              onClick={handleSearch}>
              <SearchRoundedIcon />
            </ButtonStyled>
          </Tooltip>
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
                          color: '#00B9AE',
                          fontWeight: 600,
                          marginLeft: 4,
                          fontStyle: 'italic',
                          fontSize: '20px',
                        }}
                      >
                        {searchNotFound}
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
              <Box
                mt={3} display="flex" justifyContent="center">
                <Pagination
                  sx={{
                    '.MuiPaginationItem-root': {
                      color: '#F9F9F9 !important',
                    },
                    '.Mui-selected': {
                      background: '#00B9AE !important',
                    }
                  }}
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