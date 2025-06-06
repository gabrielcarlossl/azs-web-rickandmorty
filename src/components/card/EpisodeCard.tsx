import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import StarIcon from '@mui/icons-material/Star'
import ShareIcon from '@mui/icons-material/Share';
import { Button, Tooltip } from '@mui/material';
import { useAppSelector } from '../../store/configureStore';
import type { Episode } from '../../store/episodes/types';
import { useDispatch } from 'react-redux';
import { addFavoriteEpisode, removeFavoriteEpisode } from '../../store/episodes/actions';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';

type EpisodeCardProps = {
  episodeData: Episode;
}

const EpisodeCard: React.FC<EpisodeCardProps> = ({
  episodeData
}) => {
  const [seeMore, setSeeMore] = React.useState(false);
  const { favorites } = useAppSelector(state => state.episode);
  const dispatch = useDispatch();

  const handleSeeMore = () => {
    setSeeMore(!seeMore);
  };
  const isFavorite = (id: string) => favorites?.some((ep: Episode) => ep.id === id);

  const handleFavorite = (ep: Episode) => {
    if (isFavorite(ep.id)) {
      dispatch(removeFavoriteEpisode(ep.id));
    } else {
      dispatch(addFavoriteEpisode(ep));
    }
  };
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        title={episodeData?.episode}
        subheader={episodeData?.air_date}
      />
      <OndemandVideoIcon sx={{ fontSize: 320 }} />
      <CardContent>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {episodeData?.name}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {episodeData?.characters?.length} personagens
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Tooltip title={isFavorite(episodeData.id) ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}>
          <IconButton
            onClick={() => episodeData && handleFavorite(episodeData)}
            aria-label="add to favorites"
            disabled={!episodeData}
          >
            {episodeData && isFavorite(episodeData.id) ? <StarIcon color="warning" /> : <StarBorderIcon />}
          </IconButton>
        </Tooltip>
        <Tooltip title="Compartilhar">
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </Tooltip>
        <Button
          variant="outlined"
          size="small"
          onClick={handleSeeMore}
          aria-expanded={seeMore}
          aria-label="show more"
        >
          Ver mais
        </Button>
      </CardActions>

    </Card>
  )
}

export default EpisodeCard