import React from "react";
import "./Category.scss";

const Category = ({ category, changeListProducts, index, setActiveCateg }) => {
  const handleClickCateg = () => {
    setActiveCateg(index);
    changeListProducts(category.id);
  };

 

  return (
    <>
      <span >{category.name}</span>
      <img src={category.assets[0].url} alt={category.name} />
    </>
  );
};

export default Category;
