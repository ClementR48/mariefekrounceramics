import React from "react";
import Categories from "./Category/Category";
import Product from "./Product/Product";

const Products = ({
  products,
  productsToShow,
  onAddToCart,
  categories,
  changeListProducts,
  cart,
  loading
}) => {
  
  
  return (
    <main>
      {!loading ?
      <>
      {categories.length !== 0 ? (
        categories.map((category) => {
          return (
            <Categories key={category.id} category={category} changeListProducts={changeListProducts}/>
          )
        })
      ) : <p>...Wait</p>}
      <ul>

        {productsToShow.length === 0 ? (
          <p>Wait ...</p>
        ) : (
          productsToShow.map((product) => {
            return (
              <Product
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}

                cart={cart}
              />
            );
          })
        )}
      </ul> </> : <p>wait</p>}
    </main>
  );
};

export default Products;
