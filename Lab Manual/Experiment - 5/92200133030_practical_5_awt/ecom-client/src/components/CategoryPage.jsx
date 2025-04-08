import { useEffect, useState } from "react";
import axios from "axios";
import "../css/CategoryPage.css"

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [data, setData] = useState({});

  useEffect(() => {
    fetchAllCategory();
  }, []);

  const fetchAllCategory = () => {
    axios.get("http://localhost:3000/category").then((resp) => {
      setCategories(resp.data.data);
    });
  };

  const handleChange = (e) => {
    // console.log(e.target.name, e.target.value);
    // let name = e.target.name;
    // let value = e.target.value;
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleEdit = (id) => {
    console.log(id);
  };

  const handleDelete = (id) => {
    console.log(id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/category", data)
      .then((resp) => {
        console.log(resp);
        fetchAllCategory();
      })
      .catch((err) => console.log(err));
    e.target.reset();
  };

  return (
    <>
      <h2>CategoryPage</h2>
      <form onSubmit={(e) => handleSubmit(e)} className="category-form">
        <input
          type="text"
          name="category_name"
          placeholder="Enter Category Name"
          onChange={handleChange}
          className="input-field"
        />
        <input
          type="text"
          name="category_description"
          placeholder="Enter Category Description"
          onChange={handleChange}
          className="input-field"
        />
        <input type="submit" name="btnSubmit" className="add-category-button" />
      </form>
      <div className="category-cards">
        {categories.map((category, index) => (
          <div className="category-card" key={index}>
            <h3>{category.category_name}</h3>
            <p>{category.category_description}</p>
            <p>{category.category_status ? "Active" : "Inactive"}</p>
            <button onClick={() => handleEdit(category.id)}>Edit</button>
            <button onClick={() => handleDelete(category.id)}>Delete</button>
          </div>
        ))}
      </div>
    </>
  );
};

export default CategoryPage;
