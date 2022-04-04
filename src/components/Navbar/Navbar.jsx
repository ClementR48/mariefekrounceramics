import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import HomeNav from "./HomeNav/HomeNav";
import Nav from "./Nav/Nav";

import "./Navbar.scss";

const Navbar = ({ totalItems }) => {
  const [homePage, setHomePage] = useState(true);
  const [divAnim, setDivAnim] = useState({})
  
  
  const location = useLocation();

  const allLink = useRef([]);

  const addRefLink = (el) => {
    if (el && !allLink.current.includes(el)) {
      allLink.current.push(el);
    }
  };

  useEffect(() => {
    setDivAnim(allLink.current[5])
    
  }, [])
  

 

  



  const hover = (e) => {
    const size = e.target.offsetLeft + e.target.offsetWidth / 2;
    divAnim.style.transform = `translateX(${size}px)`;
    divAnim.style.opacity = `1`;
  };

  const hoverOff = () => {
    allLink.current[5].style.opacity = 0;
  }

  useEffect(() => {
    if (location.pathname === "/") {
      setHomePage(true);
     
    } else {
      
      setHomePage(false);
    }
  }, [location.pathname]);

  return (
    <header className="header">
      {homePage ? (
        <HomeNav addRefLink={addRefLink} totalItems={totalItems} hover={hover} hoverOff={hoverOff} />
      ) : (
        <Nav hover={hover} addRefLink={addRefLink} totalItems={totalItems} hoverOff={hoverOff} />
      )}
    </header>
  );
};

export default Navbar;
