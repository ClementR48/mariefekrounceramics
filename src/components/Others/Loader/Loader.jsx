import React from "react";
import "./Loader.scss";

import imgMobile from "../../../assets/images/logoRose.webp";

const Loader = ({ bigLoading }) => {
  
  return (
    <div className={bigLoading ? "loader" : "loader small"} >
      <img src={imgMobile} alt="vases" />
    </div>
  );
};

export default Loader;
