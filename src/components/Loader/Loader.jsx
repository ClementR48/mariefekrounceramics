import React from 'react';
import './Loader.scss';
import imgDesktop from '../../assets/images/logoRose.png'

const Loader = () => {
  return (
    <div className="loader">
      
      <picture >
        <source srcSet={imgDesktop} media="(min-width: 1000px)" />
        
        <img src={imgDesktop} alt="vases" />
      </picture>
      
    </div>
  );
};

export default Loader;