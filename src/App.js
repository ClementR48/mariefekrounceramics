//Style
import "./App.scss";

// Components
import Checkout from "./components/Checkout/Checkout";
import Navbar from "./components/Navbar/Navbar";
import Products from "./components/Products/Products";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import Cart from "./components/Cart/Cart";
import ShowProduct from "./components/ShowProduct/ShowProduct";
import Footer from "./components/Footer/Footer";
import Menuresponsive from "./components/MenuResponsive/Menuresponsive";
import Overlay from "./components/Overlay/Overlay";
import ScrollToTop from "./components/ScrollToTop.jsx";

//Library
import { commerce } from "./lib/commerce";
import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

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

  const handleRemoveFromCart = async (productId) => {
    const item = await commerce.cart.remove(productId);

    setCart(item.cart);
  };

  const handleEmptyCart = async () => {
    const item = await commerce.cart.empty();

    setCart(item.cart);
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

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const inComingOrder = await commerce.checkout.capture(
        checkoutTokenId,
        newOrder
      );

      setOrder(inComingOrder);
      refreshCart();
    } catch (error) {
      console.log(error);
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
    <div className={openCheckout ? "app checkout_active" : "app"}>
      {/* <ScrollToTop /> */}
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
        />
      )}
      <Menuresponsive
        openMenuFunc={openMenuFunc}
        openMenu={openMenu}
        totalItems={cart.total_items}
      />
      <Checkout
        cart={cart}
        order={order}
        error={errorMessage}
        handleCaptureCheckout={handleCaptureCheckout}
        openCheckout={openCheckout}
        openCheckoutFunc={openCheckoutFunc}
        weight={weight}
      />
      <AnimatePresence exitBeforeEnter>
        <Routes location={location} key={location.pathname}>
          <Route exact="true" path="/" element={<Home />} />
          <Route exact="true" path="/about" element={<About />} />
          <Route exact="true" path="/contact" element={<Contact />} />
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
              />
            }
          />
        </Routes>
      </AnimatePresence>
      <Footer />
    </div>
  );
}

export default App;
