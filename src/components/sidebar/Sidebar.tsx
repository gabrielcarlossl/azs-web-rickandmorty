import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';

export const Sidebar = [
  {
    title: 'Episódios',
    path: '/',
    icon: <HomeRoundedIcon sx={{fontSize: 40}} />,
    cName: 'nav-text'
  },
  {
    title: 'Favoritos',
    path: '/favorite-episodes',
    icon: <StarBorderRoundedIcon sx={{fontSize: 40}} />,
    cName: 'nav-text'
  }
]