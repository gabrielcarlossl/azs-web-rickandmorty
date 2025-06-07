import React, { useEffect } from 'react'

// Assets
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

// Components
import {
  Box,
  Collapse,
  Grid,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography
} from '@mui/material'
import BackButton from '../components/button/BackButton'
import AddFavoriteButton from '../components/button/AddFavoriteButton'
import WatchedButton from '../components/button/WatchedButton'
import CharacterCard from '../components/card/CharacterCard';

// Redux
import { useAppSelector } from '../store/configureStore'
import type { Episode } from '../store/episodes/types'
import { useDispatch } from 'react-redux';
import { fetchEpisodeByIdRequest } from '../store/episodes/actions';

const Favorites = () => {
  const dispatch = useDispatch();
  const { favorites, watched, episodeDetails } = useAppSelector(state => state.episodes)
  const [expandedId, setExpandedId] = React.useState<string | null>(null);
  const [epId, setEpId] = React.useState<string>('');

  const handleExpandClick = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
    setEpId(id);
  };

  useEffect(() => {
    if (epId) {
      dispatch(fetchEpisodeByIdRequest(epId));
    }
  }, [dispatch, epId]);

  return (
    <Box p={4}>
      <BackButton />
      <Typography
        variant="h4"
        my={3}
        gutterBottom
      >
        Episódios Favoritos
      </Typography>
      {
        favorites.length === 0 ? (
          <Typography>
            Nenhum episódio favoritado.
          </Typography>
        ) : (
          <List component={Paper} elevation={3}>
            {
              favorites.map((ep: Episode) => (
                <Box
                  key={ep.id}
                  onClick={() => handleExpandClick(ep.id)}
                  sx={{ cursor: 'pointer' }}
                >
                  <ListItem
                    divider
                    secondaryAction={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <AddFavoriteButton episodeData={ep} favorites={favorites} />
                        <WatchedButton episodeData={ep} watched={watched} />
                        {expandedId === ep.id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                      </Box>
                    }
                  >
                    <ListItemText
                      primary={`${ep.episode} - ${ep.name}`}
                      secondary={
                        <Box component={'span'}
                          style={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}
                        >
                          <Typography component={'span'}>
                            Data de exibição: {ep.air_date}
                          </Typography>
                          <Typography component={'span'}>
                            • {ep.characters.length} personagens
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                  <Collapse in={expandedId === ep.id} timeout="auto" unmountOnExit>
                    <Box sx={{ p: 2 }}>
                      {
                        episodeDetails?.loading ? <LinearProgress /> :
                          <Grid container spacing={2}>
                            {
                              episodeDetails?.data?.characters.map((char) => {
                                return (
                                  <React.Fragment key={char.id}>
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
                                  </React.Fragment>
                                )
                              })
                            }
                          </Grid>
                      }
                    </Box>
                  </Collapse>

                </Box>
              ))
            }
          </List>
        )
      }
    </Box>
  )
}

export default Favorites