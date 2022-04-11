import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EmptyCart from "./EmptyCart/EmptyCart";
import CartItem from "./FullCart/CartItem/CartItem";
import FullCart from "./FullCart/FullCart";
import './Cart.scss';
import Loader from "../Loader/Loader";

const Cart = ({
  cart,
  handleEmptyCart,
  handleRemoveFromCart,
  handleUpdateCartQty,
  products,
  categories,
  openCheckoutFunc,
  weightProductsInCart
}) => {
  
  useEffect(() => {
    weightProductsInCart()
  }, [])


  if (!cart.line_items) return <Loader />;

  return (
    <div className="cart">
      <h2>Votre panier</h2>
      {!cart.line_items.length ? (
        <EmptyCart categories={categories} />
      ) : (
        <FullCart
          cart={cart}
          handleEmptyCart={handleEmptyCart}
          handleRemoveFromCart={handleRemoveFromCart}
          handleUpdateCartQty={handleUpdateCartQty}
          products={products}
          openCheckoutFunc={openCheckoutFunc}
        />
      )}
    </div>
  );
};

export default Cart;
