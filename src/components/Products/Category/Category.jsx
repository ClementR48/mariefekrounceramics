import React from 'react';

const Category = ({ category, changeListProducts }) => {
  return (
    <li>
      <button onClick={() => changeListProducts(category.id)}>{category.name}</button>
    </li>
  );
};

export default Category;