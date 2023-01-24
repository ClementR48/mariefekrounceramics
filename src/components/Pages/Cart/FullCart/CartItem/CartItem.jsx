import React, { useEffect, useState } from "react";
import { Minus, Plus, Trash2 } from "react-feather";
import { Link } from "react-router-dom";
import "./CartItem.scss";

const CartItem = ({
  item,
  handleUpdateCartQty,
  handleRemoveFromCart,
  products,
}) => {
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    const product = products.filter(
      (product) => product.id === item.product_id
    );
    if (product.length !== 0) {
      if (product[0].inventory.available === item.quantity) {
        setAvailable(false);
      } else {
        setAvailable(true);
      }
    }
  }, [item, products]);

  const productDiscount = () => {
    const priceWithDiscount =
      item.line_total.raw - (item.line_total.raw * 15) / 100;
    return <td className="price_product_discount">{`€${priceWithDiscount}`}</td>;
  };

  return (
    <tr className="cartitem">
      <td>
        <img src={item.image.url} alt="produit"></img>
      </td>
      <td>
        <Link to={`/products/${item.permalink}`}>{item.name}</Link>
      </td>
      {/* <td>{item.line_total.formatted_with_code}</td> */}
      {productDiscount()}
      <td className="modify_item">
        <button onClick={() => handleUpdateCartQty(item.id, item.quantity - 1)}>
          <Minus size={15} color="rgba(134, 90, 71, 1)" />
        </button>
        <p>{item.quantity}</p>
        {available && (
          <button
            onClick={() => handleUpdateCartQty(item.id, item.quantity + 1)}
          >
            <Plus size={15} color="rgba(134, 90, 71, 1)" />
          </button>
        )}

        <button
          className="delete_item"
          onClick={() => handleRemoveFromCart(item.id)}
        >
          <Trash2 size={15} color="rgb(253,155,138)" />
        </button>
      </td>
    </tr>
  );
};

export default CartItem;
