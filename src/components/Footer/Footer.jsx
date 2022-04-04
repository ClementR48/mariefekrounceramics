import React from 'react';
import { Instagram } from 'react-feather';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logoRose.png'
import './Footer.scss';

const Footer = () => {
  return (
    <footer className='footer'>
      <img className="logo1" src={logo} alt="logo"></img>
      <ul className="list-contact">
        <li>
          <Link className="footer-contact" to="/contact">
            Me contacter
          </Link>
        </li>
        <li>
          
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.instagram.com/mariefekceramics/"
          >
           <Instagram size = '20'/>:  @mariefekceramics
          </a>
        </li>
        <li>
          marie.fekroun@gmail.com
        </li>
      </ul>
      <img className='logo2' src={logo} alt="logo"></img>
    </footer>
  );
};

export default Footer;