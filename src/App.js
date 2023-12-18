//Style
import "./App.scss";

// Components
import Checkout from "./components/Pages/Checkout/Checkout";
import Navbar from "./components/Others/Navbar/Navbar";
import Products from "./components/Pages/Products/Products";
import Home from "./components/Pages/Home/Home";
import AboutContact from "./components/Pages/AboutContact/AboutContact";
import Cart from "./components/Pages/Cart/Cart";
import ShowProduct from "./components/Pages/ShowProduct/ShowProduct";
import Footer from "./components/Others/Footer/Footer";
import Menuresponsive from "./components/Others/MenuResponsive/Menuresponsive";
import Overlay from "./components/Others/Overlay/Overlay";
import Condition from "./components/Pages/Condition/Condition";
import Loader from "./components/Others/Loader/Loader";
import Reseller from "./components/Pages/Reseller/Reseller";
import Parutions from "./components/Pages/Parutions/Parutions";
import Thanks from "./components/Others/Thanks/Thanks";

import ScrollToTop from "./components/Others/ScrollToTop";

//Library
import { commerce } from "./lib/commerce";
import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import BackOffice from "./components/Pages/BackOffice/BackOffice";
import PrivateRoute from "./components/Others/PrivateRoute";
import Login from "./components/Others/Login/Login";
import NotFound from "./components/Pages/NotFound/NotFound";

function App() {
  const [products, setProducts] = useState([]);
  const [productsToShow, setProductsToShow] = useState([]);
  const [product, setProduct] = useState();
  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [openMenu, setOpenMenu] = useState(false);
  const [openCheckout, setOpenCheckout] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [weight, setWeight] = useState(0);
  const [loading, setLoading] = useState(false);
  const [bigLoading, setBigLoading] = useState(false);
  const [thanks, setThanks] = useState({
    isValid: false,
    error: false,
    delivery: "false",
  });

  let navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/texts");
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Erreur lors de la récupération des données : ", error);
      }
    };

    fetchData();
  }, []);

  //============================ Open modals ============================

  const openMenuFunc = (value = "") => {
    value !== "" ? setOpenMenu(value) : setOpenMenu((prevState) => !prevState);
  };

  const openCheckoutFunc = (value = "") => {
    value !== ""
      ? setOpenCheckout(value)
      : setOpenCheckout((prevState) => !prevState);
  };

  //============================ Products ============================

  const fetchProducts = (bigloading = "") => {
    bigloading === "" ? setLoading(true) : setBigLoading(true);

    commerce.products
      .list()
      .then((products) => {
        if (products && products.data) {
          setProducts(products.data);
          setProductsToShow(products.data);
        } else {
          console.error(
            "Products data is undefined or missing 'list' property."
          );
        }

        bigloading === "" ? setLoading(false) : setBigLoading(false);
      })
      .catch((error) => {
        setTimeout(() => {
          bigloading === "" ? setLoading(false) : setBigLoading(false);
        }, 1000);
        navigate("/");
      });
  };

  const fetchOneProduct = (permalink) => {
    setBigLoading(true);
    commerce.products
      .retrieve(permalink, { type: "permalink" })
      .then((product) => {
        setBigLoading(false);
        setProduct(product);
      })
      .catch((error) => {
        setTimeout(() => {
          setBigLoading(false);
        }, 1000);

        navigate("/");
      });
  };

  const changeListProducts = (idCategory) => {
    if (products) {
      const filteredProducts = products.filter(
        (product) => product.categories[0].id === idCategory
      );

      setProductsToShow(filteredProducts);
    }
  };

  //Categories

  const fetchCategories = () => {
    setBigLoading(true);
    commerce.categories
      .list()
      .then((categ) => {
        setCategories(categ.data);
        setBigLoading(false);
      })
      .catch((error) => {
        setTimeout(() => {
          setBigLoading(false);
        }, 1000);
      });
  };

  //============================ Cart ============================

  const fetchCart = async () => {
    const cart = await commerce.cart.retrieve();
    setCart(cart);
  };

  const handleAddToCart = (productId, quantity) => {
    setLoading(true);
    commerce.cart
      .add(productId, quantity)
      .then((item) => {
        setCart(item.cart);
        setLoading(false);
      })
      .catch((error) => {
        setTimeout(() => {
          setLoading(false);
        }, 1000);

        navigate("/");
      });
  };

  const handleUpdateCartQty = (productId, quantity) => {
    setLoading(true);
    commerce.cart.update(productId, { quantity }).then((item) => {
      setCart(item.cart);
      setLoading(false);
    });
  };

  const handleRemoveFromCart = (productId) => {
    setLoading(true);
    commerce.cart
      .remove(productId)
      .then((item) => setCart(item.cart))
      .then(() => setLoading(false))
      .catch((error) => {
        setTimeout(() => {
          setLoading(false);
        }, 1000);

        navigate("/");
      });
  };

  const handleEmptyCart = () => {
    setLoading(true);
    commerce.cart
      .empty()
      .then((item) => setCart(item.cart))
      .then(() => setLoading(false))
      .catch((error) => {
        setTimeout(() => {
          setLoading(false);
        }, 1000);

        navigate("/");
      });
  };

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();

    setCart(newCart);
  };

  // ============================ Checkout ============================

  const handleCaptureCheckout = (checkoutTokenId, newOrder, delivery) => {
    setBigLoading(true);
    try {
      commerce.checkout
        .capture(checkoutTokenId, newOrder)
        .then((item) => {
          setOrder(item);
          setBigLoading(false);
          refreshCart();
          fetchProducts();
          setThanks({ isValid: true, error: false, delivery: delivery });
          navigate("/");
        })
        .catch((error) => {
          setThanks({ isValid: true, error: true, delivery: delivery });
          setBigLoading(false);
        });
    } catch (error) {
      setBigLoading(false);
    }
  };

  //useEffect for the weight

  useEffect(() => {
    const weightProductsInCart = () => {
      if (cart.line_items !== undefined) {
        let productInCartInfo = [];
        let gramme = [0];

        for (let index = 0; index < cart.line_items.length; index++) {
          for (let j = 0; j < products.length; j++) {
            if (products[j].id === cart.line_items[index].product_id) {
              productInCartInfo.push({
                id: products[j].id,
                qty: cart.line_items[index].quantity,
                weight: products[j].attributes.filter(
                  (att) => att.name === "Poids"
                )[0].value,
              });
            }
          }
        }

        for (let index = 0; index < productInCartInfo.length; index++) {
          gramme.push(
            productInCartInfo[index].qty *
              parseInt(productInCartInfo[index].weight)
          );
        }

        const reducer = (accumulator, curr) => accumulator + curr;

        setWeight(gramme.reduce(reducer) * 1.8);
      }
    };
    weightProductsInCart();
  }, [cart, products]);

  useEffect(() => {
    fetchProducts();
    fetchCart();
    fetchCategories();
  }, []);

  //useEffect Responsive

  useEffect(() => {
    const changeWidth = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", changeWidth);

    if (width > 767) setOpenMenu(false);

    return () => {
      window.removeEventListener("resize", changeWidth);
    };
  }, [width]);

  const location = useLocation();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 0.5, duration: 2 }}
      className={openCheckout ? "app checkout_active" : "app"}
    >
      <ScrollToTop location={location} />
      {(openMenu || openCheckout) && (
        <Overlay
          openMenuFunc={openMenuFunc}
          openCheckoutFunc={openCheckoutFunc}
        />
      )}
      {!openCheckout && (
        <Navbar
          totalItems={cart.total_items}
          openMenu={openMenu}
          openMenuFunc={openMenuFunc}
          width={width}
        />
      )}
      <Menuresponsive
        openMenuFunc={openMenuFunc}
        openMenu={openMenu}
        totalItems={cart.total_items}
      />
      {bigLoading && <Loader bigLoading={bigLoading} />}
      {thanks.isValid && <Thanks thanks={thanks} setThanks={setThanks} />}
      <Checkout
        cart={cart}
        order={order}
        handleCaptureCheckout={handleCaptureCheckout}
        openCheckout={openCheckout}
        openCheckoutFunc={openCheckoutFunc}
        weight={weight}
        setThanks={setThanks}
      />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route exact="true" path="/" element={<Home />} />
          <Route exact="true" path="/about" element={<AboutContact />} />
          <Route exact="true" path="/conditions" element={<Condition />} />
          <Route exact="true" path="/reseller" element={<Reseller />} />
          <Route exact="true" path="/parutions" element={<Parutions />} />
          <Route exact="true" path="/login" element={<Login />} />
          <Route
            exact="true"
            path="/admin"
            element={
              <PrivateRoute>
                <BackOffice />
              </PrivateRoute>
            }
          />
          <Route
            exact="true"
            path="/products/:id"
            element={
              <ShowProduct
                fetchProducts={fetchProducts}
                products={products}
                cart={cart}
                fetchOneProduct={fetchOneProduct}
                product={product}
                setProduct={setProduct}
                onAddToCart={handleAddToCart}
                loading={loading}
                width={width}
              />
            }
          />
          {
            <Route
              exact="true"
              path="/products"
              element={
                <Products
                  products={products}
                  categories={categories}
                  productsToShow={productsToShow}
                  setProductsToShow={setProductsToShow}
                  changeListProducts={changeListProducts}
                  cart={cart}
                  loading={loading}
                />
              }
            />
          }
          <Route
            exact="true"
            path="/cart"
            element={
              <Cart
                cart={cart}
                handleUpdateCartQty={handleUpdateCartQty}
                handleRemoveFromCart={handleRemoveFromCart}
                handleEmptyCart={handleEmptyCart}
                products={products}
                categories={categories}
                openCheckoutFunc={openCheckoutFunc}
                loading={loading}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </motion.div>
  );
}

export default App;
