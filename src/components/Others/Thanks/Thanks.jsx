import React, { useRef } from "react";
import "./Thanks.scss";

const Thanks = ({ thanks, setThanks }) => {
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
      onClick={() => {
        setThanks({ isValid: false, error: false, delivery: false });
      }}
      className="thanks"
    >
      <div className="container">
        <div ref={cursorRef} className="cursor">
          <span>{thanks.error ? "Revenir au site" : "à bientôt"}</span>
        </div>
        {thanks.error ? (
          <span>
            Malheureusement une erreur s'est produite. <br /> Veuillez réessayer
            dans quelques instants. <br />{" "}
          </span>
        ) : (
          <p>
            <span>Merci pour votre commande :)</span>
            <br /> Vous allez bientôt recevoir un mail de confirmation. <br />
            {thanks.delivery === "true"
              ? "Votre pièce sera emballée avec amour et expédiée dans les prochains jours."
              : "Pour la remise en main propre, je viendrai vers vous dans la journée afin de convenir d'un rendez-vous."}
          </p>
        )}
      </div>
    </div>
  );
};

export default Thanks;
