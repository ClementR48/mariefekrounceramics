import React, { useEffect, useState } from "react";
import { ShoppingCart } from "react-feather";
import { NavLink } from "react-router-dom";
import logoPink from "../../../../assets/images/logoRose.webp";
import logoWhite from "../../../../assets/images/logoBlanc.webp";
import "./Nav.scss";

const Nav = ({
  totalItems,
  colorNavHome,
  navBarScrollBackground,
  addRefLink,
  hover,
  hoverOff,
  openMenu,
}) => {
  const [logo, setLogo] = useState();

  useEffect(() => {
    if (openMenu) {
      setLogo(logoPink);
    } else if (colorNavHome) {
      if (navBarScrollBackground) {
        setLogo(logoPink);
      } else {
        setLogo(logoWhite);
      }
    } else {
      setLogo(logoPink);
    }
  }, [colorNavHome, navBarScrollBackground, openMenu]);
  return (
    <>
      <div className="nav_logo">
        <img src={logo} alt="logo" />
      </div>
      <nav
        className={
          colorNavHome
            ? navBarScrollBackground
              ? "nav_links"
              : "nav_links home_nav"
            : "nav_links"
        }
      >
        <NavLink
          onMouseEnter={(e) => hover(e)}
          onMouseLeave={() => hoverOff()}
          ref={addRefLink}
          exact="true"
          to="/"
        >
          Accueil
        </NavLink>
        <NavLink
          onMouseEnter={(e) => hover(e)}
          onMouseLeave={() => hoverOff()}
          ref={addRefLink}
          exact="true"
          to="/products"
        >
          Boutique
        </NavLink>

        <NavLink
          onMouseEnter={(e) => hover(e)}
          onMouseLeave={() => hoverOff()}
          ref={addRefLink}
          exact="true"
          to="/about"
        >
          A propos
        </NavLink>
        <NavLink
          onMouseEnter={(e) => hover(e)}
          onMouseLeave={() => hoverOff()}
          ref={addRefLink}
          exact="true"
          to="/cart"
        >
          <ShoppingCart />
          <span>{totalItems}</span>
        </NavLink>
      </nav>
      <div
        className={
          colorNavHome
            ? navBarScrollBackground
              ? "anim_hover"
              : "anim_hover home"
            : "anim_hover"
        }
      >
        <div ref={addRefLink} className="anim_hover_move"></div>
      </div>
    </>
  );
};

export default Nav;
