import React from "react";
import { Instagram } from "react-feather";
import { Link } from "react-router-dom";
//import logo from '../../assets/images/logoRose.png'
import logo from "../../assets/images/logoBlanc.png";
import "./Footer.scss";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 2, duration: 3 }}
      className="footer"
    >
      <img className="logo1" src={logo} alt="logo"></img>
      <ul className="list-contact">
        <h3>Contact</h3>
        <li>
          <Link className="footer-contact" to="/about">
            A propos
          </Link>
        </li>
        <li className="instagram_link">
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.instagram.com/mariefekceramics/"
          >
            <Instagram size="16" />
            <span>@mariefekceramics</span>
          </a>
        </li>
        <li>marie.fekroun@gmail.com</li>
      </ul>
      <ul className="list-utils">
        <h3>Liens utiles</h3>
        <li>
          <Link className="footer-contact" to="/conditions">
            CGV
          </Link>
        </li>
        <li>
          <Link className="footer-contact" to="/reseller">
            Listes des revendeurs
          </Link>
        </li>
        <li>
          <Link className="footer-contact" to="/">
            Parutions
          </Link>
        </li>
      </ul>
    </motion.footer>
  );
};

export default Footer;
