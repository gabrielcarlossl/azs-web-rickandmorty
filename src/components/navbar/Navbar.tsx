import React, { useRef, useEffect, useState } from 'react'

// Assets
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import logo from '../../assets/images/logo.png'

// Components
import { Link } from 'react-router-dom';
import { Sidebar } from '../sidebar/Sidebar';
import { Box, Tooltip, Typography } from '@mui/material';

// Hooks
import { useLatestGithubTag } from '../../hooks/useLatestGitHubTag';

// Styles
import './styles/Navbar.css';

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
      <div className="navbar">
        <Link to="#" className='menu-bars'>
          <Tooltip title="Menu" placement="right">
            <MenuIcon sx={{ color: '#FFEB3B', fontSize: 40 }} onClick={showSidebar} />
          </Tooltip>
        </Link>
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <Link to="/" className='logo'>
            <img src={logo} alt="Logo" width={200} />
          </Link>
        </Box>
      </div>
      <nav
        ref={navRef}
        className={sidebar ? 'nav-menu active' : 'nav-menu'}
      >
        <ul className='nav-menu-items' onClick={showSidebar}>
          <li className='navbar-toggle'>
            <Link to="#" className='menu-bars'>
              <Tooltip title="Fechar Menu" placement="right">
                <MenuOpenIcon sx={{ color: '#FFEB3B', fontSize: 40 }} />
              </Tooltip>
            </Link>
          </li>
          {
            Sidebar.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link
                    style={path === item.path ? { backgroundColor: '#212121' } : {}}
                    to={item.path}
                  >
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })
          }
        </ul>
        {
          latestTag ? (
            <span style={{ color: '#FFEB3B', fontWeight: 600, marginLeft: 16 }}>
              Versão: {latestTag}
            </span>
          ) : <Typography
            textAlign='center'
            color='#FFEB3B'
          >
            Carregando versão...
          </Typography>
        }
      </nav>
    </React.Fragment>
  )
}

export default Navbar