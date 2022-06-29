import React from "react";
import "./Condition.scss";
import { motion } from "framer-motion";

const Condition = () => {
  return (
    <motion.div
      initial={{ translateY: -300, opacity: 0 }}
      exit={{ translateY: -300, opacity: 0 }}
      animate={{ translateY: 0, opacity: 1 }}
      transition={{ duration: 1 }}
      className="conditions"
    >
      <h2>Conditions Générales de Vente</h2>
      <div>
        Entre l'entreprise Marie Fekroun immatriculée sous le numéro SIRET
        90445825400011 représentée par Mme Marie Fekroun en qualité de gérante,
        dûment habilitée aux fins de présentes. L'entreprise peut être jointe
        par courriel en cliquant sur le formulaire de contact accessible via la
        page d'accueil du site. Ci-après « le Vendeur » ou « l'Entreprise ».
      </div>
      <div>
        {" "}
        D'une part, Et la personne physique ou morale procédant à l'achat de
        produits ou services de l'entreprise, Ci-après, « l'Acheteur » ou « le
        Client »
      </div>
      <div>
        D'autre part, Il a été exposé et convenu ce qui suit ; PREAMBULE Le
        Vendeur est créateur de produits à destination de consommateurs,
        commercialisés par l'intermédiaire de son site Internet
        (www.mariefekrounceramics.fr). La liste et le descriptif des biens
        proposés par l'Entreprise peuvent être consultés sur le site
        susmentionné.
      </div>
      <div>
        Article 1 : Objet Les présentes Conditions Générales de Vente
        déterminent les droit et obligations des parties dans le cadre de la
        vente des céramiques créées par Marie Fekroun.{" "}
      </div>
      <div>
        {" "}
        Article 2 : Dispositions générales Les présentes Conditions Générales de
        Vente (CGV) déterminent les droits et obligations des parties dans le
        cadre de la vente de céramiques créées par Marie Fekroun qui sont partie
        intégrante du Contrat entre l'Acheteur et le Vendeur. Le Vendeur se
        réserve la possibilité de modifier les présentes, à tout moment par la
        publication d'une nouvelle version sur son site Internet. Les CGV
        applicables alors sont celles étant en vigueur à la date du paiement (ou
        du premier paiement en cas de paiement multiples de la commande. Ces CGV
        sont consultables sur le site Internet de l'Entreprise à l'adresse
        suivante : www.mariefekrounceramics.fr. Toute commande passée vaut pour
        acceptation entière et totale des CGV. Le Client déclare être en mesure
        de contracter légalement e vertu des lois françaises ou valablement
        représenter la personne physique ou morale pour laquelle il s'engage.{" "}
      </div>

      <div>
        Article 3 : Prix Les prix des produits vendus sont indiqués en Euros et
        précisément déterminés sur le les fiches des produits sur le site. Les
        prix indiqués sont mentionnés hors frais spécifiques d'expédition. Des
        droits de douane ou autres taxes locales ou droits d'importation ou
        taxes d'état sont susceptibles d'être exigibles dans certains cas. Ces
        droits et sommes de relèvent pas du ressort du Vendeur. Ils seront à la
        charge de l'Acheteur et relèvent de sa responsabilité. L'Entreprise se
        réserve la possibilité de modifier ses prix à tout moment pour l'avenir.{" "}
      </div>
      <div>
        {" "}
        Article 4 : Commande Afin de réaliser sa commande, le Client procède aux
        étapes suivantes : - Choix du Produit, le cas échéant de ses options et
        indique ses données essentielles (identification, adresse...) ;
        -Acceptation des présentes CGV ; -Vérification de la commande ;-Paiement
        en ligne. Livraison des produits : Cette livraison se fera à l'adresse
        indiquée par le Client. Aux fins de bonne réalisation de la commande, et
        conformément à l'article 1316-1 du Code Civil, le Client s'engage à
        fournir ses éléments d'identification véridiques. Le Vendeur se réserve
        la possibilité de refuser la commande, par exemple pour toute demande
        anormale, réalisée de mauvaise foi ou pour tout motif légitime.
      </div>
      <div>
        Article 5 : Clause de réserve de propriété Les produits demeurent la
        propriété de l'Entreprise jusqu'au complet paiement du prix.{" "}
      </div>
      <div>
        {" "}
        Article 7 : Modalités de livraison Les produits sont livrés à l'adresse
        qui a été indiquée lors de la commande et le délai indiqué Ce délai ne
        prend pas en compte la préparation de la commande. L'Acheteur peut
        demander par courriel à recevoir le numéro de suivi de colissimo afin de
        réceptionner au mieux son colis. Le vendeur rappelle qu'au moment où le
        Client prend possession physiquement des produits, les risques de perte
        ou d'endommagement des produits lui est transféré. Il appartient au
        Client de notifier au transporteur toute réserves sur le produit livré.{" "}
      </div>
      <div>
        Article 8 : Disponibilité Les commandes seront traitées dans la limite
        de nos stocks disponibles. Pour tout article indisponible, le Client
        peut écrire par courriel à l’Entreprise afin d'envisager la commande
        d'un article.{" "}
      </div>
      <div>
        Article 9 : Paiement Le paiement est exigible immédiatement à la
        commande. Le Client peut effectuer le règlement par carte de paiement.
        Le paiement sécurisé en ligne est réalisé par notre prestataire de
        paiement. Conformément aux dispositions du Code monétaire et financier,
        l'engagement donné par carte est irrévocable. Le Client confirme qu'il
        est bien le titulaire légal de la carte à débiter et qu'il est
        légalement en droit d'en faire usage. En cas d'erreur ou d'impossibilité
        de débiter la carte, la vente est immédiatement résolue de plein droit
        et la commande est annulée.{" "}
      </div>
      <div>
        Article 10 : Délai de rétractation Conformément à l'article L.121-20 du
        Code de la consommation, « le consommateur dispose d'un délai de
        quatorze jours francs pour exercer son droit de rétractation sans avoir
        à justifier de motifs ni à payer de pénalités, à l'exception, le cas
        échéant, des frais de retour ». « Le délai mentionné à l'alinéa
        précédent court à compter de la réception pour les biens ou de
        l'acceptation de l'offre pour les prestations de services ». Le droit de
        rétractation peut être exercé en contactant l'Entreprise par courriel à
        l'adresse marie.fekroun@gmail.com. En cas d'exercice du droit de
        rétractation dans le délai susmentionné, seul le prix du ou des produits
        achetés et les frais d'envoi seront remboursés, les frais de retour
        restent à la charge du Client. Les retours des produits sont à effectuer
        dans leur état d'origine et complets (emballage) de sorte qu'ils
        puissent être recommercialisés ; ils doivent si possible être
        accompagnés d'une copie du justificatif d'achat.
      </div>
      <div>
        Article 11 : Garanties Conformément à la loi, le Vendeur assume deux
        garanties : de conformité et relative aux vices cachés des produits. Le
        Vendeur rembourse l'acheteur ou échange les produits apparemment
        défectueux ou ne correspondant pas à la commande effectuée. La demande
        de remboursement doit s'effectuer par courriel à l'adresse
        marie.fekroun@gmail.com.{" "}
      </div>
      <div>
        Article 12 : Réclamations Le cas échéant, l'Acheteur peut présenter
        toute réclamation en contactant l'Entreprise au moyen du courriel
        suivant : marie.fekroun@gmail.com.{" "}
      </div>
      <div>
        Article 13 : Droits de propriété intellectuelle Les marques, logos, noms
        de domaines, produits, images, vidéos, photos, textes ou plus
        généralement toute information objet de droits de propriété
        intellectuelle sont et restent la propriété exclusive du vendeur. Aucune
        cession de droits de propriété intellectuelle n'est réalisé au travers
        des présentes CGV. Toute reproduction totale ou partielle, modification
        ou utilisation de ces biens pour quelque motif que ce soit est
        strictement interdite.{" "}
      </div>
      <div>
        Article 14 : Force majeure L'exécution des obligations du Vendeur au
        terme des présentes est suspendue en cas de survenance d'un cas fortuit
        ou de force majeure qui empêcherait l'exécution. Le Vendeur avisera le
        Client de la survenance d'un tel événement dès que possible.{" "}
      </div>
      <div>
        Article 15 : Nullité et modification du contrat Si l'une des
        stipulations du présent contrat était annulée, cette nullité
        n'entraînerait pas la nullité des autres stipulations qui demeureront en
        vigueur entre les parties. Toute modification contractuelle n'est
        valable qu'après un accord écrit et signé des parties.{" "}
      </div>
      <div>
        Article 16 : Protection des données personnelles Conformément à la Loi
        Informatique et Libertés du 6 janvier 1978, vous disposez des droits
        d'interrogation, d'accès, de modification, d'opposition et de
        rectification sur les données personnelles vous concernant. En adhérant
        à ces conditions générales de vente, vous consentez à ce que nous
        collections et utilisions ces données pour la réalisation du présent
        contrat.{" "}
      </div>
      <div>
        Article 17 : Droit applicable Toutes les clauses figurant dans les
        présentes CGV, ainsi que toutes les opérations d'achat et de vente qui y
        sont visées, seront soumises au droit français.
      </div>
    </motion.div>
  );
};

export default Condition;
