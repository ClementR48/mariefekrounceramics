import React, { useRef } from "react";
import { Link } from "react-router-dom";
import imgDesktop1 from "../../../assets/images/homeArticle650.webp";
import imgMobile1 from "../../../assets/images/homeArticle400.webp";
import imgDesktop2 from "../../../assets/images/homeArticle2_650.webp";
import imgMobile2 from "../../../assets/images/homeArticle2_400.webp";
import "./ArticleHome.scss";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const ArticleHome = () => {
  const { ref: firstArticle, inView: isVisible } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });
  const { ref: secondArticle, inView: isVisible2 } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <motion.div
      exit={{ translateX: 100, opacity: 0 }}
      transition={{ duration: 1 }}
      className="home-article"
    >
      <div
        className={isVisible ? "article visible" : "article"}
        ref={firstArticle}
      >
        <div className="informations">
          <h2 className="title">Parler avec la terre</h2>
          <p className="text">
            Chaque pièce ici est unique, faite à la main grâce aux techniques du colombin, du pincé, de la plaque, et parfois du tour. Une série de recherches de textures, de mélange de terres et d’émaux me mène aux résultats présentés. Je crois aux irrégularités et aux imperfections, chaque détail qui rendra la pièce unique et pleine d'émotions !
          </p>
          <Link to="/products">Accéder au shop</Link>
        </div>
        <picture className="picture">
          <source srcSet={imgDesktop1} media="(min-width: 400px)" />
          <img src={imgMobile1} alt="vases" />
        </picture>
      </div>
      <div
        className={isVisible2 ? "article2 visible" : "article2"}
        ref={secondArticle}
      >
        <div className="informations">
          <h2 className="title">Revaloriser l'artisanat</h2>
          <p className="text">
          La pratique de la céramique s'inscrit pour moi dans une profonde reconnexion à la nature et à l'humain : la création de lien social et la transmission des savoirs faire s'allient à un mode de fabrication respectueux, pour des objets durables et une rémunération plus juste.
          </p>
          <Link to="/products">Accéder au shop</Link>
        </div>
        <picture className="picture">
          <source srcSet={imgDesktop2} media="(min-width: 400px)" />
          <img src={imgMobile2} alt="vases" />
        </picture>
      </div>
    </motion.div>
  );
};

export default ArticleHome;
