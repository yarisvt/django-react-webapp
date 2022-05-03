import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useThemeStore } from '../../context/ThemeContext';

import './header.scss';

function Header() {
  const [theme, setTheme] = useThemeStore();
  const [showHome, setShowHome] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  document.getElementById('root').className = theme;

  useEffect(() => {
    setShowHome(location.pathname !== '/');
  }, [location]);

  function toggleTheme() {
    if (theme === 'dark') {
      setTheme('light');
      localStorage.setItem('theme', 'light');
    } else {
      setTheme('dark');
      localStorage.setItem('theme', 'dark');
    }
  }

  return (
    <header>
      {showHome && (
        <a className='link-home' onClick={() => navigate(-1)}>
          &lsaquo; Back
        </a>
      )}
      <button onClick={toggleTheme} className='header-item'>
        <svg
          version='1.1'
          xmlns='http://www.w3.org/2000/svg'
          x='0'
          y='0'
          viewBox='0 0 486.883 486.883'
        >
          <path d='M243.451 0C109.226 0 .001 109.191.001 243.417c0 134.244 109.226 243.466 243.45 243.466s243.431-109.222 243.431-243.466C486.882 109.191 377.676 0 243.451 0zm0 437.958c-.237 0-.479-.033-.716-.033V48.96c.237 0 .479-.035.716-.035 107.247 0 194.506 87.246 194.506 194.492 0 107.265-87.259 194.541-194.506 194.541z' />
        </svg>
      </button>
    </header>
  );
}

export default Header;
