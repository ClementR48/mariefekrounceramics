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

  /*   useEffect(() => {
    const isAvailable = () => {
      const product = products.filter(
        (product) => item.product_id === product.id
      );
      if (product) {
        if (item.quantity >= product[0].inventory.available) {
          setAvailable(false);
        }
      }
    };

    isAvailable();
  }, []); */


  return (
    <tr className="cartitem">
      <td>
        <img src={item.image.url} alt="produit"></img>
      </td>
      <td>
        <Link to={`/products/${item.permalink}`}>
          {item.name}
        </Link>
      </td>
      <td>{item.line_total.formatted_with_code}</td>
      <td  className="modify_item">
        <button onClick={() => handleUpdateCartQty(item.id, item.quantity - 1)}>
          <Minus size={15}/>
        </button>
        <p>{item.quantity}</p>
        {available && (
          <button
            onClick={() => handleUpdateCartQty(item.id, item.quantity + 1)}
          >
            <Plus size={15} />
          </button>
        )}

        <button className="delete_item" onClick={() => handleRemoveFromCart(item.id)}>
          <Trash2 size={15} color='red'/>
        </button>
      </td>
    </tr>
  );
};

export default CartItem;
