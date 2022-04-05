import "./App.scss";

import { commerce } from "./lib/commerce";
import Navbar from "./components/Navbar/Navbar";
import Products from "./components/Products/Products";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import Cart from "./components/Cart/Cart";
import Checkout from "./components/CheckoutForm/Checkout/Checkout";
import ShowProduct from "./components/ShowProduct/ShowProduct";
import Footer from "./components/Footer/Footer";

function App() {
  const [products, setProducts] = useState([]);
  const [productsToShow, setProductsToShow] = useState([]);
  const [product, setProduct] = useState();
  const [cart, setCart] = useState({});
  const [categories, setCategories] = useState([]);
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

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

  const fetchOneProduct = (idProduct) => {
    /* setProduct();
    const product = await commerce.products.retrieve(idProduct);
    setProduct(product); */

    const filteredProduct = products.filter(
      (product) => product.id === idProduct
    );

    setProduct(filteredProduct[0]);
  };

  const fetchCart = async () => {
    const cart = await commerce.cart.retrieve();
    setCart(cart);
  };

  const fetchCategories = async () => {
    const { data } = await commerce.categories.list();

    setCategories(data);
  };

  const handleAddToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);
    setCart(item.cart);
  };

  const handleUpdateCartQty = async (productId, quantity) => {
    const item = await commerce.cart.update(productId, { quantity });

    setCart(item.cart);
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

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const inComingOrder = await commerce.checkout.capture(
        checkoutTokenId,
        newOrder
      );

      setOrder(inComingOrder);
      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
    fetchCategories();
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Navbar totalItems={cart.total_items} />
        <Routes>
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
              />
            }
          />

          <Route
            exact="true"
            path="/checkout"
            element={
              <Checkout
                cart={cart}
                order={order}
                error={errorMessage}
                handleCaptureCheckout={handleCaptureCheckout}
              />
            }
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
