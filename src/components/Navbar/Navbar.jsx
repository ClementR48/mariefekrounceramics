import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = ({ totalItems }) => {

  return (
    <nav>
      <NavLink exact="true" to='/'>
        Acceuil
      </NavLink>
      <NavLink exact="true" to='/products'>
        Boutique
      </NavLink>
      <NavLink exact="true" to='/contact'>
        Contact
      </NavLink>
      <NavLink exact="true" to='/about'>
        A propos
      </NavLink>
      <NavLink exact="true" to='/cart'>
        Cart<span>{totalItems}</span>
      </NavLink>
     
    </nav>
  );
};

export default Navbar;
