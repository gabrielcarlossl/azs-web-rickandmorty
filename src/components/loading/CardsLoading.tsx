import { Box, Skeleton } from '@mui/material'

const CardsLoading = () => {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'center' }}>
      {Array.from(Array(5)).map((_, index) => (
        <Skeleton
          key={index}
          variant='rectangular'
          animation='wave'
          sx={{
            
            height: '540px',
            width: '100%',
            maxWidth: '320px',
            borderRadius: '4px'
          }}
        />
      ))}
    </Box>
  )
}

export default CardsLoading