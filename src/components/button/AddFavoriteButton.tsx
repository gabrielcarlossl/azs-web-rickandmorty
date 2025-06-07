import { IconButton, Tooltip } from '@mui/material'
import React from 'react'

import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';

import { handleFavorite, isFavorite } from '../../utils/functions';
import type { Episode } from '../../store/episodes/types';
import { useDispatch } from 'react-redux';

type AddFavoriteButtonProps = {
  episodeData: Episode
  favorites: Episode[]
}

const AddFavoriteButton: React.FC<AddFavoriteButtonProps> = ({
  episodeData,
  favorites
}) => {
  const dispatch = useDispatch();
  return (
    <Tooltip title={isFavorite(episodeData.id, favorites) ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}>
      <IconButton
        onClick={() => episodeData && handleFavorite(episodeData, favorites, dispatch)}
        aria-label="add to favorites"
        disabled={!episodeData}
      >
        {
          episodeData && isFavorite(episodeData.id, favorites)
            ? <StarRateRoundedIcon sx={{ color: '#00B9AE' }} />
            : <StarBorderRoundedIcon />
        }
      </IconButton>
    </Tooltip>
  )
}

export default AddFavoriteButton