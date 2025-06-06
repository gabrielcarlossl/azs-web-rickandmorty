import { Box, CircularProgress, List, ListItem, ListItemText, Pagination, Paper, Typography } from '@mui/material'
import { useEffect, useState } from 'react';
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

      {loading && <CircularProgress />}

      {error && <Typography color="error">{error}</Typography>}

      {data && (
        <>
          <List component={Paper} elevation={3}>
            {data.results.map((ep: Episode) => (
              <ListItem key={ep.id} divider>
                <ListItemText
                  primary={`${ep.episode} - ${ep.name}`}
                  secondary={`Data de exibição: ${ep.air_date} | ${ep.characters.length} personagens`}
                />
              </ListItem>
            ))}
          </List>

          <Box mt={3} display="flex" justifyContent="center">
            <Pagination
              count={data.info.pages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              shape="rounded"
            />
          </Box>
        </>
      )}
    </Box>
  )
}

export default Home