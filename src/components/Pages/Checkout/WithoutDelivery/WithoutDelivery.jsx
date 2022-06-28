import React, { useState } from "react";
import { ArrowLeft, ArrowRight } from "react-feather";
import { Link } from "react-router-dom";

import './WithoutDelivery.scss'

const WithoutDelivery = ({setCheckoutPageNumber, setShippingData}) => {

  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [checkCVG, setCheckCVG] = useState(false);

  const [errorMessage, setErrorMessage] = useState(false)

  const handleSubmitAdressForm = (e) => {
    e.preventDefault();

    if (
      name !== "" &&
      lastname !== "" &&
      email !== ""&&
      checkCVG
    ) {
      setCheckoutPageNumber(3);
      setShippingData({
        name: name,
        lastname: lastname,
        email: email
      });
    } else {
      setErrorMessage(true);
      setTimeout(() => {
        setErrorMessage(false);
      }, 5000)
    }
  };

  return (
    <form className="address_form" onSubmit={(e) => handleSubmitAdressForm(e)}>
      <h3>Informations</h3>
    {errorMessage && <span className="error_message">Tous les champs doivent être remplis</span>}
      <label>
        Nom
        <input
          type="text"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
      </label>
      <label>
        Prénom
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <label>
        Email
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>

      <label className="checkbox">
        <span>
          J'accepte les termes des <Link to={"/conditions"}>CGV</Link>
        </span>
        <input
          checked={checkCVG}
          onChange={(e) => setCheckCVG(e.target.checked)}
          type="checkbox"
        />
      </label>
      <div className="btn_address_form">
        <button className="back" type="button" onClick={() => setCheckoutPageNumber(0)}>
          <ArrowLeft size={20} color="rgb(253, 155, 138)" />
          <span>Retour</span>
        </button>
        <button className="submit_btn" type="submit">
          <span>Paiement</span>
          <ArrowRight size={20} color="rgba(222, 208, 242, 1)" />
        </button>
      </div>
    </form>
  );
};

export default WithoutDelivery;
