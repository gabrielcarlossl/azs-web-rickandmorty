import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';

// Components
import {
  Paper,
  Typography,
  Box,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import BackButton from '../components/button/BackButton';
import AddFavoriteButton from '../components/button/AddFavoriteButton';
import WatchedButton from '../components/button/WatchedButton';
import CharacterCard from '../components/card/CharacterCard';
import PageTitle from '../components/text/PageTitle';
import LinearProgressStyled from '../components/loading/style/LinearProgress';

// Redux
import { useAppSelector } from '../store/configureStore';
import { useDispatch } from 'react-redux';
import { fetchEpisodeByIdRequest } from '../store/episodes/actions';

// Styles
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(4),
  marginTop: theme.spacing(2),
  backgroundColor: '#43454A',
}));

const EpisodeDetailNotFound = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <StyledPaper>
      <Typography variant="h5">
        Episódio com ID: <Typography component='span' fontSize={24} fontWeight={600}>{id}</Typography>  não encontrado.
      </Typography>
    </StyledPaper>
  );
}

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
        episodeDetails?.loading ? (
          <LinearProgressStyled />
        ) : (
          <React.Fragment>
            {
              episodeDetails?.error === null && !episodeDetails?.loading && !episodeData ? (<EpisodeDetailNotFound />) :
                <StyledPaper>
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
                        {episodeData?.episode} - {episodeData?.name}
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
                      Personagens:
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
                </StyledPaper>
            }
          </React.Fragment>

        )
      }

    </Box>
  )
}

export default EpisodeDetails