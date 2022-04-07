import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import "./ShowProduct.scss";
import striptags from "striptags";

const ShowProduct = ({
  fetchOneProduct,
  product,
  cart,
  products,
  onAddToCart,
  fetchProducts,
  loading
}) => {
  const { id } = useParams();
  const [available, setAvailable] = useState(true);
  const [buttonAddProduct, setButtonAddProduct] = useState('Panier');

  const textButtonLetters = buttonAddProduct.split("");

  useEffect(() => {
    
    loading ? setButtonAddProduct('Wait'):setButtonAddProduct('Panier')
  }, [loading])

  let navigate = useNavigate()

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
    products ? fetchOneProduct(id) : fetchProducts();
  }, [products]);




  return (
    <div className="showproduct">
      {product ? (
        <div className="product_info">
          <div
            onMouseLeave={mouseLeave}
            onMouseMove={mousepos}
            className="left"
          >
            {product.assets.map((img) => (
              <img key={img.id} src={img.url} alt={product.name} />
            ))}

            <div ref={cursorRef} className="cursor">
              <span>Scroll</span>
            </div>
          </div>
          <div className="right">
            <h2>{product.name}</h2>
            
              <p>{striptags(product.description)} </p>
              <div className="attributes_product">
                {product.attributes.map((att) => (
                  <p key={att.id}>
                    {att.name}: {att.value}{" "}
                  </p>
                ))}
              </div>
              <p className="price">{product.price.formatted_with_code}</p>
              {available ? (
                /* <button >
                  Ajouter au painier
                </button> */
                <button className={!loading ? "checkout" : 'checkout none' } onClick={() => !loading && onAddToCart(product.id, 1) } >
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

              <button onClick={() => navigate('/products')} className="back"><span>Shop</span></button>
            </div>
          
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default ShowProduct;
