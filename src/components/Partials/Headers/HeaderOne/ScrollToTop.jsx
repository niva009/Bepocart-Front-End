import { useEffect } from 'react';
import { useLocation, Outlet } from 'react-router-dom';

const ScrollToTopWrapper = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return <Outlet />;
};

export default ScrollToTopWrapper;
