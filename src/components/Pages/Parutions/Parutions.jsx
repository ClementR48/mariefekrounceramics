import React from "react";
import ScrollToTop from "../../Others/ScrollToTop";
import { motion } from "framer-motion";
import "./Parutions.scss";

const Parutions = () => {
  return (
    <motion.div
      initial={{ translateX: 300, opacity: 0 }}
      exit={{ translateX: 300, opacity: 0 }}
      animate={{ translateX: 0, opacity: 1 }}
      transition={{ duration: 1 }}
      className="parutions"
    >
      <ScrollToTop />
      <h2>Liste des Parutions</h2>
      <ul>
        <li>
          <h3>Elle Décoration</h3>
          <span>Juillet - Aout 2022</span>
        </li>
      </ul>
    </motion.div>
  );
};

export default Parutions;
