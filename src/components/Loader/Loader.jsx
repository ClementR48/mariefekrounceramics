import React from "react";
import "./Loader.scss";

import imgMobile from "../../assets/images/logoRose.webp";

const Loader = () => {
  return (
    <div className="loader">
      <img src={imgMobile} alt="vases" />
    </div>
  );
};

export default Loader;
