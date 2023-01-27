import React, { useEffect, useState } from "react";
import "./Checkout.scss";
import { useNavigate } from "react-router-dom";
import { commerce } from "../../../lib/commerce";
import AddressForm from "./AdressForm/AddressForm";
import PaymentForm from "./PaymentForm/PaymentForm";
import Loader from "../../Others/Loader/Loader";


const Checkout = ({
  cart,
  handleCaptureCheckout,
  order,
  openCheckout,
  openCheckoutFunc,
  weight,
  setThanks,
}) => {
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [shippingData, setShippingData] = useState({});
  const [checkoutPageNumber, setCheckoutPageNumber] = useState(0);
  const [discountPriceToken, setDiscountPriceToken] = useState()

  let navigate = useNavigate();

  //Generer un token

  useEffect(() => {
    const generateToken = async () => {
      try {
        if (cart.line_items.length !== 0) {
          const token = await commerce.checkout.generateToken(cart.id, {
            type: "cart",
          });
          setCheckoutToken(token);
          discountPrice(token)
        }
      } catch (error) {
        navigate("/");
        setThanks({
          isValid: true,
          error: true,
          delivery: true,
        });
      }
    };
    if (cart.line_items) {
      generateToken();
    }
  }, [cart]);

  const discountPrice = (token) => {
    if(token)
    commerce.checkout
      .checkDiscount(token.id, {
        code: "remise15%",
      })
      .then((response) => setDiscountPriceToken(response));
  };

  return (
    <div className={openCheckout ? "checkout_page active" : "checkout_page"}>
      {checkoutToken ? (
        <>
          {checkoutPageNumber === 0 && (
            <AddressForm
              checkoutToken={checkoutToken}
              setShippingData={setShippingData}
              setCheckoutPageNumber={setCheckoutPageNumber}
              openCheckoutFunc={openCheckoutFunc}
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
            />
          )}
        </>
      ) : (
        <Loader/>
      )}
    </div>
  );
};

export default Checkout;
