import React from "react";

import CartItem from "./CartItem/CartItem";
import "./FullCart.scss";
import { motion } from "framer-motion";
import Button from "../../../Others/Button/Button";
import Loader from "../../../Others/Loader/Loader";

const FullCart = ({
  cart,
  handleRemoveFromCart,
  handleUpdateCartQty,
  products,
  handleEmptyCart,
  openCheckoutFunc,
  loading,
}) => {
  return (
    <motion.main
      initial={{ opacity: 0, translateX: -100 }}
      animate={{ opacity: 1, translateX: 0 }}
      exit={{ opacity: 0, translateX: -100 }}
      transition={{ delay: 0.5, duration: 1 }}
      className="fullcart"
    >
      <motion.table
        className={loading ? "list_cart loading_cart" : "list_cart"}
      >
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
        <Button
          text="Paiement"
          size="100%"
          fn={openCheckoutFunc}
          loading={loading}
        />
      </div>
    </motion.main>
  );
};

export default FullCart;
