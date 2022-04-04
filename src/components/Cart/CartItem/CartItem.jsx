import React, { useEffect, useState } from "react";

const CartItem = ({
  item,
  handleUpdateCartQty,
  handleRemoveFromCart,
  products,
}) => {
  const [available, setAvailable] = useState(true);

  useEffect(() => {
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
  }, []);
  return (
    <li>
      {products.length === 0 ? "ok" : "attente"}
      <p>{item.name}</p>

      <button onClick={() => handleUpdateCartQty(item.id, item.quantity - 1)}>
        -
      </button>
      <p>{item.quantity}</p>
      {available && (
        <button onClick={() => handleUpdateCartQty(item.id, item.quantity + 1)}>
          +
        </button>
      )}

      <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
    </li>
  );
};

export default CartItem;
