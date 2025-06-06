import { Box, List, ListItem, ListItemText, Paper, Typography, IconButton } from '@mui/material'
import { useAppSelector } from '../store/configureStore'
import { useDispatch } from 'react-redux'
import { removeFavoriteEpisode } from '../store/episodes/actions'
import StarIcon from '@mui/icons-material/Star'
import type { Episode } from '../store/episodes/types'

const Favorites = () => {
  const dispatch = useDispatch()
  const favorites = useAppSelector(state => state.episode.favorites)

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Episódios Favoritos
      </Typography>
      {favorites.length === 0 ? (
        <Typography>Nenhum episódio favoritado.</Typography>
      ) : (
        <List component={Paper} elevation={3}>
          {favorites.map((ep: Episode) => (
            <ListItem key={ep.id} divider
              secondaryAction={
                <IconButton edge="end" onClick={() => dispatch(removeFavoriteEpisode(ep.id))} aria-label="unfavorite">
                  <StarIcon color="warning" />
                </IconButton>
              }
            >
              <ListItemText
                primary={`${ep.episode} - ${ep.name}`}
                secondary={`Data de exibição: ${ep.air_date} | ${ep.characters.length} personagens`}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  )
}

export default Favorites