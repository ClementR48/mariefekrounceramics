import React from "react";
import { ShoppingCart } from "react-feather";
import { NavLink } from "react-router-dom";
import logo from "../../../assets/images/logoBlanc.png";
import logo2 from "../../../assets/images/logoRose.png";
import "./HomeNav.scss";

const HomeNav = ({
  totalItems,
  addRefLink,
  hover,
  hoverOff,
  navBarScrollBackground,
  openMenu,
}) => {
  return (
    <>
      <div className="nav_logo">
        <img
          src={openMenu ? logo2 : navBarScrollBackground ? logo2 : logo}
          alt="logo"
        />
      </div>
      <nav
        className={
          navBarScrollBackground ? "homenav_link change_color" : "homenav_link "
        }
      >
        <NavLink
          onMouseEnter={(e) => hover(e)}
          onMouseLeave={() => hoverOff()}
          ref={addRefLink}
          exact="true"
          to="/"
        >
          Acceuil
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
          to="/contact"
        >
          Contact
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
        <div className="anim_hover">
          <div ref={addRefLink} className="anim_hover_move"></div>
        </div>
      </nav>
    </>
  );
};

export default HomeNav;
