import * as React from 'react';
import { useNavigate } from 'react-router-dom';

// Assets
import ShareIcon from '@mui/icons-material/Share';
import RickMortyTvImage from '../../assets/images/rick-and-morty-tv.png'
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';

// Components
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Box, Tooltip } from '@mui/material';

// Redux
import { useAppSelector } from '../../store/configureStore';
import type { Episode } from '../../store/episodes/types';

// Utils
import AddFavoriteButton from '../button/AddFavoriteButton';
import WatchedButton from '../button/WatchedButton';
import ButtonStyled from '../button/style/ButtonStyled';

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
    <Card
      sx={{
        maxWidth: 345,
        background: 'rgba(249, 249, 249, 0.8)',
        borderRadius: '18px',
        padding: '18px 8px 10px 8px'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <CardHeader
          title={
            <Typography
              fontSize='22px'
              color='#16181E'
              fontWeight={800}
              component='span'
            >
              {episodeData?.episode}
            </Typography>
          }
          subheader={episodeData?.air_date}
        />
        <WatchedButton episodeData={episodeData} watched={watched} />
      </Box>
      <img src={RickMortyTvImage} alt="Rick and Morty asssitindo tv" width={330} />
      <CardContent>
        <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '18px', fontWeight: 600 }}>
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
            <ShareIcon sx={{ color: '#00B9AE' }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Ver detalhes do episódio">
          <ButtonStyled

            onClick={handleSeeMore}
            aria-label="show more"
          >
            Ver mais
            <KeyboardArrowRightRoundedIcon sx={{ marginLeft: '4px' }} />
          </ButtonStyled>
        </Tooltip>
      </CardActions>
    </Card>
  )
}

export default EpisodeCard