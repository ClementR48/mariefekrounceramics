//Style
import "./App.scss";

// Components
import Checkout from "./components/Checkout/Checkout";
import Navbar from "./components/Navbar/Navbar";
import Products from "./components/Products/Products";
import Home from "./components/Home/Home";
import AboutContact from "./components/AboutContact/AboutContact";
import Cart from "./components/Cart/Cart";
import ShowProduct from "./components/ShowProduct/ShowProduct";
import Footer from "./components/Footer/Footer";
import Menuresponsive from "./components/MenuResponsive/Menuresponsive";
import Overlay from "./components/Overlay/Overlay";
import Condition from "./components/Condition/Condition";
import Loader from "./components/Loader/Loader";
import Reseller from "./components/Reseller/Reseller";
import Parutions from "./components/Parutions/Parutions";
import Thanks from "./components/Thanks/Thanks";

//Library
import { commerce } from "./lib/commerce";
import { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

function App() {
  const [products, setProducts] = useState([]);
  const [productsToShow, setProductsToShow] = useState([]);
  const [product, setProduct] = useState();
  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [openMenu, setOpenMenu] = useState(false);
  const [openCheckout, setOpenCheckout] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [weight, setWeight] = useState(0);
  const [loading, setLoading] = useState(false);
  const [bigLoading, setBigLoading] = useState(false);
  const [thanks, setThanks] = useState(false);
  const [errorMessagePayment, setErrorMessagePayment] = useState(false)

  let navigate = useNavigate();

  //============================ Open modals ============================

  const openMenuFunc = (value = "") => {
    if (value !== "") {
      setOpenMenu(value);
    } else {
      setOpenMenu((prevState) => !prevState);
    }
  };

  const openCheckoutFunc = (value = "") => {
    if (value !== "") {
      setOpenCheckout(value);
    } else {
      setOpenCheckout((prevState) => !prevState);
    }
  };

  //============================ Products ============================

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();

    setProducts(data);
    setProductsToShow(data);
  };

  const changeListProducts = (idCategory) => {
    if (products) {
      const filteredProducts = products.filter(
        (product) => product.categories[0].id === idCategory
      );

      setProductsToShow(filteredProducts);
    }
  };

  const fetchOneProduct = (permalink) => {
    const filteredProduct = products.filter(
      (product) => product.permalink === permalink
    );

    setProduct(filteredProduct[0]);
  };

  //Categories

  const fetchCategories = async () => {
    const { data } = await commerce.categories.list();

    setCategories(data);
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
      .then((item) => setCart(item.cart))
      .then(() => setLoading(false));
  };

  const handleUpdateCartQty = (productId, quantity) => {
    setLoading(true);
    commerce.cart
      .update(productId, { quantity })
      .then((item) => setCart(item.cart))
      .then(() => setLoading(false));
  };

  const handleRemoveFromCart = (productId) => {
    setLoading(true);
    commerce.cart
      .remove(productId)
      .then((item) => setCart(item.cart))
      .then(() => setLoading(false));
  };

  const handleEmptyCart = () => {
    setLoading(true);
    commerce.cart
      .empty()
      .then((item) => setCart(item.cart))
      .then(() => setLoading(false));
  };

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();

    setCart(newCart);
  };

  //Calculate the weight

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
      setWeight(gramme.reduce(reducer));
    }
  };

  // ============================ Checkout ============================

  const handleCaptureCheckout = (checkoutTokenId, newOrder) => {
    setBigLoading(true);
    try {
      commerce.checkout
        .capture(checkoutTokenId, newOrder)
        .then((item) => setOrder(item))
        .then(() => setBigLoading(false))
        .then(() => {
          refreshCart();
          fetchProducts();
          setThanks(true);
          navigate("/");
        })
        .catch((error) => {
          setThanks(true)
          setBigLoading(false);
          setErrorMessagePayment(error);
        });
    } catch (error) {
      
      setBigLoading(false);
      setErrorMessage(error.data.error.message);
    }
  };

  //useEffect for the weight

  useEffect(() => {
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
      {bigLoading && <Loader />}
      {(thanks || errorMessagePayment) && <Thanks setThanks={setThanks} error={errorMessagePayment} setError = {setErrorMessagePayment} />}
      <Checkout
        cart={cart}
        order={order}
        error={errorMessage}
        handleCaptureCheckout={handleCaptureCheckout}
        openCheckout={openCheckout}
        openCheckoutFunc={openCheckoutFunc}
        weight={weight}
        setThanks={setThanks}
      />
      <AnimatePresence exitBeforeEnter>
        <Routes location={location} key={location.pathname}>
          <Route exact="true" path="/" element={<Home />} />
          <Route exact="true" path="/about" element={<AboutContact />} />
          <Route exact="true" path="/conditions" element={<Condition />} />
          <Route exact="true" path="/reseller" element={<Reseller />} />
          <Route exact="true" path="/parutions" element={<Parutions />} />
          <Route
            exact="true"
            path="/products/:id"
            element={
              <ShowProduct
                fetchOneProduct={fetchOneProduct}
                product={product}
                setProduct={setProduct}
                cart={cart}
                onAddToCart={handleAddToCart}
                products={products}
                fetchProducts={fetchProducts}
                loading={loading}
              />
            }
          />
          <Route
            exact="true"
            path="/products"
            element={
              <Products
                products={products}
                productsToShow={productsToShow}
                onAddToCart={handleAddToCart}
                cart={cart}
                categories={categories}
                changeListProducts={changeListProducts}
                loading={loading}
                setProductsToShow={setProductsToShow}
              />
            }
          />
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
                weightProductsInCart={weightProductsInCart}
                loading={loading}
              />
            }
          />
        </Routes>
      </AnimatePresence>
      <Footer />
    </motion.div>
  );
}

export default App;
