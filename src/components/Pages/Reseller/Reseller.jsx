import React from "react";
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

            Lien vers leur site
          </a>
        </li>
        <li>
          <h3>La butinerie</h3>
          <span>103 rue Sainte </span>
          <span>13007 Marseille</span>

          <a
            target="_blank"
            rel="noreferrer"
            href="https://instagram.com/labutinerie.marseille?igshid=YmMyMTA2M2Y="
          >

            Lien vers leur site
          </a>
        </li>
      </ul>
    </motion.div>
  );
};

export default Reseller;
