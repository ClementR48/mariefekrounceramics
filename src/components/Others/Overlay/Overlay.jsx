import React, { useRef } from "react";
import { Loader } from "react-feather";
import "./Overlay.scss";

const Overlay = ({ openMenuFunc, openCheckoutFunc }) => {
  const handleClick = () => {
    openCheckoutFunc(false);
    openMenuFunc(false);
  };

  

  let cursorRef = useRef();

  const mousepos = (e) => {
    cursorRef.current.setAttribute(
      "style",
      `top:${e.clientY - 40}px ; left:${e.clientX - 40}px; opacity:1`
    );
  };

  const mouseLeave = () => {
    cursorRef.current.setAttribute("style", "opacity: 0");
  };
  return (
    <div
      className="overlay"
      onMouseLeave={mouseLeave}
      onMouseMove={mousepos}
      onClick={() => handleClick()}
    >
      <div ref={cursorRef} className="cursor">
        <span>retour</span>
      </div>
    </div>
  );
};

export default Overlay;
