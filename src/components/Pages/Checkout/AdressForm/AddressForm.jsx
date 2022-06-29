import React, { useEffect, useState } from "react";
import "./AddressForm.scss";

import { commerce } from "../../../../lib/commerce";
import { ArrowLeft, ArrowRight, Loader } from "react-feather";
import { Link } from "react-router-dom";

const AddressForm = ({
  checkoutToken,
  setShippingData,
  openCheckoutFunc,
  setCheckoutPageNumber,
  weight,
}) => {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [codePost, setCodePost] = useState("");
  const [address, setAddress] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const [checkCVG, setCheckCVG] = useState(false);
  const [delivery, setDelivery] = useState("true");
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingSubDivisions, setShippingSubDivisions] = useState([]);
  const [shippingSubDivision, setShippingSubDivision] = useState("");
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState({
    id: "",
    price_code: "",
    price: "",
  });

  const countries = Object.entries(shippingCountries).map(([code, name]) => ({
    id: code,
    label: name,
  }));
  const subdivisions = Object.entries(shippingSubDivisions).map(
    ([code, name]) => ({ id: code, label: name })
  );

  const fetchShippingCountries = async (checkoutTokenId) => {
    const response = await commerce.services.localeListShippingCountries(
      checkoutTokenId
    );

    setShippingCountries(response.countries);
    setShippingCountry(Object.keys(response.countries)[0]);
  };

  const fetchShippingSubDivisions = async (countryCode) => {
    const response = await commerce.services.localeListSubdivisions(
      countryCode
    );

    setShippingSubDivisions(response.subdivisions);
    setShippingSubDivision(Object.keys(response.subdivisions)[0]);
  };

  //calcul du prix de livraison

  const calculShipping = (state) => {
    if (delivery === "false") {
      const obj = state.filter((option) => option.description === "sur place");
      setShippingOption({
        id: obj[0].id,
        price_code: obj[0].price.formatted_with_code,
        price: obj[0].price.raw,
      });
    } else if (weight < 250) {
      const obj = state.filter((option) => option.description === "250");

      setShippingOption({
        id: obj[0].id,
        price_code: obj[0].price.formatted_with_code,
        price: obj[0].price.raw,
      });
    } else if (weight < 500) {
      const obj = state.filter((option) => option.description === "500");

      setShippingOption({
        id: obj[0].id,
        price_code: obj[0].price.formatted_with_code,
        price: obj[0].price.raw,
      });
    } else if (weight < 750) {
      const obj = state.filter((option) => option.description === "750");

      setShippingOption({
        id: obj[0].id,
        price_code: obj[0].price.formatted_with_code,
        price: obj[0].price.raw,
      });
    } else if (weight < 1000) {
      const obj = state.filter((option) => option.description === "1");

      setShippingOption({
        id: obj[0].id,
        price_code: obj[0].price.formatted_with_code,
        price: obj[0].price.raw,
      });
    } else if (weight < 2000) {
      const obj = state.filter((option) => option.description === "2");

      setShippingOption({
        id: obj[0].id,
        price_code: obj[0].price.formatted_with_code,
        price: obj[0].price.raw,
      });
    } else if (weight < 5000) {
      const obj = state.filter((option) => option.description === "5");

      setShippingOption({
        id: obj[0].id,
        price_code: obj[0].price.formatted_with_code,
        price: obj[0].price.raw,
      });
    } else if (weight < 10000) {
      const obj = state.filter((option) => option.description === "10");

      setShippingOption({
        id: obj[0].id,
        price_code: obj[0].price.formatted_with_code,
        price: obj[0].price.raw,
      });
    }
  };

  useEffect(() => {
    if (shippingOptions !== "") {
      if (shippingOptions[0]) {
        if (shippingOptions[0].description === "International") {
          setShippingOption({
            id: shippingOptions[0].id,
            price_code: shippingOptions[0].price.formatted_with_code,
            price: shippingOptions[0].price.raw,
          });
        } else {
          calculShipping(shippingOptions);
        }
      }
    }
  }, [shippingOptions, weight, shippingCountry, delivery]);

  const fetchShippingOptions = async (
    checkoutTokenId,
    country,
    region = null
  ) => {
    const options = await commerce.checkout.getShippingOptions(
      checkoutTokenId,
      { country, region }
    );

    setShippingOptions(options);
    if (shippingCountry === "FR") calculShipping(options);
  };

  useEffect(() => {
    fetchShippingCountries(checkoutToken.id);
  }, []);

  useEffect(() => {
    if (shippingCountry) fetchShippingSubDivisions(shippingCountry);
  }, [shippingCountry]);

  useEffect(() => {
    if (shippingSubDivision)
      fetchShippingOptions(
        checkoutToken.id,
        shippingCountry,
        shippingSubDivision
      );
  }, [shippingSubDivision]);

  const handleSubmitAdressForm = (e) => {
    e.preventDefault();

    if (
      name !== "" &&
      lastname !== "" &&
      email !== "" &&
      city !== "" &&
      codePost !== "" &&
      address !== "" &&
      shippingOption !== "" &&
      checkCVG
    ) {
      setCheckoutPageNumber(1);
      setShippingData({
        name: name,
        lastname: lastname,
        email: email,
        shippingCountry: shippingCountry,
        shippingSubDivision: shippingSubDivision,
        shippingCity: city,
        shippingPostCode: codePost,
        shippingAddress: address,
        shippingOption: shippingOption,
      });
    } else {
      setErrorMessage(true);
      setTimeout(() => {
        setErrorMessage(false);
      }, 5000);
    }
  };

  return (
    <form className="address_form" onSubmit={(e) => handleSubmitAdressForm(e)}>
      <h3>Informations</h3>
      {errorMessage && (
        <span className="error_message">
          Tous les champs doivent être remplis
        </span>
      )}
      {shippingOption.id !== "" ? (
        <>
          <label>
            Mode de réception
            <select
              value={delivery}
              onChange={(e) => setDelivery(e.target.value)}
            >
              <option value="true">Livraison</option>
              <option value="false">Atelier</option>
            </select>
          </label>
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
          <label>
            Pays
            <select
              value={shippingCountry}
              onChange={(e) => setShippingCountry(e.target.value)}
            >
              {countries.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.label}
                </option>
              ))}
            </select>
          </label>
          <label>
            Region
            <select
              value={shippingSubDivision}
              onChange={(e) => setShippingSubDivision(e.target.value)}
            >
              {subdivisions.map((subdivision) => (
                <option key={subdivision.id} value={subdivision.id}>
                  {subdivision.label}
                </option>
              ))}
            </select>
          </label>
          <label>
            Adresse
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </label>
          <label>
            Ville
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </label>
          <label>
            Code Postal
            <input
              type="text"
              value={codePost}
              onChange={(e) => setCodePost(e.target.value)}
            />
          </label>
          <div className="price_delivery">
            <p>Livraison</p>
            <p className="price">{shippingOption.price_code}</p>
          </div>
          <label className="checkbox">
            <span>
              J'accepte les termes des{" "}
              <Link onClick={() => openCheckoutFunc(false)} to={"/conditions"}>
                CGV
              </Link>
            </span>
            <input
              checked={checkCVG}
              onChange={(e) => setCheckCVG(e.target.checked)}
              type="checkbox"
            />
          </label>
          <div className="btn_address_form">
            <button
              className="back"
              type="button"
              onClick={() => setCheckoutPageNumber(0)}
            >
              <ArrowLeft size={20} color="rgb(253, 155, 138)" />
              <span>Retour</span>
            </button>
            <button className="submit_btn" type="submit">
              <span>Paiement</span>
              <ArrowRight size={20} color="rgba(222, 208, 242, 1)" />
            </button>
          </div>{" "}
        </>
      ) : (
        <Loader />
      )}
    </form>
  );
};

export default AddressForm;
