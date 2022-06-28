import React, { useEffect, useState } from "react";

import "./Checkout.scss";

import { useNavigate } from "react-router-dom";

import { commerce } from "../../../lib/commerce";
import AddressForm from "./AdressForm/AddressForm";
import PaymentForm from "./PaymentForm/PaymentForm";
import Loader from "../../Others/Loader/Loader";
import IfDelivery from "./IfDelivery/IfDelivery";
import WithoutDelivery from "./WithoutDelivery/WithoutDelivery";

const Checkout = ({
  cart,
  handleCaptureCheckout,
  order,
  error,
  openCheckout,
  openCheckoutFunc,
  weight,
  setThanks,
}) => {
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [shippingData, setShippingData] = useState({});
  
  const [checkoutPageNumber, setCheckoutPageNumber] = useState(0);
  

  let navigate = useNavigate();



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
  }, [cart, navigate]);

  return (
    <div className={openCheckout ? "checkout_page active" : "checkout_page"}>
      {checkoutToken ? (
        <>
         {/*  {checkoutPageNumber === 0 && (
            <IfDelivery
              setCheckoutPageNumber={setCheckoutPageNumber}
              openCheckoutFunc={openCheckoutFunc}
              setDelivery={setDelivery}
            />
          )}
          {checkoutPageNumber === 1 && (
            <WithoutDelivery
              setCheckoutPageNumber={setCheckoutPageNumber}
              setShippingData={setShippingData}
            />
          )} */}
          {checkoutPageNumber === 0 && (
            <AddressForm
              checkoutToken={checkoutToken}
              setShippingData={setShippingData}
              setCheckoutPageNumber={setCheckoutPageNumber}
              
              weight={weight}
            />
          )}
          {checkoutPageNumber === 1 && (
            <PaymentForm
            setCheckoutPageNumber={setCheckoutPageNumber}
              
              checkoutToken={checkoutToken}
              shippingData={shippingData}
              handleCaptureCheckout={handleCaptureCheckout}
              order={order}
              
              openCheckoutFunc={openCheckoutFunc}
              setThanks={setThanks}
            />
          )}
          {/* {!validateAdressForm && (
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
          )} */}
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Checkout;
