import { Box } from '@mui/material'
import PageTitle from '../components/text/PageTitle'
import NotFound404Image from '../assets/images/404.svg'


const NotFoundPage = () => {
  return (
    <Box
    display={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: '20px',
    }}
    sx={{
      'img': {
        width: '100%',
        maxWidth: '500px'
      }
    }}
    >
      <PageTitle variant='h1'>
        Essa página não existe
      </PageTitle>
      <img src={NotFound404Image} alt="Imagem de erro 404"  />
    </Box>
  )
}

export default NotFoundPage