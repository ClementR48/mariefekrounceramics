import React from "react";

import "./AboutContact.scss";
import { motion } from "framer-motion";
import About from "./About/About";
import Contact from "./Contact/Contact";

const AboutContact = () => {
  return (
    <motion.main
       initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      
      className="about"
    >
      
      <motion.h2
        initial={{ opacity: 0, translateX: -100 }}
        animate={{ opacity: 1, translateX:0 }}
        exit={{ opacity: 0, translateX:-100}}
        transition={{ duration: 1 }}
      >
        À propos
      </motion.h2>
    <About />
    <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className='contact_title'
      >
        Contact
      </motion.h2>
    <Contact />
      
      
    </motion.main>
  );
};

export default AboutContact;
