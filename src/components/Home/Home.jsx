import React from "react";
import ArticleHome from "./ArticleHome/ArticleHome";
import ImageHome from "./ImageHome/ImageHome";
import { motion } from "framer-motion";
import "./Home.scss";

const Home = () => {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 0.5 }}
      className="home"
    >
      <ImageHome />
      <ArticleHome />
    </motion.main>
  );
};

export default Home;
