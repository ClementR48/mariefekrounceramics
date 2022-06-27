import React, { useRef } from "react";
import "./Thanks.scss";

const Thanks = ({ setThanks, error, setError }) => {
  let cursorRef = useRef();

  const mousepos = (e) => {
    cursorRef.current.setAttribute(
      "style",
      `top:${e.clientY - 40}px ; left:${e.clientX - 40}px; opacity:1`
    );
  };
  return (
    <div
      onMouseMove={mousepos}
      onClick={() =>{
        setThanks(false)
        setError(false)
      } }
      className="thanks"
    >
      <div className="container">
        <div ref={cursorRef} className="cursor">
          <span>{error ? "Revenir au site" : "à bientôt"}</span>
        </div>
        {error ? (
          <span>
            Malheureusement une erreur s'est produite. <br /> Veuillez réessayer
            dans quelques instants. <br />{" "}
          </span>
        ) : (
          <p>
            <span>Merci pour votre commande :)</span>
            <br /> Vous allez bientôt recevoir un mail de confirmation. <br />
            Votre pièce sera emballée avec amour et expédiée dans les prochains
            jours.
          </p>
        )}
      </div>
    </div>
  );
};

export default Thanks;
