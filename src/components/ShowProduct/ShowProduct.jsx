import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import "./ShowProduct.scss";
import striptags from "striptags";
import { motion } from "framer-motion";
import ScrollToTop from "../ScrollToTop";

const ShowProduct = ({
  fetchOneProduct,
  product,
  cart,
  products,
  onAddToCart,
  fetchProducts,
  loading,
  
}) => {
  const { id } = useParams();
  const [available, setAvailable] = useState();
  const [buttonAddProduct, setButtonAddProduct] = useState("Panier");

  const textButtonLetters = buttonAddProduct.split("");

  useEffect(() => {
    loading ? setButtonAddProduct("Patientez") : setButtonAddProduct("Panier");
  }, [loading]);

  let navigate = useNavigate();

  let cursorRef = useRef();

  const mousepos = (e) => {
    cursorRef.current.setAttribute(
      "style",
      `top:${e.clientY - 40}px ; left:${e.clientX - 40}px; opacity:1`
    );
  };

  const mouseLeave = () => {
    cursorRef.current.setAttribute("style", "opacity: 0");
  };

  useEffect(() => {
    if (cart !== "" && product !== undefined) {
      const productInCart = cart.line_items.filter(
        (item) => item.product_id === product.id
      );
      if (product.inventory.available === 0) {
        setAvailable(false);
      } else if (productInCart.length !== 0) {
        if (productInCart[0].quantity >= product.inventory.available) {
          setAvailable(false);
        } else {
          setAvailable(true);
        }
      } else {
        setAvailable(true);
      }
    }
  }, [cart, product]);

  useEffect(() => {
    products ? fetchOneProduct(id) : fetchProducts();
  }, [products]);

  const [widthScreen, setWidthScreen] = useState(window.innerWidth);

  const handleAddToCart = () => {
    onAddToCart(product.id, 1);
  };

  useEffect(() => {
    const changeWidth = () => {
      setWidthScreen(window.innerWidth);
    };
    window.addEventListener("resize", changeWidth);

    return () => {
      window.removeEventListener("resize", changeWidth);
    };
  }, []);

  const attributes = (idAtt) => {
    const att = product.attributes.filter((att) => att.id === idAtt);

    return `${att[0].name} : ${att[0].value}`;
  };

  return (
    <main className="showproduct">
      <ScrollToTop />
      {product ? (
        <div className="product_info">
          <motion.div
            initial={{ translateX: -300, opacity: 0 }}
            exit={{ translateX: -300, opacity: 0 }}
            animate={{ translateX: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            onMouseLeave={mouseLeave}
            onMouseMove={mousepos}
            className="left"
          >
            {widthScreen > 1199
              ? product.assets
                  .filter((img) => img.image_dimensions.width > 1200)
                  .map((img) => {
                    return <img src={img.url} alt={product.name} />;
                  })
              : widthScreen > 424 && widthScreen < 1200
              ? product.assets
                  .filter(
                    (img) =>
                      img.image_dimensions.width > 750 &&
                      img.image_dimensions.width < 1200
                  )
                  .map((img) => {
                    return <img src={img.url} alt={product.name} />;
                  })
              : product.assets
                  .filter((img) => img.image_dimensions.width < 425)
                  .map((img) => {
                    return <img src={img.url} alt={product.name} />;
                  })}

            <div ref={cursorRef} className="cursor">
              <span>Scroll</span>
            </div>
          </motion.div>
          <motion.div
            initial={{ translateX: 300, opacity: 0 }}
            exit={{ translateX: 300, opacity: 0 }}
            animate={{ translateX: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="right"
          >
            <h2>{product.name}</h2>

            <p>{striptags(product.description)} </p>
            <div className="attributes_product">
              <p>{attributes("attr_RyWOwmdnWlnEa2")}</p>
              <p>{attributes("attr_31q0o3LJ85DdjR")}</p>
              <p>{attributes("attr_BkyN5YV7Rl0b69")} g</p>
              <p>{attributes("attr_8XO3wpWzXlYAzQ")} cm</p>
              <p>{attributes("attr_aZWNoyYPzo80JA")} cm</p>
            </div>
            <p className="price">{product.price.formatted_with_code}</p>
            {available ? (
              <button
                className={!loading ? "checkout" : "checkout none"}
                onClick={() => !loading && handleAddToCart()}
              >
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
            ) : (
              <p>&Eacute;PUIS&Eacute;</p>
            )}

            <button onClick={() => navigate("/products")} className="back">
              <span>Shop</span>
            </button>
          </motion.div>
        </div>
      ) : (
        <Loader />
      )}
    </main>
  );
};

export default ShowProduct;
