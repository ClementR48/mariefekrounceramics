import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Product.scss";
import { motion } from "framer-motion";

const Product = ({ product, cart }) => {
  const [quantityProduct, setQuantityProduct] = useState(false);

  useEffect(() => {
    if (cart.line_items !== '' && product !== undefined) {
      const productInCart = cart.line_items.filter(
        (item) => item.product_id === product.id
      );
      if (product.inventory.available === 0) {
        setQuantityProduct(true);
      } else if (productInCart.length !== 0) {
        if (productInCart[0].quantity >= product.inventory.available) {
          setQuantityProduct(true);
        } else {
          setQuantityProduct(false);
        }
      } else {
        setQuantityProduct(false);
      }
    }

  }, [cart, product]);

  const arrEpuise = "épuisé".split('');
 


  return (
    <motion.li
      className="product"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {quantityProduct && (
        <ul className="epuise">
          {arrEpuise.map((letter, index) => (
            <li key={index}>{letter}</li>
          ))}
        </ul>
      )}
      <Link to={`/products/${product.permalink}`}>
        <img src={product.image.url} alt={product.name} />
        <div className="caption">
          <p>{product.name}</p>
          <p>{product.price.formatted_with_code}</p>
        </div>
      </Link>
    </motion.li>
  );
};

export default Product;
