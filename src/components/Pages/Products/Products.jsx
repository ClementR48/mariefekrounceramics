import React, { useCallback, useEffect, useMemo, useState } from "react";
import Loader from "../../Others/Loader/Loader";

import Categories from "./Category/Category";
import Product from "./Product/Product";
import "./Products.scss";
import { motion } from "framer-motion";
import { commerce } from "../../../lib/commerce";
import useFetch from "../../../hook/useFetch";

const Products = ({ cart }) => {
  const [selectedCateg, setSelectCateg] = useState(undefined);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCategories = useFetch(commerce.categories);
  const fetchProductsByCategory = useFetch(
    commerce.products,
  );

  console.log(selectedCateg);

  const filterByCategory = () => {
    setLoading(true);
    commerce.products
      .list(selectedCateg ? { category_id: [selectedCateg] } : {})
      .then((product) => {
        if (product) {
          setProducts(product.data);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {

  }, [selectedCateg]);

  if (fetchCategories.loading) return <p>Loading...</p>;
  if (fetchProductsByCategory.loading) return <p>Loading...</p>;

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
          {fetchCategories?.data
            .filter((category) => category.products !== 0)
            .map((category) => {
              return (
                <Categories
                  key={category.id}
                  category={category}
                  onClick={setSelectCateg}
                  selectedCateg={selectedCateg}
                />
              );
            })}
          <li>
            <span
              className={!selectedCateg ? "category selected" : "category"}
              onClick={() => setSelectCateg(undefined)}
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
          className={"list_products"}
        >
          {loading ? (
            <Loader />
          ) : (
            fetchProductsByCategory?.data.map((product) => {
              return <Product key={product.id} product={product} cart={cart} />;
            })
          )}
        </motion.ul>
      </>
    </motion.main>
  );
};

export default Products;
