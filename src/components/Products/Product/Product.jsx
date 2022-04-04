import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Product = ({ product, onAddToCart, cart }) => {

  
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    const isAvailable = () => {
      
        const productInCart = cart.line_items.filter(
          (item) => item.product_id === product.id
        );

        if (productInCart.length !== 0) {
          if (productInCart[0].quantity === product.inventory.available) {
            setAvailable(false);
          }
        }
      
    };

    if(cart.line_items) isAvailable();
  }, [cart]);



  return (
    <li>
      <Link to={`/products/${product.id}`} >
      <p>{product.name}</p>
      <img src={product.image.url} alt={product.name} />
      <p>{product.description}</p>
      <p>{product.attributes.hauteur}</p>
      {available ? (
        <button onClick={() => onAddToCart(product.id, 1)}>
          Ajouter au painier
        </button>
      ) : (
        <p>a plus</p>
      )}
      </Link>
    </li>
  );
};

export default Product;
