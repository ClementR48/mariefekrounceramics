import React from "react";
import ScrollToTop from "../../Others/ScrollToTop";
import { motion } from "framer-motion";
import "./Reseller.scss";

const Reseller = () => {
  return (
    <motion.div
      initial={{ translateX: -300, opacity: 0 }}
      exit={{ translateX: -300, opacity: 0 }}
      animate={{ translateX: 0, opacity: 1 }}
      transition={{ duration: 1 }}
      className="reseller"
    >
      <ScrollToTop />
      <h2>Liste des revendeurs</h2>
      <ul>
        <li>
          <h3>Solarium</h3>
          <span>40 Boulevard de la Liberté </span>
          <span>13001 Marseille</span>

          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.solariummarseille.fr/"
          >
            {" "}
            Lien vers leur site
          </a>
        </li>
      </ul>
    </motion.div>
  );
};

export default Reseller;
