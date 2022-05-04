import React, { useEffect, useState } from "react";

import "./Checkout.scss";

import { useNavigate } from "react-router-dom";

import { commerce } from "../../lib/commerce";
import AddressForm from "./AdressForm/AddressForm";
import PaymentForm from "./PaymentForm/PaymentForm";
import Loader from "../Loader/Loader";

const Checkout = ({
  cart,
  handleCaptureCheckout,
  order,
  error,
  openCheckout,
  openCheckoutFunc,
  weight,
  setThanks
}) => {
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [shippingData, setShippingData] = useState({});
  const [validateAdressForm, setValidateAdressForm] = useState(false);

 

  const navigate = useNavigate();

  useEffect(() => {
    const generateToken = async () => {
      try {
        if (cart.line_items.length !== 0) {
          const token = await commerce.checkout.generateToken(cart.id, {
            type: "cart",
          });

          setCheckoutToken(token);
        }
      } catch (error) {
        navigate("/");
      }
    };
    if (cart.line_items) {
      generateToken();
    }
  }, [cart]);

  return (
    <div className={openCheckout ? "checkout_page active" : "checkout_page"}>
      {checkoutToken ? (
        <>
          {!validateAdressForm && (
            <AddressForm
              checkoutToken={checkoutToken}
              setShippingData={setShippingData}
              openCheckoutFunc={openCheckoutFunc}
              setValidateAdressForm={setValidateAdressForm}
              weight={weight}
            />
          )}
          {validateAdressForm && (
            <PaymentForm
              checkoutToken={checkoutToken}
              shippingData={shippingData}
              handleCaptureCheckout={handleCaptureCheckout}
              order={order}
              setValidateAdressForm={setValidateAdressForm}
              openCheckoutFunc={openCheckoutFunc}
              setThanks={setThanks}
            />
          )}
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Checkout;
