import React from "react";
import Product from "./Product/Product";



const Products = ({ products, onAddToCart }) => {
  
  return (
    <main>
      <ul>
        {products.length === 0 ? <p>Wait ...</p> : products.map((product) => {
          return <Product key={product.id} product={product} onAddToCart={onAddToCart} />;
        })}
      </ul>
    </main>
  );
};

export default Products;
