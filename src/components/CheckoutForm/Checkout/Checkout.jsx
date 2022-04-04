import React, { useEffect, useState } from "react";
import AddressForm from "../AddressForm";
import PaymentForm from "../PaymentForm";

import { useNavigate } from 'react-router-dom'

import { commerce } from "../../../lib/commerce";

const Checkout = ({ cart, handleCaptureCheckout, order, error }) => {
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [shippingData, setShippingData] = useState({})


  console.log(cart);
  const navigate = useNavigate()


  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, {
          type: "cart",
        });



        setCheckoutToken(token);
      } catch (error) {
        navigate('/')
      }
    };
    if (cart.line_items) {
      generateToken();
    }
  }, [cart]);

  return (
    <div>
      {checkoutToken ? (
        <>
          <AddressForm checkoutToken={checkoutToken} setShippingData={setShippingData} />
          <PaymentForm checkoutToken={checkoutToken} shippingData={shippingData} handleCaptureCheckout={handleCaptureCheckout} order={order} />
        </>
      ) :  <p>Wait ...</p>}
    </div>
  );
};

export default Checkout;
