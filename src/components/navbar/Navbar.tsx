import React, { useRef, useEffect, useState } from 'react'

// Assets
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import logo from '../../assets/images/logo.png'

// Components
import { Link } from 'react-router-dom';
import { Sidebar } from '../sidebar/Sidebar';
import {
  Box,
  Tooltip,
  Typography,
  IconButton
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Utils
import { useLatestGithubTag } from '../../hooks/useLatestGitHubTag';


const NavbarContainer = styled('div')(() => ({
  backgroundColor: '#212121',
  height: 80,
  display: 'flex',
  justifyContent: 'start',
  alignItems: 'center',
  position: 'fixed',
  width: '100%',
  zIndex: 2000,
}));

const MenuBars = styled(Link)({
  marginLeft: '2rem',
  fontSize: '2rem',
  background: 'none',
  display: 'flex',
  alignItems: 'center',
});

const NavMenu = styled('nav')<{ active: boolean }>(({ active }) => ({
  backgroundColor: '#6A1B9A',
  width: 250,
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  position: 'fixed',
  top: 0,
  left: active ? 0 : '-100%',
  transition: active ? 'left 350ms' : 'left 850ms',
  zIndex: 2000,
  flexDirection: 'column',
}));

const NavMenuItems = styled('ul')({
  width: '100%',
  padding: 0,
  margin: 0,
  listStyle: 'none',
});

const NavbarToggle = styled('li')({
  backgroundColor: '#6A1B9A',
  width: '100%',
  height: 80,
  display: 'flex',
  justifyContent: 'start',
  alignItems: 'center',
});

const NavText = styled('li')({
  display: 'flex',
  justifyContent: 'start',
  alignItems: 'center',
  padding: '8px 0px 8px 16px',
  listStyle: 'none',
  '& a': {
    textDecoration: 'none',
    color: '#00FF9C',
    fontSize: 24,
    width: '95%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    padding: '6px 16px',
    borderRadius: 4,
    fontWeight: 600,
    transition: 'background 0.2s',
    '&:hover': {
      backgroundColor: '#212121',
    },
  },
});

const VersionSpan = styled('span')({
  color: '#FFEB3B',
  fontWeight: 600,
  marginLeft: 16,
});

const Navbar = () => {
  const [sidebar, setSidebar] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const showSidebar = () => setSidebar(!sidebar);
  const latestTag = useLatestGithubTag('gabrielcarlossl', 'azs-web-rickandmorty');

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sidebar && navRef.current && !navRef.current.contains(event.target as Node)) {
        setSidebar(false);
      }
    }
    if (sidebar) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sidebar]);

  const path = window.location.pathname;

  return (
    <React.Fragment>
      <NavbarContainer>
        <MenuBars to="#">
          <Tooltip title="Menu" placement="right">
            <IconButton onClick={showSidebar} sx={{ color: '#FFEB3B' }}>
              <MenuIcon sx={{ fontSize: 40 }} />
            </IconButton>
          </Tooltip>
        </MenuBars>
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <Link to="/" className='logo'>
            <img src={logo} alt="Logo" width={200} />
          </Link>
        </Box>
      </NavbarContainer>
      <NavMenu ref={navRef} active={sidebar}>
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
          <NavMenuItems onClick={showSidebar}>
            <NavbarToggle>
              <MenuBars to="#">
                <Tooltip title="Fechar Menu" placement="right">
                  <IconButton sx={{ color: '#FFEB3B' }}>
                    <MenuOpenIcon sx={{ fontSize: 40 }} />
                  </IconButton>
                </Tooltip>
              </MenuBars>
            </NavbarToggle>
            {Sidebar.map((item, index) => (
              <NavText key={index} className={item.cName}>
                <Link
                  style={path === item.path ? { backgroundColor: '#212121' } : {}}
                  to={item.path}
                >
                  {item.icon}
                  <span style={{ marginLeft: 16 }}>{item.title}</span>
                </Link>
              </NavText>
            ))}
          </NavMenuItems>
          {latestTag ? (
            <VersionSpan>
              Versão: {latestTag}
            </VersionSpan>
          ) : (
            <Typography textAlign='center' color='#FFEB3B'>
              Carregando versão...
            </Typography>
          )}
        </Box>
      </NavMenu>
    </React.Fragment>
  )
}

export default Navbar