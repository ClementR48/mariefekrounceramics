import React, {useEffect, useState } from "react";
import Loader from "../../Others/Loader/Loader";

import Categories from "./Category/Category";
import Product from "./Product/Product";
import "./Products.scss";
import { motion } from "framer-motion";

const Products = ({
  products,
  categories,
  setProductsToShow,
  productsToShow,
  changeListProducts,
  cart,
  loading,
}) => {
  const [activeCateg, setActiveCateg] = useState("all");
  const [listLittle, setListLittle] = useState(false);

  useEffect(() => {
    productsToShow.length < 3 && productsToShow.length > 0
      ? setListLittle(true)
      : setListLittle(false);
  }, [productsToShow]);

  useEffect(() => {
    activeCateg !== "all"
      ? changeListProducts(activeCateg)
      : setProductsToShow(products);
  }, [activeCateg, products]);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 0.5 }}
      className="products"
    >
      <>
        <motion.ul
          transition={{ duration: 2 }}
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
            .map((category) => {
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
          className={listLittle ? "list_products little" : "list_products"}
        >
          {loading ? (
            <Loader />
          ) : (
            productsToShow.map((product) => {
              return <Product key={product.id} product={product} cart={cart} />;
            })
          )}
        </motion.ul>
      </>
      )
    </motion.main>
  );
};

export default Products;
