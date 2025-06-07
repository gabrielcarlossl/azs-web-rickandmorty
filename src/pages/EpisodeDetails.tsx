import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';

// Components
import {
  Paper,
  Typography,
  Box,
  LinearProgress,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import BackButton from '../components/button/BackButton';
import AddFavoriteButton from '../components/button/AddFavoriteButton';
import WatchedButton from '../components/button/WatchedButton';
import CharacterCard from '../components/card/CharacterCard';

// Redux
import { useAppSelector } from '../store/configureStore';
import { useDispatch } from 'react-redux';
import { fetchEpisodeByIdRequest } from '../store/episodes/actions';
import PageTitle from '../components/text/PageTitle';


const EpisodeDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { episodeDetails, favorites, watched } = useAppSelector(state => state.episodes);
  const episodeData = episodeDetails && episodeDetails.data
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchEpisodeByIdRequest(id));
    }
  }, [dispatch, id]);

  return (
    <Box p={4} display='flex' flexDirection='column' gap={2}>
      <BackButton />
      <PageTitle variant="h3" gutterBottom>
        Detalhes do Episódio
      </PageTitle>
      {
        episodeDetails?.loading ? (<LinearProgress />) : (
          <Paper sx={{ p: 3, mb: 4, mt: 2 }}>
            <React.Fragment>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mb: 2,
                  gap: 1
                }}
              >
                <Typography variant="h4" m={0} gutterBottom>
                  {episodeData?.name}
                </Typography>
                {
                  episodeData && (
                    <React.Fragment>
                      <AddFavoriteButton episodeData={episodeData} favorites={favorites} />
                      <WatchedButton
                        episodeData={episodeData} watched={watched} />
                    </React.Fragment>
                  )
                }
              </Box>
              <Typography variant="subtitle1" gutterBottom>
                Data de exibição: {episodeData?.air_date}
              </Typography>
              <Typography variant="h5" gutterBottom>
                Personagens
              </Typography>
              <Grid container spacing={2}>
                {
                  episodeData?.characters.map((char) => (
                    <Grid
                      size={{
                        xs: 12,
                        sm: 6,
                        md: 4,
                        lg: 3
                      }}
                      key={char.id}
                    >
                      <CharacterCard characters={char} />
                    </Grid>
                  ))
                }
              </Grid>
            </React.Fragment>
          </Paper>
        )
      }

    </Box>
  )
}

export default EpisodeDetails