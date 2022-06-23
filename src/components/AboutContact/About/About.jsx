import React from 'react';
import imgDesktop from "../../../assets/images/marieAboutDesktop.jpg";
import imgMobile from "../../../assets/images/marieAboutMobile.jpg";
import { motion } from "framer-motion";
import './About.scss'

const About = () => {
  return (
    <div className="container-about">
        <picture>
          <source srcSet={imgDesktop} media="(min-width: 1000px)" />

          <motion.img
            initial={{ translateX: -20, opacity: 0 }}
            animate={{ opacity: 1, translateX: 0 }}
            exit={{ translateX: -20, opacity: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            src={imgMobile}
            alt="vases"
          />
        </picture>
        <motion.p
          initial={{ translateX: 20, opacity: 0 }}
          animate={{ opacity: 1, translateX: 0 }}
          exit={{ translateX: 20, opacity: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Je m’appelle Marie Fekroun, j’ai 27 ans et je pratique la céramique
          essentiellement en autodidacte depuis 2018. J’aime dire que c’est
          voyager au bout du monde qui m’a donné envie de travailler la terre,
          et de m’encrer dans les éléments. J’étais en quête de sens et cette
          rencontre a été une évidence. Lors de mes voyages, j’ai assisté à
          toutes sortes de manifestations de l’art céramique (dans son aspect le
          plus primitif mais aussi le plus moderne) et j’ai pu voir comment
          chaque culture se l’était approprié au fil des siècles. Ca a été un
          fil conducteur pour moi, quelque chose de toujours présent en fond,
          qui me guidait de destination en destination, jusqu’à atterrir en
          Colombie, chez Margarita Casas, qui m’a ouvert sa maison et son
          atelier pendant deux mois. Après cette immersion je n’avais plus que
          l’argile en tête. Mes pièces sont modelées à la main grâce aux
          techniques du colombin, du pincé et de la plaque. Je crois aux
          imperfections, aux irrégularités, aux traces de pinceaux, traces de
          doigts. Chaque détail qui rendra la pièce unique et pleine d'émotion.
        </motion.p>
      </div>
  );
};

export default About;