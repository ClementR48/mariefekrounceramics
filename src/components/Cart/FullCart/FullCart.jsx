import React, { useState } from "react";
import { Link } from "react-router-dom";
import CartItem from "./CartItem/CartItem";
import "./FullCart.scss";

const FullCart = ({
  cart,
  handleRemoveFromCart,
  handleUpdateCartQty,
  products,
  handleEmptyCart,
}) => {
  const [buttonAddProduct, setButtonAddProduct] = useState("Paiement");

  const textButtonLetters = buttonAddProduct.split("");
  return (
    <div className="fullcart">
      <table className="list_cart">
        <caption>Récapitulatif de votre commande</caption>
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
      </table>

      <div className="subtotal">
        <p>Sous-total : {cart.subtotal.formatted_with_code}</p>

        <Link to="/checkout" exact="true">
          <button className="checkout">
            <div className="span-container s1">
              {textButtonLetters.map((letter, index) => {
                return (
                  <>
                    {letter !== " " ? (
                      <span
                        key={index}
                        style={{
                          transitionDelay: ` ${0.05 * index}s`,
                        }}
                      >
                        {letter}
                      </span>
                    ) : (
                      <span
                        key={index}
                        style={{
                          transitionDelay: ` ${0.05 * index}s`,
                        }}
                      >
                        &nbsp;
                      </span>
                    )}
                  </>
                );
              })}
            </div>
            <div className="span-container s2">
              {textButtonLetters.map((letter, index) => {
                return (
                  <>
                    {letter !== " " ? (
                      <span
                        key={index}
                        style={{
                          transitionDelay: ` ${0.05 * index}s`,
                        }}
                      >
                        {letter}
                      </span>
                    ) : (
                      <span
                        key={index}
                        style={{
                          transitionDelay: ` ${0.05 * index}s`,
                        }}
                      >
                        &nbsp;
                      </span>
                    )}
                  </>
                );
              })}
            </div>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FullCart;
