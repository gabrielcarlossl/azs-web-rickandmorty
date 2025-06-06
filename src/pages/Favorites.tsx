// Components
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography
} from '@mui/material'
import BackButton from '../components/button/BackButton'
import AddFavoriteButton from '../components/button/AddFavoriteButton'

// Redux
import { useAppSelector } from '../store/configureStore'
import type { Episode } from '../store/episodes/types'

const Favorites = () => {
  const favorites = useAppSelector(state => state.episode.favorites)

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
                <ListItem key={ep.id} divider
                  secondaryAction={
                    <AddFavoriteButton episodeData={ep} favorites={favorites} />
                  }
                >
                  <ListItemText
                    primary={`${ep.episode} - ${ep.name}`}
                    secondary={`Data de exibição: ${ep.air_date} | ${ep.characters.length} personagens`}
                  />
                </ListItem>
              ))
            }
          </List>
        )
      }
    </Box>
  )
}

export default Favorites