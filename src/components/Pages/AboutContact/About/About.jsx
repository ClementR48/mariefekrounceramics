import React from "react";
import imgDesktop from "../../../../assets/images/marieAboutDesktop.webp";
import imgMobile from "../../../../assets/images/marieAboutMobile.webp";
import { motion } from "framer-motion";
import "./About.scss";

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
        Marie découvre l’argile au Népal, à la fin d’un voyage d’un an et demi
        en Asie et dans le Pacifique. C’est un coup de coeur pour la matière.
        S’ensuit un voyage en Colombie, au cours duquel elle passera plusieurs
        mois chez la céramiste Margarita Casas. Elle y découvrira la vie
        d'atelier et commencera son apprentissage sur un tour de potier. Après
        cette expérience privilégiée, Marie n'aura plus que l'argile en tête et
        décide à son retour de partir se former en Espagne à Séville, puis à
        Grenade. Elle y sera assistante de production dans un atelier en échange
        de cours du soir. Aujourd’hui de retour à Marseille où elle a grandi,
        Marie est installée à l’Atelier Déméterre, où elle façonne des objets
        décoratifs et utilitaires en petite série. L’essentiel de ses recherches
        s’organise autour des mélanges et des textures. Grâce à ces deux
        procédés, elle crée des pièces organiques et brutes, largement inspirées
        de la nature: texture corail ou écaille, mouvement de l'eau ou dunes de
        sable. Chaque objet est façonné à la main selon les techniques lentes du
        modelage, puis texturé, encore plus lentement, grâce à un processus
        d'empreinte.
      </motion.p>
    </div>
  );
};

export default About;
