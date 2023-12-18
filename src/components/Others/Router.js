import React from 'react';

const Router = () => {
  return (
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
  );
};

export default Router;