import React from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import type { Episode } from '../../store/episodes/types';
import { useDispatch } from 'react-redux';
import { handleWatched, isWatched } from '../../utils/functions';
import LiveTvRoundedIcon from '@mui/icons-material/LiveTvRounded';
import QueuePlayNextRoundedIcon from '@mui/icons-material/QueuePlayNextRounded';

type WatchedButtonProps = {
  episodeData: Episode;
  watched: Episode[];
};

const WatchedButton: React.FC<WatchedButtonProps> = ({ episodeData, watched }) => {
  const dispatch = useDispatch();
  const watchedStatus = isWatched(episodeData.id, watched);

  return (
    <Tooltip title={watchedStatus ? "Desmarcar como visto" : "Marcar como visto"}>
      <IconButton
        aria-label="watched"
        sx={watchedStatus ? { color: "#00B9AE" } : undefined}
        onClick={() => handleWatched(episodeData, watched, dispatch)}
      >
        {watchedStatus ? <LiveTvRoundedIcon /> : <QueuePlayNextRoundedIcon />}
      </IconButton>
    </Tooltip>
  );
};

export default WatchedButton;