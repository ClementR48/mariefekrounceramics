import React, { useCallback, useEffect, useMemo, useState } from "react";
import Loader from "../../Others/Loader/Loader";

import Categories from "./Category/Category";
import Product from "./Product/Product";
import "./Products.scss";
import { motion } from "framer-motion";
import { commerce } from "../../../lib/commerce";

const Products = ({ cart }) => {
  const [selectedCateg, setSelectCateg] = useState(undefined);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCategories = useCallback(() => {
    setLoading(true);

    commerce.categories
      .list()
      .then((response) => {
        if (response) {
          setCategories(response.data);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des catégories :", error);
        setLoading(false);
      });
  }, []);

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

  const memoizedCategories = useMemo(() => categories, [categories]);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    filterByCategory();
  }, [selectedCateg]);

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
          {memoizedCategories
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
            products?.map((product) => {
              return <Product key={product.id} product={product} cart={cart} />;
            })
          )}
        </motion.ul>
      </>
    </motion.main>
  );
};

export default Products;
