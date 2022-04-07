import React, { useRef } from "react";
import { Link } from "react-router-dom";
import "./EmptyCart.scss";

const EmptyCart = ({ categories }) => {
  console.log(categories);

  let cursorRef = useRef();

  const mousePos = (e) => {
    cursorRef.current.setAttribute(
      "style",
      `top:${e.pageY - 40}px ; left:${e.pageX - 40}px; opacity:1`
    );
  };

  const mouseLeave = () => {
    cursorRef.current.setAttribute("style", "opacity: 0");
  };

  return (
    <div className="cart_empty">
      <div className="text_empty">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="-6548.5 -1361.5 13910 2575"
          height="250px"
          width="1500px"
        >
          <path
            id="curve"
            d=" M -6547 -61.087 Q -4237.024 -2651.516 125.459 -75.839 Q 4487.942 2499.839 7360 -75.839 L 7360 -75.839 L 7360 -75.839"
            fill="none"
            stroke="none"
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
              fill="rgba(134, 90, 71, 1)"
              letterSpacing="350px"
              href="#curve"
            >
              VOTRE PANIER EST VIDE
            </textPath>
          </text>
        </svg>
      </div>
      <div
        className="carousel-empty"
        onMouseMove={mousePos}
        onMouseLeave={mouseLeave}
      >
        <div className="carousel-container">
          <div className="cursor" ref={cursorRef}>
            <span>Shop</span>
          </div>
          <Link to="/products" className="image-container">
            {categories.map((category) => (
              
                <img key={category.id} src={category.assets[0].url} alt={category.name}></img>
                
              
            ))}
          </Link>
          <Link to="/products" className="image-container second">
            {categories.map((category) => (
              <img src={category.assets[0].url} alt={category.name}></img>
            ))}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;
