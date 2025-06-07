import React, { useEffect } from 'react'

// Assets
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

// Components
import {
  Box,
  Collapse,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  Tooltip,
  Typography
} from '@mui/material'
import BackButton from '../components/button/BackButton'
import AddFavoriteButton from '../components/button/AddFavoriteButton'
import WatchedButton from '../components/button/WatchedButton'
import CharacterCard from '../components/card/CharacterCard';
import PageTitle from '../components/text/PageTitle';

// Redux
import { useAppSelector } from '../store/configureStore'
import type { Episode } from '../store/episodes/types'
import { useDispatch } from 'react-redux';
import { fetchEpisodeByIdRequest } from '../store/episodes/actions';
import LinearProgressStyled from '../components/loading/style/LinearProgress';

type ExpandIconButtonProps = {
  expanded: boolean;
  onClick: () => void;
  tooltipExpand?: string;
  tooltipCollapse?: string;
  color?: string;
};

const ExpandIconButton: React.FC<ExpandIconButtonProps> = ({
  expanded,
  onClick,
  tooltipExpand = 'Expandir detalhes',
  tooltipCollapse = 'Recolher detalhes',
  color = '#00B9AE'
}) => (
  <Tooltip title={expanded ? tooltipCollapse : tooltipExpand}>
    <IconButton onClick={onClick} sx={{ color }}>
      {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
    </IconButton>
  </Tooltip>
);

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
      <PageTitle
        variant="h2"
        my={3}
        gutterBottom
      >
        Episódios Favoritos
      </PageTitle>
      {
        favorites.length === 0 ? (
          <Typography>
            Nenhum episódio favoritado.
          </Typography>
        ) : (
          <List component={Paper} elevation={3} sx={{ backgroundColor: '#43454A' }}>
            {
              favorites.map((ep: Episode) => (
                <Box
                  key={ep.id}
                >
                  <ListItem
                    divider
                    secondaryAction={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <AddFavoriteButton episodeData={ep} favorites={favorites} />
                        <WatchedButton episodeData={ep} watched={watched} />
                        {
                          <ExpandIconButton
                            expanded={expandedId === ep.id}
                            onClick={() => handleExpandClick(ep.id)}
                          />
                        }
                      </Box>
                    }
                  >
                    <ListItemText
                      onClick={() => handleExpandClick(ep.id)}
                      sx={{ cursor: 'pointer' }}
                      primary={
                        <Typography fontWeight={500} component={'span'}>
                          {`${ep.episode} - ${ep.name}`}
                        </Typography>
                      }
                      secondary={
                        <Box component={'span'}
                          style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', gap: 5 }}
                        >
                          <Typography component={'span'} display={'flex'} alignItems={'center'}>
                            <Tooltip title='Data de exibição'>
                              <CalendarMonthIcon />
                            </Tooltip>
                            {ep.air_date}
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
                        episodeDetails?.loading ? <LinearProgressStyled /> :
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