import React, { useRef } from "react";
import "./Thanks.scss";

const Thanks = ({ setThanks }) => {
  let cursorRef = useRef();

  const mousepos = (e) => {
    cursorRef.current.setAttribute(
      "style",
      `top:${e.clientY - 40}px ; left:${e.clientX - 40}px; opacity:1`
    );
  };
  return (
    <div onMouseMove={mousepos} onClick={() => setThanks(false)}  className="thanks">
      <div className="container">
      <div ref={cursorRef} className="cursor">
              <span>à bientôt</span>
            </div>
        <p>
          <span>Merci pour votre commande :)</span>
          <br /> Vous allez bientôt recevoir un mail de confirmation. <br />
          Votre pièce sera emballée avec amour et expédiée dans les prochains
          jours.
        </p>
      </div>
      
    </div>
  );
};

export default Thanks;
