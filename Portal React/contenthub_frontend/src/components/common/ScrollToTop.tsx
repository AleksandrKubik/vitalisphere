import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Мгновенный скролл наверх при изменении пути
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop; 