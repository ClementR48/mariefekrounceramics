import React from 'react';

const CartItem = ({ item, handleUpdateCartQty, handleRemoveFromCart }) => {
  return (
    <li>
      <p>{item.name}</p>

      <button onClick={() => handleUpdateCartQty(item.id, item.quantity - 1)} >-</button>
      <p>{item.quantity}</p>
      <button onClick={() => handleUpdateCartQty(item.id, item.quantity + 1)}>+</button>

      <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
    </li>
  );
};

export default CartItem;