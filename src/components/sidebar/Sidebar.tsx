import HomeIcon from '@mui/icons-material/Home';
import StarIcon from '@mui/icons-material/Star';
export const Sidebar = [
  {
    title: 'Episódios',
    path: '/',
    icon: <HomeIcon sx={{fontSize: 40}} />,
    cName: 'nav-text'
  },
  {
    title: 'Favoritos',
    path: '/favorite-episodes',
    icon: <StarIcon sx={{fontSize: 40}} />,
    cName: 'nav-text'
  }
]