import React, { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import "./Contact.scss";
import { Instagram } from "react-feather";

import logo from "../../../assets/images/logoBlanc.png";
import { useInView } from "react-intersection-observer";

const Contact = () => {
  const [validate, setValidate] = useState(false);

  const [name, setName] = useState("");
  const [objet, setObjet] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const { ref: contactForm, inView: isVisible } = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });

  const [successMessage, setSuccessMessage] = useState(false);

  const [buttonAddProduct, setButtonAddProduct] = useState("Confirmer");

  const textButtonLetters = buttonAddProduct.split("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name !== "" && email !== "" && objet !== "" && message !== "") {
      emailjs
        .sendForm(
          "service_p1h4m9i",
          "template_o4g4vph",
          e.target,
          "user_S6W9cox0UxXXczGLydsea"
        )
        .then(
          (result) => {
            setSuccessMessage(true);
            setTimeout(() => {
              setSuccessMessage(false);
              setEmail("");
              setMessage("");
              setName("");
              setObjet("");
            }, [7000]);
          },
          (error) => {
            console.log(error);
          }
        );
    } else {
      setValidate(true);
      setTimeout(() => {
        setValidate(false);
      }, 5000);
    }
  };

  return (
    <div className="contact" ref={contactForm}>
      <div className="left">
        <p>Just Say Hi</p>
        <img src={logo} alt="logo" />
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.instagram.com/mariefekceramics/?hl=fr"
        >
          <Instagram />
        </a>
        <div
          className={
            successMessage ? "success_message send" : "success_message"
          }
        >
          Votre message a bien été envoyé.
        </div>
      </div>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className={
          isVisible ? (successMessage ? "right send" : "right") : "right send"
        }
      >
        {validate && (
          <p className="error_message">Tous les champs doivent être remplis.</p>
        )}
        <label>
          Nom
          <input
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
          ></input>
        </label>
        <label>
          Email
          <input
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          ></input>
        </label>
        <label>
          Objet
          <input
            name="objet"
            value={objet}
            onChange={(e) => setObjet(e.target.value)}
            type="text"
          ></input>
        </label>
        <label>
          Message
          <textarea
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </label>
        <button type="submit" className="checkout">
          <div className="span-container s1">
            {textButtonLetters.map((letter, index) => {
              return (
                <>
                  {letter !== " " ? (
                    <span
                      key={index}
                      style={{
                        transitionDelay: ` ${0.05 * index}s`,
                      }}
                    >
                      {letter}
                    </span>
                  ) : (
                    <span
                      key={index}
                      style={{
                        transitionDelay: ` ${0.05 * index}s`,
                      }}
                    >
                      &nbsp;
                    </span>
                  )}
                </>
              );
            })}
          </div>
          <div className="span-container s2">
            {textButtonLetters.map((letter, index) => {
              return (
                <>
                  {letter !== " " ? (
                    <span
                      key={index}
                      style={{
                        transitionDelay: ` ${0.05 * index}s`,
                      }}
                    >
                      {letter}
                    </span>
                  ) : (
                    <span
                      key={index}
                      style={{
                        transitionDelay: ` ${0.05 * index}s`,
                      }}
                    >
                      &nbsp;
                    </span>
                  )}
                </>
              );
            })}
          </div>
        </button>
      </form>
    </div>
  );
};

export default Contact;
