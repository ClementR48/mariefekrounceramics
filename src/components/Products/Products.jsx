import React, { useCallback, useEffect, useRef, useState } from "react";
import Loader from "../Loader/Loader";

import Categories from "./Category/Category";
import Product from "./Product/Product";
import "./Products.scss";
import { motion } from "framer-motion";
import ScrollToTop from "../ScrollToTop";

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
  const [listLittle, setListLittle] = useState(false)

  useEffect(() => {
   

      if(productsToShow.length < 3 && productsToShow.length > 0 ){
        setListLittle(true)
      }else{
        setListLittle(false)
      }
    
    
  }, [productsToShow])

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
      <ScrollToTop />

      {categories.length !== 0 || productsToShow.length !== 0 ? (
        <>
          <motion.ul
            transition={{ duration: 1 }}
            initial={{
              translateY: -100,
              opacity: 0,
            }}
            animate={{
              translateY: 0,
              opacity: 1,
            }}
            exit={{
              translateY: -100,
              opacity: 0,
            }}
            className="list_categories"
          >
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
          </motion.ul>

          <motion.ul
            transition={{ duration: 1 }}
            initial={{
              translateY: 100,
              opacity: 0,
            }}
            animate={{
              translateY: 0,
              opacity: 1,
            }}
            exit={{
              translateY: 100,
              opacity: 0,
            }}
            className={listLittle ? "list_products little":"list_products"}
          >
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
          </motion.ul>
        </>
      ) : (
        <Loader />
      )}
    </motion.main>
  );
};

export default Products;
