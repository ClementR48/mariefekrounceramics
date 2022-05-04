import React from "react";

import CartItem from "./CartItem/CartItem";
import "./FullCart.scss";
import ScrollToTop from "../../ScrollToTop";
import { motion } from "framer-motion";

const FullCart = ({
  cart,
  handleRemoveFromCart,
  handleUpdateCartQty,
  products,
  handleEmptyCart,
  openCheckoutFunc,
  loading,
}) => {
  const buttonAddProduct = "Paiement";

  const textButtonLetters = buttonAddProduct.split("");

  return (
    <motion.main
      initial={{ opacity: 0, translateX: -100 }}
      animate={{ opacity: 1, translateX: 0 }}
      exit={{ opacity: 0, translateX: -100 }}
      transition={{ delay: 0.5, duration: 1 }}
      className="fullcart"
    >
      <ScrollToTop />
      <motion.table
        initial={{ opacity: 0, translateX: -100 }}
        animate={{ opacity: 1, translateX: 0 }}
        exit={{ opacity: 0, translateX: -100 }}
        transition={{ delay: 0.5, duration: 1 }}
        className={loading ? "list_cart loading" : "list_cart"}
      >
        {/* <caption>Récapitulatif de votre commande</caption> */}
        <tbody>
          {cart.line_items.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              handleRemoveFromCart={handleRemoveFromCart}
              handleUpdateCartQty={handleUpdateCartQty}
              products={products}
            />
          ))}
          <tr className="thead">
            <td></td>
            <td></td>
            <td></td>
            <td className="btn_delete">
              <button
                className="delete_items"
                onClick={() => handleEmptyCart()}
              >
                Supprimer le panier
              </button>
            </td>
          </tr>
        </tbody>
      </motion.table>

      <div className="subtotal">
        <p>Sous-total : {cart.subtotal.formatted_with_code}</p>

        <button className="checkout" onClick={() => openCheckoutFunc()}>
          <div className="span-container s1">
            {textButtonLetters.map((letter, index) => {
              return (
                <span
                  key={index}
                  style={{
                    transitionDelay: ` ${0.05 * index}s`,
                  }}
                >
                  {letter}
                </span>
              );
            })}
          </div>
          <div className="span-container s2">
            {textButtonLetters.map((letter, index) => {
              return (
                <span
                  key={index}
                  style={{
                    transitionDelay: ` ${0.05 * index}s`,
                  }}
                >
                  {letter}
                </span>
              );
            })}
          </div>
        </button>
      </div>
    </motion.main>
  );
};

export default FullCart;
