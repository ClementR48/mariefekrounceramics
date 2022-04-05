import React, { useEffect, useState } from "react";
import Loader from "../Loader/Loader";

import Categories from "./Category/Category";
import Product from "./Product/Product";
import "./Products.scss";

const Products = ({
  setProductsToShow,
  products,
  productsToShow,
  onAddToCart,
  categories,
  changeListProducts,
  cart,
}) => {
  const [activeCateg, setActiveCateg] = useState(-1);

  const handleClickCateg = (index, idCateg) => {
    setActiveCateg(index);
    changeListProducts(idCateg);
  };
  const handleClickCategAll = () => {
    setActiveCateg(-1);
    setProductsToShow(products);
  };



  return (
    <main className="products">
      {categories.length !== 0 || productsToShow.length !== 0 ? (
        <>
          <ul className="list_categories">
            {categories
              .filter((category) => category.products !== 0)
              .map((category, index) => {
                return (
                  <li
                    className={
                      index === activeCateg ? "category selected" : "category"
                    }
                    key={category.id}
                    onClick={() => handleClickCateg(index, category.id)}
                    
                  >
                    <Categories
                      setActiveCateg={setActiveCateg}
                      category={category}
                      changeListProducts={changeListProducts}
                      index={index}
                    />
                  </li>
                );
              })}
              <li><span className={
                      -1 === activeCateg ? "category selected" : "category"
                    } onClick={() => handleClickCategAll()}>Tout</span></li>
          </ul>
          <ul className= "list_products">
            {productsToShow.map((product) => {
              return (
                <Product
                  key={product.id}
                  product={product}
                  onAddToCart={onAddToCart}
                  cart={cart}
                />
              );
            })}
          </ul>
        </>
      ) : (
        <Loader />
      )}
    </main>
  );
};

export default Products;
