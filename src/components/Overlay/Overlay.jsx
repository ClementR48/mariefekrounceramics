import React from 'react';
import './Overlay.scss'

const Overlay = ({openMenuFunc}) => {
  return (
    <div className='overlay' onClick={() => openMenuFunc()}>
      
    </div>
  );
};

export default Overlay;