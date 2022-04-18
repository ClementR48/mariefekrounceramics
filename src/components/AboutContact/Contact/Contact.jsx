import React, { useState } from "react";
import { motion } from "framer-motion";
import emailjs from '@emailjs/browser';
import "./Contact.scss";
import { Instagram } from "react-feather";

import logo from "../../../assets/images/logoBlanc.png";

const Contact = () => {

  const [validate, setValidate] = useState(false)

  const [name, setName] = useState("");
  const [objet, setObjet] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    console.log(e.target);
    e.preventDefault();
    if(name !== "" && email !== "" && objet !== "" && message !== ""){
      emailjs
          .sendForm(
            "service_p1h4m9i",
            "template_o4g4vph",
            e.target,
            "user_S6W9cox0UxXXczGLydsea"
          ).then((result) => {
            console.log(result);
          },(error) => {
            console.log(error);
          })  
    }else{
      setValidate(true)
      setTimeout(() => {
        setValidate(false)
      }, 5000)
    }
  }

  return (
    <div className="contact">
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
      </div>
      <form onSubmit={(e) => handleSubmit(e)} className="right">
        {validate && <p className="error_message">Tous les champs doivent être remplis</p>}
        <label>
          Nom
          <input value={name} onChange={(e) => setName(e.target.value)} type='text'></input>
        </label>
        <label>
          Email
          <input value={email} onChange={(e) => setEmail(e.target.value)} type='email'></input>
        </label>
        <label>
          Objet
          <input value={objet} onChange={(e) => setObjet(e.target.value)} type='text'></input>
        </label>
        <label>
          Message
          <textarea value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
        </label>
        <button type="submit">Confirmer</button>
      </form>
    </div>
  );
};

export default Contact;
