import React, { useState } from "react";
import "./PaymentForm.scss";

import {
  Elements,
  CardElement,
  ElementsConsumer,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js/pure";
import { ArrowLeft } from "react-feather";
import Button from "../../../Others/Button/Button";

const PaymentForm = ({
  checkoutToken,
  shippingData,
  handleCaptureCheckout,
  openCheckoutFunc,
  delivery,
  setCheckoutPageNumber,
}) => {
  const [errorMessage, setErrorMessage] = useState("");

  const [stripePromise] = useState(() =>
    loadStripe(process.env.REACT_APP_MARIEFEKROUN_STRIPE_PUBLIC_KEY)
  );

  const handleSumbitPayment = async (e, elements, stripe) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      setErrorMessage(error.message);
      
      openCheckoutFunc(true);
    } else {
      const orderData = {
        line_items: checkoutToken.live.line_items,
        customer: {
          firstname: shippingData.name,
          lastname: shippingData.lastname,
          email: shippingData.email,
        },
        shipping: {
          name: "National",
          country: shippingData.shippingCountry,
          county_state: shippingData.shippingSubDivision,
          town_city: shippingData.shippingCity,
          postal_zip_code: shippingData.shippingPostCode,
          street: shippingData.shippingAddress,
        },
        fulfillment: { shipping_method: shippingData.shippingOption.id },
        payment: {
          gateway: "stripe",

          stripe: {
            payment_method_id: paymentMethod.id,
          },
        },
      };

      handleCaptureCheckout(checkoutToken.id, orderData);
      openCheckoutFunc(false);
    }
  };

  return (
    <div className="payment_form">
      <h3>Paiement</h3>
      <span className="error_message">{errorMessage}</span>
      <ul>
        {checkoutToken.live.line_items.map((product) => (
          <li key={product.id}>
            <p>{product.name}</p>
            <p>{product.line_total.formatted_with_code}</p>
          </li>
        ))}
        <li>
          <p>Livraison</p>
          <p>{shippingData.shippingOption.price_code}</p>
        </li>
      </ul>

      <p>
        Total à payer :
        {(
          checkoutToken.live.subtotal.raw + shippingData.shippingOption.price
        ).toFixed(2)}
        EUR
      </p>

      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => (
            <form
              className="card_field"
              onSubmit={(e) => handleSumbitPayment(e, elements, stripe)}
            >
              <CardElement />
              <br />
              <div className="btn_form">
                <button
                  className="back"
                  onClick={() =>
                    delivery
                      ? setCheckoutPageNumber(2)
                      : setCheckoutPageNumber(1)
                  }
                  type="button"
                >
                  <ArrowLeft size={20} color="rgb(253, 155, 138)" />
                  <span>Informations</span>
                </button>
                <Button
                  text="Confirmer"
                  size="50%"
                  fontSize="17px"
                  fn={openCheckoutFunc}
                />
              </div>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </div>
  );
};

export default PaymentForm;
