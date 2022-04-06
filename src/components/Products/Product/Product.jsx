import React from "react";
import { Link } from "react-router-dom";
import "./Product.scss";

const Product = ({ product }) => {




  return (
    <li className="product">
      <Link to={`/products/${product.permalink}`}>
        <img src={product.image.url} alt={product.name} />
        <div className="caption">
          <p>{product.name}</p>
          <p>{product.price.formatted_with_code}</p>
        </div>

        
      </Link>
    </li>
  );
};

export default Product;
