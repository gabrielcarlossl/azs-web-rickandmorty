import * as React from 'react';
import { useNavigate } from 'react-router-dom';

// Assets
import ShareIcon from '@mui/icons-material/Share';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';

// Components
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Box, Button, Tooltip } from '@mui/material';

// Redux
import { useAppSelector } from '../../store/configureStore';
import type { Episode } from '../../store/episodes/types';

// Utils
import AddFavoriteButton from '../button/AddFavoriteButton';
import WatchedButton from '../button/WatchedButton';

type EpisodeCardProps = {
  episodeData: Episode;
}

const EpisodeCard: React.FC<EpisodeCardProps> = ({
  episodeData
}) => {
  const { favorites, watched } = useAppSelector(state => state.episodes);
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
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <CardHeader
          title={episodeData?.episode}
          subheader={episodeData?.air_date}
        />
        <WatchedButton episodeData={episodeData} watched={watched} />
      </Box>
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
        <AddFavoriteButton episodeData={episodeData} favorites={favorites} />
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