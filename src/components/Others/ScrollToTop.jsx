import { useEffect } from 'react';

const ScrollToTop = ({location = ""}) => {
  
  const onTop = () => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 1000)
    
  }
  useEffect(() => {
    onTop()
  }, [location.pathname]);
  return (
    null
  );
};

export default ScrollToTop;
