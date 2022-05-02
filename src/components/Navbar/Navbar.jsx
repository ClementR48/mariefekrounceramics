import React, { useEffect, useRef, useState } from "react";
import Nav from "./Nav/Nav";

import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

import "./Navbar.scss";

const Navbar = ({ totalItems, openMenu, openMenuFunc }) => {
  const [colorNavHome, setColorNavHome] = useState(true);
  const [divAnim, setDivAnim] = useState(0);
  const [navBarScrollBackground, setNavBarScrollBackground] = useState(false);

  const location = useLocation();
  const allLink = useRef([]);

  const addRefLink = (el) => {
    if (el && !allLink.current.includes(el)) {
      allLink.current.push(el);
    }
  };

  const anim = allLink.current.filter(
    (link) => link.className === "anim_hover_move"
  );

  useEffect(() => {
    const anim = allLink.current.filter(
      (link) => link.className === "anim_hover_move"
    );
    anim[0].style.left = `${divAnim}px`;
    anim[0].style.opacity = "1"
  }, [divAnim]);

  useEffect(() => {
    const currentLink = allLink.current.filter(
      (link) => link.className === "active"
    );
    const anim = allLink.current.filter(
      (link) => link.className === "anim_hover_move"
    );
    currentLink.length !== 0
      ? setDivAnim(
          currentLink[0].getBoundingClientRect().left +
            currentLink[0].offsetWidth / 2
        )
      : (anim[0].style.opacity = "0");
  }, [location]);

  const hover = (e) => {
    setDivAnim(
      e.target.getBoundingClientRect().left + e.target.offsetWidth / 2
    );
  };

  const hoverOff = () => {
    const currentLink = allLink.current.filter(
      (link) => link.className === "active"
    );
    const anim = allLink.current.filter(
      (link) => link.className === "anim_hover_move"
    );
    currentLink.length !== 0
      ? setDivAnim(
          currentLink[0].getBoundingClientRect().left +
            currentLink[0].offsetWidth / 2
        )
      : (anim[0].style.opacity = "0");
  };

  useEffect(() => {
    if (location.pathname === "/") {
      setColorNavHome(true);
    } else {
      setColorNavHome(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    const animNav = () => {
      if (window.scrollY > 1) {
        setNavBarScrollBackground(true);
      } else {
        setNavBarScrollBackground(false);
      }
    };
    window.addEventListener("scroll", animNav);

    return () => {
      window.removeEventListener("scroll", animNav);
    };
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={
        openMenu
          ? "header active"
          : navBarScrollBackground
          ? "header change_color"
          : "header"
      }
    >
      <Nav
        navBarScrollBackground={navBarScrollBackground}
        colorNavHome={colorNavHome}
        hover={hover}
        addRefLink={addRefLink}
        totalItems={totalItems}
        hoverOff={hoverOff}
        openMenu={openMenu}
      />

      <div
        className={openMenu ? "hamburger active" : "hamburger"}
        onClick={() => openMenuFunc()}
      >
        <span className="line1"></span>
        <span className="line2"></span>
        <span className="line3"></span>
      </div>
    </motion.header>
  );
};

export default Navbar;
