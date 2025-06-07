import React from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import type { Episode } from '../../store/episodes/types';
import { useDispatch } from 'react-redux';
import { handleWatched, isWatched } from '../../utils/functions';
import RemoveFromQueueIcon from '@mui/icons-material/RemoveFromQueue';
import QueuePlayNextIcon from '@mui/icons-material/QueuePlayNext';

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
        color={watchedStatus ? "success" : "default"}
        onClick={() => handleWatched(episodeData, watched, dispatch)}
      >
        {watchedStatus ? <RemoveFromQueueIcon /> : <QueuePlayNextIcon />}
      </IconButton>
    </Tooltip>
  );
};

export default WatchedButton;