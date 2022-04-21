import React from "react";
import { Instagram } from "react-feather";
import { Link } from "react-router-dom";
//import logo from '../../assets/images/logoRose.png'
import logo from "../../assets/images/logoBlanc.png";
import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <img className="logo1" src={logo} alt="logo"></img>
      <ul className="list-contact">
        <h3>Contact</h3>
        <li>
          <Link className="footer-contact" to="/about">
            A propos
          </Link>
        </li>
        <li>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.instagram.com/mariefekceramics/"
          >
            <Instagram size="20" />: @mariefekceramics
          </a>
        </li>
        <li>marie.fekroun@gmail.com</li>
      </ul>
      <ul className="list-utils">
        <h3>Liens utiles</h3>
        <li>
          <Link className="footer-contact" to="/">
            CGV
          </Link>
        </li>
        <li>
          <Link className="footer-contact" to="/">
            Listes des revendeurs
          </Link>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
