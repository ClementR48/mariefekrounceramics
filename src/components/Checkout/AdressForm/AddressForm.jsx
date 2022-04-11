import React, { useEffect, useState } from "react";
import "./AddressForm.scss";

import { commerce } from "../../../lib/commerce";
import { ArrowLeft, ArrowRight } from "react-feather";

const AddressForm = ({
  checkoutToken,
  setShippingData,
  openCheckoutFunc,
  setValidateAdressForm,
  weight,
}) => {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [codePost, setCodePost] = useState("");
  const [address, setAddress] = useState("");

  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingSubDivisions, setShippingSubDivisions] = useState([]);
  const [shippingSubDivision, setShippingSubDivision] = useState("");
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState();

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

  const calculShipping = (state) => {
    if (weight < 250) {
      const obj = state.filter((option) => option.description === "250");

      setShippingOption(obj[0].price.formatted_with_code);
    } else if (weight < 500) {
      const obj = state.filter((option) => option.description === "500");

      setShippingOption(obj[0].price.formatted_with_code);
    } else if (weight < 750) {
      const obj = state.filter((option) => option.description === "750");

      setShippingOption(obj[0].price.formatted_with_code);
    } else if (weight < 1000) {
      const obj = state.filter((option) => option.description === "1");

      setShippingOption(obj[0].price.formatted_with_code);
    } else if (weight < 2000) {
      const obj = state.filter((option) => option.description === "2");

      setShippingOption(obj[0].price.formatted_with_code);
    } else if (weight < 5000) {
      const obj = state.filter((option) => option.description === "5");

      setShippingOption(obj[0].price.formatted_with_code);
    } else if (weight < 10000) {
      const obj = state.filter((option) => option.description === "10");

      setShippingOption(obj[0].price.formatted_with_code);
    }
  };

  useEffect(() => {
    if (shippingOptions.length !== 0) {
      calculShipping(shippingOptions);
    }
  }, [weight]);

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
    calculShipping(options);
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
  };

  const validation = () => {
    setValidateAdressForm(true);
  };

  return (
    <form className="address_form" onSubmit={(e) => handleSubmitAdressForm(e)}>
      <h3>Informations</h3>
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

      <label>
        price shipping
        <select
          value={shippingOption}
          onChange={(e) => setShippingOption(e.target.value)}
        >
          <option value={shippingOption}>{shippingOption}</option>
        </select>
      </label>
      <div className="btn_address_form">
        <button
          className="back"
          type="button"
          onClick={() => openCheckoutFunc(false)}
        >
          <ArrowLeft size={17} color="red" />
          <span>Panier</span>
        </button>
        <button
          className="submit_btn"
          type="submit"
          onClick={() => validation()}
        >
          <span>Paiement</span>
          <ArrowRight size={17} color="blue" />
        </button>
      </div>
    </form>
  );
};

export default AddressForm;
