
import React from "react";
import { Link } from "react-router-dom";
import "./Product.scss";
import { motion } from "framer-motion";

const Product = ({ product }) => {
  return (
   
      <motion.li
        className="product"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
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
