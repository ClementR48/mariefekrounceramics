import React from "react";
import "./PaymentForm.scss";

import {
  Elements,
  CardElement,
  ElementsConsumer,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";
import { ArrowDownLeft, ArrowLeft } from "react-feather";

const PaymentForm = ({
  checkoutToken,
  shippingData,
  handleCaptureCheckout,
  setValidateAdressForm,
}) => {
  const stripePromise = loadStripe(
    "pk_test_51K4lNJIpyCJRUeoekz4uR5OJqEv2Pppdl7C8s9Ubea50j0TA2LtYuwh9X1sistyM6H3ma5wbLLyD4WJPYWgdQvcS00gQMa4Gkn"
  );

  const navigate = useNavigate();

  const handleSumbitPayment = async (e, elements, stripe) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log(error);
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
        fulfillment: { shipping_method: shippingData.shippingOption },
        payment: {
          gateway: "stripe",

          stripe: {
            payment_method_id: paymentMethod.id,
          },
        },
      };

      handleCaptureCheckout(checkoutToken.id, orderData);
      navigate("/");
    }
  };

  return (
    <div className="payment_form">
      <h3>Paiement</h3>
      <ul>
        {checkoutToken.live.line_items.map((product) => (
          <li key={product.id}>
            <p>{product.name}</p>
            <p>{product.line_total.formatted_with_code}</p>
          </li>
        ))}
        <li>
          <p>Livraison</p>
          <p>5.00 EUR</p>
        </li>
      </ul>

      <p> Total à payer : {checkoutToken.live.subtotal.formatted_with_code}</p>

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
                  onClick={() => setValidateAdressForm(false)}
                  type="button"
                >
                  <ArrowLeft size={17} color="red" />
                  <span>Informations</span>
                </button>
                <button type="submit">Confirmer</button>
              </div>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </div>
  );
};

export default PaymentForm;
