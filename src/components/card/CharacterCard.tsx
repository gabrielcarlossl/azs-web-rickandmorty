import { Avatar, Box, Paper, Typography } from '@mui/material'
import React from 'react'
import type { CharacterDetails } from '../../store/episodes/types'
import { translateSpecies, translateStatus } from '../../utils/functions'

type CharacterCardProps = {
  characters: CharacterDetails
}

const CharacterCard: React.FC<CharacterCardProps> = ({
characters
}) => {
  return (
    <Paper
      sx={{
        p: 2,
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        background: '#16181E'
      }}
    >
      <Avatar
        src={characters.image}
        alt={`Imagem do personagem ${characters.name}`}
        sx={{ width: 64, height: 64 }}
      />
      <Box>
        <Typography variant="subtitle1" fontWeight={600}>{characters.name}</Typography>
        <Typography variant="body2">Espécie: {translateSpecies(characters.species)}</Typography>
        <Typography variant="body2">Status: {translateStatus(characters.status)}</Typography>
      </Box>
    </Paper>
  )
}

export default CharacterCard