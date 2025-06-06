import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';

// Assets
import StarIcon from '@mui/icons-material/Star'
import StarBorderIcon from '@mui/icons-material/StarBorder';

// Components
import {
  Paper,
  Typography,
  Avatar,
  Box,
  LinearProgress,
  Tooltip,
  IconButton
} from '@mui/material';
import Grid from '@mui/material/Grid';
import BackButton from '../components/button/BackButton';

// Redux
import { useAppSelector } from '../store/configureStore';
import { useDispatch } from 'react-redux';
import { fetchEpisodeByIdRequest } from '../store/episodes/actions';

// Utils
import { handleFavorite, isFavorite } from '../utils/functions';

const EpisodeDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { episodeDetails, loading, favorites } = useAppSelector(state => state.episode);
  const episodeData = episodeDetails && episodeDetails.data
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchEpisodeByIdRequest(id));
    }
  }, [dispatch, id]);

  return (
    <Box p={4}>
      <BackButton />
      <Typography variant="h3" gutterBottom>
        Detalhes do Episódio
      </Typography>
      <Paper sx={{ p: 3, mb: 4, mt: 2 }}>
        <React.Fragment>
          {
            loading ? (<LinearProgress />) : (
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
                  <Tooltip
                    title={isFavorite(episodeData?.id, favorites) ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                  >
                    <IconButton
                      onClick={() => episodeData && handleFavorite(episodeData, favorites, dispatch)}
                      aria-label="add to favorites"
                      disabled={!episodeData}
                    >
                      {episodeData && isFavorite(episodeData.id, favorites) ? <StarIcon color="warning" /> : <StarBorderIcon />}
                    </IconButton>
                  </Tooltip>
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
                        <Paper
                          sx={{
                            p: 2,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2
                          }}
                        >
                          <Avatar
                            src={char.image}
                            alt={`Imagem do personagem ${char.name}`}
                            sx={{ width: 64, height: 64 }}
                          />
                          <Box>
                            <Typography variant="subtitle1">{char.name}</Typography>
                            <Typography variant="body2">Espécie: {char.species}</Typography>
                            <Typography variant="body2">Status: {char.status}</Typography>
                          </Box>
                        </Paper>
                      </Grid>
                    ))
                  }
                </Grid>
              </React.Fragment>
            )
          }
        </React.Fragment>
      </Paper>
    </Box>
  )
}

export default EpisodeDetails