import * as React from 'react';
import { useNavigate } from 'react-router-dom';

// Assets
import StarIcon from '@mui/icons-material/Star'
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ShareIcon from '@mui/icons-material/Share';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';

// Components
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Button, Tooltip } from '@mui/material';

// Redux
import { useAppSelector } from '../../store/configureStore';
import type { Episode } from '../../store/episodes/types';
import { useDispatch } from 'react-redux';

// Utils
import { handleFavorite, isFavorite } from '../../utils/functions';

type EpisodeCardProps = {
  episodeData: Episode;
}

const EpisodeCard: React.FC<EpisodeCardProps> = ({
  episodeData
}) => {
  const { favorites } = useAppSelector(state => state.episode);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [copied, setCopied] = React.useState(false);

  const handleSeeMore = () => {
    navigate(`/details/${episodeData.id}`);
  };

  const handleShare = () => {
    const url = `${window?.location?.origin}/details/${episodeData.id}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
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
      <CardActions disableSpacing sx={{ justifyContent: "space-around" }} >
        <Tooltip title={isFavorite(episodeData.id, favorites) ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}>
          <IconButton
            onClick={() => episodeData && handleFavorite(episodeData, favorites, dispatch)}
            aria-label="add to favorites"
            disabled={!episodeData}
          >
            {
              episodeData && isFavorite(episodeData.id, favorites)
                ? <StarIcon color="warning" />
                : <StarBorderIcon />
            }
          </IconButton>
        </Tooltip>
        <Tooltip title={copied ? "Link copiado!" : "Compartilhar"}>
          <IconButton aria-label="share" onClick={handleShare}>
            <ShareIcon />
          </IconButton>
        </Tooltip>
        <Button
          variant="outlined"
          size="small"
          onClick={handleSeeMore}
          aria-label="show more"
        >
          Ver mais
        </Button>
      </CardActions>
    </Card>
  )
}

export default EpisodeCard