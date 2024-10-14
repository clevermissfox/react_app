import { useState, useEffect, useContext } from 'react';
import ThemeContext from '../context/ThemeContext';

export function useNavbarHeight() {
  const [navbarHeight, setNavbarHeight] = useState(0);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const updateNavbarHeight = () => {
      const navbar = document.querySelector('.nav-bar');
      if (navbar) {
        const height = navbar.offsetHeight;
        setNavbarHeight(height);
        document.documentElement.style.setProperty('--_nav-bar-height', `${height}px`);
      }
    };

    updateNavbarHeight();
    window.addEventListener('resize', updateNavbarHeight);

    return () => window.removeEventListener('resize', updateNavbarHeight);
  }, [theme]); // Re-run when theme changes

  return navbarHeight;
}