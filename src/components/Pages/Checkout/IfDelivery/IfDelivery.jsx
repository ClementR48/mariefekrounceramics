import React from "react";
import { useState } from "react";
import { ArrowLeft, ArrowRight } from "react-feather";
import "./IfDelivery.scss";

const IfDelivery = ({
  setCheckoutPageNumber,
  openCheckoutFunc,
  setDelivery,
}) => {
  const [radioDelivery, setRadioDelivery] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);

  const validateDeliveryForm = (e) => {
    e.preventDefault();

    if (radioDelivery === "") {
      setErrorMessage(true);
    } else {
      if (radioDelivery === "delivery") {
        setCheckoutPageNumber(2);
        setDelivery(true);
      } else {
        setCheckoutPageNumber(2);
        setDelivery(false);
      }
    }
  };

  return (
    <form className="if_delivery" onSubmit={(e) => validateDeliveryForm(e)}>
      <h3>Mode de réception</h3>
      {errorMessage && (
        <span className="error_message">Un champs doit être rempli :)</span>
      )}
      <div className="inputs">
        <div>
          <input
            type="radio"
            id="delivery"
            name="delivery"
            value="delivery"
            onChange={(e) => setRadioDelivery(e.target.value)}
          />
          <label htmlFor="delivery">Livraison</label>
        </div>

        <div>
          <input
            type="radio"
            id="no_delivery"
            name="delivery"
            value="no_delivery"
            onChange={(e) => setRadioDelivery(e.target.value)}
          />
          <label htmlFor="no_delivery">Récuperer sur place (Atelier)</label>
        </div>
      </div>
      <div className="btn_address_form">
        <button
          className="back"
          type="button"
          onClick={() => openCheckoutFunc(false)}
        >
          <ArrowLeft size={20} color="rgb(253, 155, 138)" />
          <span>Retour</span>
        </button>
        <button className="submit_btn" type="submit">
          <span>Continuer</span>
          <ArrowRight size={20} color="rgba(222, 208, 242, 1)" />
        </button>
      </div>
    </form>
  );
};

export default IfDelivery;
