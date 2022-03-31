import React from "react";

import {
  Elements,
  CardElement,
  ElementsConsumer,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const PaymentForm = ({
  checkoutToken,
  shippingData,
  handleCaptureCheckout,
}) => {
  const stripePromise = loadStripe(
    process.env.REACT_APP_MARIEFEKROUN_STRIPE_PUBLIC_KEY
  );

  const handleSumbitPayment = async (e, elements, stripe) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    console.log(stripe);

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
          gateway: 'stripe',
          stripe: {
            payment_method_id: paymentMethod.id,
          },
        },
      };

      handleCaptureCheckout(checkoutToken.id, orderData);
    }
  };

  return (
    <ul>
      {checkoutToken.live.line_items.map((product) => (
        <li key={product.id}>
          <p>{product.name}</p>
          <p>{product.line_total.formatted_with_symbol}</p>
        </li>
      ))}

      <li> SubTotal : {checkoutToken.live.subtotal.formatted_with_symbol}</li>

      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => (
            <form onSubmit={(e) => handleSumbitPayment(e, elements, stripe)}>
              <CardElement />
              <br />

              <button type="button">Back</button>
              <button type="submit">
                pay {checkoutToken.live.subtotal.formatted_with_symbol}
              </button>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </ul>
  );
};

export default PaymentForm;
