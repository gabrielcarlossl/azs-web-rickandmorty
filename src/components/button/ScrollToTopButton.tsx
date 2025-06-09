import React, { useEffect, useState } from 'react';
import { Fab, Tooltip, Zoom } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const SCROLL_OFFSET = 100;

const ScrollToTopButton: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > SCROLL_OFFSET);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Zoom in={visible}>
      <Tooltip title="Ir para o topo">
        <Fab
          size="medium"
          onClick={handleClick}
          aria-label="Scroll to top"
          sx={{
            position: 'fixed',
            bottom: 32,
            right: 32,
            zIndex: 1300,
          }}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </Tooltip>
    </Zoom>
  );
};

export default ScrollToTopButton;