import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EmptyCart from "./EmptyCart/EmptyCart";
import CartItem from "./FullCart/CartItem/CartItem";
import FullCart from "./FullCart/FullCart";
import "./Cart.scss";
import Loader from "../../Others/Loader/Loader";
import { motion } from "framer-motion";

const Cart = ({
  cart,
  handleEmptyCart,
  handleRemoveFromCart,
  handleUpdateCartQty,
  products,
  openCheckoutFunc,
  loading,
}) => {
  if (!cart.line_items) return <Loader />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 0.5 }}
      className="cart"
    >
      <h2>Votre panier</h2>
      {!cart.line_items.length ? (
        <EmptyCart  products={products} />
      ) : (
        <FullCart
          cart={cart}
          handleEmptyCart={handleEmptyCart}
          handleRemoveFromCart={handleRemoveFromCart}
          handleUpdateCartQty={handleUpdateCartQty}
          products={products}
          openCheckoutFunc={openCheckoutFunc}
          loading={loading}
        />
      )}
    </motion.div>
  );
};

export default Cart;
