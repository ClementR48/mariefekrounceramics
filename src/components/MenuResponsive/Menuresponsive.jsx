import React from "react";
import { ShoppingCart } from "react-feather";
import { NavLink } from "react-router-dom";
import './Menuresponsiver.scss'

const Menuresponsive = ({ totalItems, openMenuFunc, openMenu }) => {
  return (
    <nav className={openMenu ? "menuresponsive active" : "menuresponsive"}>
      <NavLink onClick={() => openMenuFunc()} exact="true" to="/">
        Acceuil
      </NavLink>
      <NavLink onClick={() => openMenuFunc()} exact="true" to="/products">
        Boutique
      </NavLink>
      <NavLink onClick={() => openMenuFunc()} exact="true" to="/contact">
        Contact
      </NavLink>
      <NavLink onClick={() => openMenuFunc()} exact="true" to="/about">
        A propos
      </NavLink>
      <NavLink onClick={() => openMenuFunc()} exact="true" to="/cart">
        <ShoppingCart />
        <span>{totalItems}</span>
      </NavLink>
    </nav>
  );
};

export default Menuresponsive;
