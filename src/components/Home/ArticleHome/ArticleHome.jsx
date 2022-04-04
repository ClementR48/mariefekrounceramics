import React from "react";
import { Link } from "react-router-dom";
import img from "../../../assets/images/image_article_home.jpg";
import './ArticleHome.scss';

const ArticleHome = () => {
  return (
    <div className="home-article">
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
        <div className="picture">
          <img src={img} alt="vase"></img>
        </div>
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
        <div className="picture">
          <img src={img} alt="vase"></img>
        </div>
      </div>
    </div>
  );
};

export default ArticleHome;
