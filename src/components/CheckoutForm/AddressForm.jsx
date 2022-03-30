import React, { useState } from "react";

import { commerce } from '../../lib/commerce'

const AddressForm = () => {

  const [shippingCountries, setShippingCountries] = useState([])
  const [shippingCountry, setShippingCountry] = useState("")
  const [shippingSubDivisions, setShippingSubDivisions] = useState([])
  const [shippingSubDivision , setshippingSubDivision] = useState("")
  const [shippingOptions, setShippingOptions] = useState([])
  const [shippingOption, setShippingOption] = useState("")

  const fetchShippingCountries = async (checkoutTokenId) => {
    const response = await commerce.services.localeListShippingCountries(checkoutTokenId)

    setShippingCountries(response.countries)
  }
 


  return (
    <form>
      <label>
        Nom
        <input type="text" />
      </label>
      <label>
        Prenom
        <input type="text" />
      </label>
      <label>
        email
        <input type="email" />
      </label>
      <label>
        country
        <input type="text" />
      </label>
      <label>
        city
        <input type="text" />
      </label>
      <label>
        address
        <input type="text" />
      </label>
    </form>
  );
};

export default AddressForm;
