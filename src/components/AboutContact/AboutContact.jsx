import React from "react";

import "./AboutContact.scss";
import { motion } from "framer-motion";
import ScrollToTop from "../ScrollToTop";
import About from "./About/About";
import Contact from "./Contact/Contact";

const AboutContact = () => {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 0.5 }}
      className="about"
    >
      <ScrollToTop />
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        À propos
      </motion.h2>
    <About />
    <Contact />
      
      
    </motion.main>
  );
};

export default AboutContact;
