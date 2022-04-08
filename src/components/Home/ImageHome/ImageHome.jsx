import React from "react";
import './ImageHome.scss';
import imgDesktop from "../../../assets/images/imageHome1900.jpg";
import imgTablet from "../../../assets/images/imageHome800.jpg";
import imgMobile from "../../../assets/images/imageHome500.jpg";


const ImageHome = () => {
  return (
    <div className="image-home-container">

      <picture >
        <source srcSet={imgDesktop} media="(min-width: 800px)" />
        <source srcSet={imgTablet} media="(min-width: 500px)" />
        <img src={imgMobile} alt="vases" />
      </picture>
      <div className="text">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="-6548.5 -1361.5 13910 2575"
          height="500px"
          width="1500px"
        >
          <path
            id="curve"
            d=" M -6547 -61.087 Q -4237.024 -2651.516 125.459 -75.839 Q 4487.942 2499.839 7360 -75.839 L 7360 -75.839 L 7360 -75.839"
            fill="none"
            stroke="transparent"
          />
          <text x="7%" filter="blur(10px)">
            <animate
              attributeName="x"
              from="100%"
              to="7%"
              begin="0s"
              dur="2s"
            />

            <textPath
              fontSize="500"
              fontFamily="'Inconsolata', monospace"
              fill="white"
              letterSpacing="350px"
              href="#curve"
            >
              LA C&#201;RAMIQUE INSPIR&#201;E
            </textPath>
          </text>
        </svg>
      </div>
    </div>
  );
};

export default ImageHome;
