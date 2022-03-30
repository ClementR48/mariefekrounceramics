import React from "react";

const Product = ({ product, onAddToCart }) => {
  
  return (
    <li>
      <p>{product.name}</p>
      <img src={product.image.url} alt="" />
      
      <button onClick={() => onAddToCart(product.id, 1)}>Ajouter au painier</button>
    </li>
  );
};

export default Product;
