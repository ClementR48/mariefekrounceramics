import React from "react";
import "./Category.scss";

const Category = ({ category }) => {

  const img = category.assets.filter(img => img.image_dimensions.width < 200)[0]
  
  

  return (
    <>
      <span >{category.name}</span>
      <img src={img.url} alt={category.name} />
    </>
  );
};

export default Category;
