import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { commerce } from "../../lib/commerce";

const AddressForm = ({ checkoutToken, setShippingData }) => {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState('')
  const [codePost, setCodePost] = useState('')
  const [address, setAddress] = useState('')

  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingSubDivisions, setShippingSubDivisions] = useState([]);
  const [shippingSubDivision, setShippingSubDivision] = useState("");
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState("");

  const countries = Object.entries(shippingCountries).map(([code, name]) => ({
    id: code,
    label: name,
  }));
  const subdivisions = Object.entries(shippingSubDivisions).map(
    ([code, name]) => ({ id: code, label: name })
  );

  const options = shippingOptions.map((sO) => ({
    id: sO.id,
    label: ` ${sO.description} -(${sO.price.formatted_with_symbol})`,
  }));


  useEffect(() => {
    const calculShipping = () => {
      
    }
  }, [])

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
    setShippingOption(options[0].id);
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

  return (
    <form onSubmit={(e) => handleSubmitAdressForm(e)}>
      <label>
        Nom
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        Prenom
        <input
          type="text"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
      </label>
      <label>
        email
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        country
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
        address
        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
      </label>
      <label>
        city
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </label>
      <label>
        CodePost
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
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <Link to="/cart">Back to shop</Link>
      <button>Payment</button>
    </form>
  );
};

export default AddressForm;
