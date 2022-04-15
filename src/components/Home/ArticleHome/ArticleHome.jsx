import React from "react";
import { Link } from "react-router-dom";
import imgDesktop from "../../../assets/images/homeArticle650.jpg";
import imgMobile from "../../../assets/images/homeArticle400.jpg";
import "./ArticleHome.scss";
import { motion } from "framer-motion";

const ArticleHome = () => {
  return (
    <motion.div
      exit={{ translateX: 100, opacity: 0 }}
      transition={{ duration: 1 }}
      className="home-article"
    >
      <div className="article">
        <div className="informations">
          <h2 className="title">Parler avec la nature</h2>
          <p className="text">
            Avoir les mains dans la terre et se laisser guider par elle. Parler
            avec la terre, mais aussi dire la terre. Pour moi il s’agit d’une
            démarche profondément instinctive et libre. Grâce à la technique des
            terres mêlées, ou nériage, je laisse les terres se mélanger et
            dessiner des marbrures uniques.
          </p>
          <Link to="/products">Accéder au shop</Link>
        </div>
        <picture className="picture">
          <source srcSet={imgDesktop} media="(min-width: 400px)" />
          <img src={imgMobile} alt="vases" />
        </picture>
      </div>
      <div className="article2">
        <div className="informations">
          <h2 className="title">Parler avec la nature</h2>
          <p className="text">
            Avoir les mains dans la terre et se laisser guider par elle. Parler
            avec la terre, mais aussi dire la terre. Pour moi il s’agit d’une
            démarche profondément instinctive et libre. Grâce à la technique des
            terres mêlées, ou nériage, je laisse les terres se mélanger et
            dessiner des marbrures uniques.
          </p>
          <Link to="/products">Accéder au shop</Link>
        </div>
        <picture className="picture">
          <source srcSet={imgDesktop} media="(min-width: 400px)" />
          <img src={imgMobile} alt="vases" />
        </picture>
      </div>
    </motion.div>
  );
};

export default ArticleHome;
