import React, { useEffect, useState } from 'react';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';

import { commerce } from '../../../lib/commerce';





const Checkout = ({ cart }) => {

  useEffect(() => {

    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, { type : 'cart'})

        console.log(token);
      } catch (error) {
        
      }
    }


  }, [])
  


  return (
    <div>
      <AddressForm />
      <PaymentForm />
    </div>
  );
};

export default Checkout;