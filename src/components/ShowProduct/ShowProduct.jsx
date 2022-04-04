import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const ShowProduct = ({ fetchOneProduct, product }) => {
  const id = useParams();
  useEffect(() => {
    fetchOneProduct(id.id);
  }, []);

  


  return (

    <div>
      {product ? 
    <p>{product.name}</p> : <p>Wait ..</p>
  }
  </div>
)
};

export default ShowProduct;
