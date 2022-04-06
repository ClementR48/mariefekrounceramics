import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import "./ShowProduct.scss";

const ShowProduct = ({ fetchOneProduct, product, cart,products, onAddToCart,fetchProducts }) => {
  const {id} = useParams();

 
  


  const [available, setAvailable] = useState(true);

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
    const isAvailable = () => {
      const productInCart = cart.line_items.filter(
        (item) => item.product_id === product.id
      );

      if (productInCart.length !== 0) {
        if (productInCart[0].quantity === product.inventory.available) {
          setAvailable(false);
        }
      }
    };

    if (cart.line_items && product) isAvailable();
  }, [cart]);

  useEffect(() => {

    products ? fetchOneProduct(id) : fetchProducts()
    
   
  }, [products])
  console.log(product);

  

  return (
    <div className="showproduct">
      {product? (
        <div className="product_info">
          <div
            onMouseLeave={mouseLeave}
            onMouseMove={mousepos}
            className="images"
          >
            {product.assets.map((img) => (
              <img key={img.id} src={img.url} alt={product.name} />
            ))}
            {product.assets.map((img) => (
              <img key={img.id} src={img.url} alt={product.name} />
            ))}
            <div ref={cursorRef} className="cursor">
              <span>Scroll</span>
            </div>
          </div>
          <div className="info">
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            {product.attributes.map((att) => (
              <div key={att.id}>
                <p>{att.name}: {att.value} </p>
                
              </div>
            ))}
            <p>{product.price.formatted_with_code}</p>
            {available ? (
              <button onClick={() => onAddToCart(product.id, 1)}>
                Ajouter au painier
              </button>
            ) : (
              <p>a plus</p>
            )}
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default ShowProduct;
