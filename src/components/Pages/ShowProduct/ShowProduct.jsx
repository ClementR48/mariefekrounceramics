import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "./ShowProduct.scss";
import striptags from "striptags";
import { motion } from "framer-motion";
import ScrollToTop from "../../Others/ScrollToTop";
import Button from "../../Others/Button/Button";

const ShowProduct = ({
  fetchOneProduct,
  product,
  cart,
  products,
  onAddToCart,
  fetchProducts,
  width,
  loading,
}) => {
  const { id } = useParams();
  const [available, setAvailable] = useState(true);
  const [imgToDisplay, setImgToDisplay] = useState([]);

  let navigate = useNavigate();

  let cursorRef = useRef();

  // Récuperation du produit

  useEffect(() => {
    products ? fetchOneProduct(id) : fetchProducts("bigloading");
  }, []);

  //Verification de la quantité

  useEffect(() => {
    if (cart.id !== undefined && product !== undefined) {
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

  //animation au hover

  const mousepos = (e) => {
    cursorRef.current.setAttribute(
      "style",
      `top:${e.clientY - 40}px ; left:${e.clientX - 40}px; opacity:1`
    );
  };

  const mouseLeave = () => {
    cursorRef.current.setAttribute("style", "opacity: 0");
  };

  //Changement Image Responsive

  useEffect(() => {
    if (product) {
      if (width > 1199) {
        setImgToDisplay(
          product.assets.filter((img) => img.image_dimensions.width > 1200)
        );
      } else {
        setImgToDisplay(
          product.assets.filter(
            (img) =>
              img.image_dimensions.width > 750 &&
              img.image_dimensions.width < 1200
          )
        );
      }
    }
  }, [width, product]);

  //Récupération des Attributs des Produits

  const attributes = (idAtt) => {
    const att = product.attributes.filter((att) => att.id === idAtt);
    return `${att[0].name} : ${att[0].value}`;
  };

  const productDiscount = () => {
    const priceWithDiscount =
      product.price.raw - (product.price.raw * 15) / 100;
    return (
      <p className="price_product_discount">{`${priceWithDiscount} EUR`}</p>
    );
  };

  return (
    <main className="showproduct">
      {product && (
        <div className="product_info">
          <motion.div
            initial={{ translateX: -300, opacity: 0 }}
            exit={{ translateX: -300, opacity: 0 }}
            animate={{ translateX: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            onMouseLeave={mouseLeave}
            onMouseMove={mousepos}
            className="left"
          >
            {imgToDisplay.map((img) => {
              return <img key={img.id} src={img.url} alt={product.name} />;
            })}

            <div ref={cursorRef} className="cursor">
              <span>Scroll</span>
            </div>
          </motion.div>
          <motion.div
            initial={{ translateX: 300, opacity: 0 }}
            exit={{ translateX: 300, opacity: 0 }}
            animate={{ translateX: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="right"
          >
            <h2>{product.name}</h2>

            <p className="description_product">
              {striptags(product.description)}{" "}
            </p>
            <div className="attributes_product">
              <p>{attributes("attr_RyWOwmdnWlnEa2")}</p>
              <p>{attributes("attr_31q0o3LJ85DdjR")}</p>
              <p>{attributes("attr_BkyN5YV7Rl0b69")} g</p>
              <p>{attributes("attr_8XO3wpWzXlYAzQ")} cm</p>
              <p>{attributes("attr_aZWNoyYPzo80JA")} cm</p>
            </div>
            <div className="prices">
              <p className="price">{product.price.formatted_with_code}</p>
              {productDiscount()}
            </div>
            {available ? (
              <Button
                text="Panier"
                size="50%"
                color="red"
                fn={onAddToCart}
                productId={product.id}
                loading={loading}
              />
            ) : (
              <p>&Eacute;PUIS&Eacute;</p>
            )}

            <button onClick={() => navigate("/products")} className="back">
              <span>Shop</span>
            </button>
          </motion.div>
        </div>
      )}
    </main>
  );
};

export default ShowProduct;
