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

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();

    setProducts(data);
  };

  const fetchCart = async () => {
    const cart = await commerce.cart.retrieve();
    setCart(cart);
  };

  const handleAddToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);
    setCart(item.cart)
  }

  const handleUpdateCartQty = async (productId, quantity) => {
    const item = await commerce.cart.update(productId, {quantity});

    setCart(item.cart)
  }

  const handleRemoveFromCart = async (productId ) => {
    const item = await commerce.cart.remove(productId);

    setCart(item.cart)
  }

  const handleEmptyCart = async () => {
    const item = await commerce.cart.empty();

    setCart(item.cart)
  }

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);



  return (
    <div>
      <BrowserRouter>
      <Navbar totalItems={cart.total_items} />
        <Routes>
          <Route exact='true' path="/" element={<Home />} />
          <Route exact='true' path="/about" element={<About />} />
          <Route exact='true' path="/contact" element={<Contact />} />
          <Route exact='true' path="/products" element={<Products
          products={products}
          onAddToCart={handleAddToCart} 
          />} />

          <Route exact='true' path="/cart" element={<Cart 
          cart={cart} 
          handleUpdateCartQty={handleUpdateCartQty}
          handleRemoveFromCart={handleRemoveFromCart}
          handleEmptyCart={handleEmptyCart}
          />} />

          <Route exact='true' path="/checkout" element={<Checkout cart={cart} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
