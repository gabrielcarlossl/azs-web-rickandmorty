import HomeIcon from '@mui/icons-material/Home';
import StarIcon from '@mui/icons-material/Star';
export const Sidebar = [
  {
    title: 'Home',
    path: '/',
    icon: <HomeIcon />,
    cName: 'nav-text'
  },
  {
    title: 'Episódios Favoritos',
    path: '/favorite-episodes',
    icon: <StarIcon />,
    cName: 'nav-text'
  }
]