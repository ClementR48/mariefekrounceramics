import React, { useState } from "react";
import { Link } from "react-router-dom";
import CartItem from "./CartItem/CartItem";

const Cart = ({ cart, handleEmptyCart, handleRemoveFromCart, handleUpdateCartQty }) => {
 

  const EmptyCart = () => {
    return <div>La cart est Vide</div>;
  };
  const FullCart = () => {
    return (
      <>
        <ul>
          {cart.line_items.map((item) => (
            <CartItem key={item.id} item={item} handleRemoveFromCart={handleRemoveFromCart} handleUpdateCartQty={handleUpdateCartQty} />
          ))}
        </ul>

        <div>
          details : {cart.subtotal.formatted_with_symbol}
          <button onClick={() => handleEmptyCart()} >Empty Cart</button>
          <Link to='/checkout' exact='true' >Checkout</Link>
        </div>
      </>
    );
  };

  if(!cart.line_items) return '...Wait'

  return <div>{!cart.line_items.length ? <EmptyCart /> : <FullCart />}</div>;
};

export default Cart;
