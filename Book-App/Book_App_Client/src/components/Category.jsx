import React from "react";
import Book from "./Book";

const Category = ({ cat_details }) => {
  return (
    <div>
      <h2>{cat_details.cat_name}</h2>
      <div>
        {cat_details.items.map((book) => (
          <Book details={book} />
        ))}
      </div>
    </div>
  );
};

export default Category;
