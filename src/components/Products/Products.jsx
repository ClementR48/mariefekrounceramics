import { AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import Loader from "../Loader/Loader";

import Categories from "./Category/Category";
import Product from "./Product/Product";
import "./Products.scss";
import { motion } from "framer-motion";
const Products = ({
  setProductsToShow,
  products,
  productsToShow,
  onAddToCart,
  categories,
  changeListProducts,
  cart,
}) => {
  const [activeCateg, setActiveCateg] = useState("all");

  useEffect(() => {
    if (activeCateg !== "all") {
      changeListProducts(activeCateg);
    } else {
      setProductsToShow(products);
    }
  }, [activeCateg]);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 0.5 }}
      className="products"
    >
      {categories.length !== 0 || productsToShow.length !== 0 ? (
        <>
          <ul className="list_categories">
            {categories
              .filter((category) => category.products !== 0)
              .map((category, index) => {
                return (
                  <li
                    className={
                      category.id === activeCateg
                        ? "category selected"
                        : "category"
                    }
                    key={category.id}
                    onClick={() => setActiveCateg(category.id)}
                  >
                    <Categories category={category} />
                  </li>
                );
              })}
            <li>
              <span
                className={
                  "all" === activeCateg ? "category selected" : "category"
                }
                onClick={() => setActiveCateg("all")}
              >
                Tout
              </span>
            </li>
          </ul>
          <ul className="list_products">
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
    </motion.main>
  );
};

export default Products;
