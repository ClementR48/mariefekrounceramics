import React from "react";
import "./Loader.scss";
import imgDesktop from "../../assets/images/logoRoseDesktop.png";
import imgMobile from "../../assets/images/logoRose.png";

const Loader = () => {
  return (
    <div className="loader">
      <picture>
        <source srcSet={imgDesktop} media="(min-width: 700px)" />

        <img src={imgMobile} alt="vases" />
      </picture>
    </div>
  );
};

export default Loader;
