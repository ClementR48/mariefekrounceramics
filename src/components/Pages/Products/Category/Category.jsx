import React from "react";
import "./Category.scss";

const Category = ({ category, selectedCateg, onClick }) => {
  const img = category.assets.filter(
    (img) => img.image_dimensions.width < 400
  )[0];

  return (
    <li
      onClick={() => onClick(category.id)}
      className={
        category.id === selectedCateg ? "category selected" : "category"
      }
    >
      <span>{category.name}</span>
      <img src={img.url} alt={category.name} />
    </li>
  );
};

export default Category;
