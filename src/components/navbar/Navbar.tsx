import React from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { Link } from 'react-router-dom';
import { Sidebar } from '../sidebar/Sidebar';
import './styles/Navbar.css';
import { Tooltip } from '@mui/material';

const Navbar = () => {

  const [sidebar, setSidebar] = React.useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <React.Fragment>
      <div className="navbar">
        <Link to="#" className='menu-bars'>
          <Tooltip title="Menu" placement="right">
            <MenuIcon sx={{ color: '#FFEB3B', fontSize: 40 }} onClick={showSidebar} />
          </Tooltip>
        </Link>
      </div>
      <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
        <ul className='nav-menu-items' onClick={showSidebar}>
          <li className='navbar-toggle'>
            <Link to="#" className='menu-bars'>
              <Tooltip title="Fechar Menu" placement="right">
                <MenuOpenIcon sx={{ color: '#FFEB3B', fontSize: 40 }} />
              </Tooltip>
            </Link>
          </li>
          {Sidebar.map((item, index) => {
            return (
              <li key={index} className={item.cName}>
                <Link to={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </React.Fragment>
  )
}

export default Navbar