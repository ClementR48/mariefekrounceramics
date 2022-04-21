import React, { useRef } from "react";
import { Link } from "react-router-dom";
import imgDesktop1 from "../../../assets/images/homeArticle650.jpg";
import imgMobile1 from "../../../assets/images/homeArticle400.jpg";
import imgDesktop2 from "../../../assets/images/homeArticle2_650.JPG";
import imgMobile2 from "../../../assets/images/homeArticle2_400.JPG";
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
          <source srcSet={imgDesktop1} media="(min-width: 400px)" />
          <img src={imgMobile1} alt="vases" />
        </picture>
      </div>
      <div
        className={isVisible2 ? "article2 visible" : "article2"}
        ref={secondArticle}
      >
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
          <source srcSet={imgDesktop2} media="(min-width: 400px)" />
          <img src={imgMobile2} alt="vases" />
        </picture>
      </div>
    </motion.div>
  );
};

export default ArticleHome;
