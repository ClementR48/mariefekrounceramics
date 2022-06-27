import { useEffect, useState } from "react";
import "./Button.scss";

const Button = ({ text, color, size, fn, productId, loading = false, fontSize }) => {
  const [textToDisplay, setTextToDisplay] = useState(text);

  const textButtonLetters = textToDisplay.split("");

  useEffect(() => {
    loading ? setTextToDisplay("Patientez") : setTextToDisplay(text);
  }, [loading, text]);
  return (
    <button
      className={!loading ? "btn" : "btn none"}
      style={{ width: size}}
      onClick={() => !loading && fn(productId, 1)}
    >
      <div className="span-container s1">
        {textButtonLetters.map((letter, index) => {
          return (
            <span
            
              key={index}
              style={{
                fontSize: fontSize,
                transitionDelay: ` ${0.05 * index}s`,
              }}
            >
              {letter}
            </span>
          );
        })}
      </div>
      <div className="span-container s2">
        {textButtonLetters.map((letter, index) => {
          return (
            <span
              key={index}
              style={{
                fontSize: fontSize ,
                transitionDelay: ` ${0.05 * index}s`,
              }}
            >
              {letter}
            </span>
          );
        })}
      </div>
    </button>
  );
};

export default Button;
