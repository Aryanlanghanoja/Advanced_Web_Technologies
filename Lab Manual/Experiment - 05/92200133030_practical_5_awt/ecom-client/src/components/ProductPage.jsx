import { useEffect, useState } from "react";
import axios from "axios";
import "../css/ProductPage.css"
import productimg from "../assets/product.jpeg"

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [data, setData] = useState({});

  useEffect(() => {
    axios.get("http://localhost:3000/product").then((resp) => {
      setProducts(resp.data.data);
    });
    fetchAllCategory();
  }, []);

  const fetchAllProduct = () => {
    axios.get("http://localhost:3000/product").then((resp) => {
      setProducts(resp.data.data);
    });
  };

  const fetchAllCategory = () => {
    axios.get("http://localhost:3000/category").then((resp) => {
      setCategories(resp.data.data);
    });
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedProductId) {
      axios
        .put(`http://localhost:3000/product/${selectedProductId}`, data)
        .then((resp) => {
          console.log(resp.data);
          setSelectedProductId(null);
          setData({});
          fetchAllProduct();
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .post("http://localhost:3000/product", data)
        .then((resp) => {
          console.log(resp.data);
          setData({});
          fetchAllProduct();
        })
        .catch((err) => console.log(err));
    }

    e.target.reset();
  };


  const handleEdit = (productId) => {
    setSelectedProductId(productId);
    const product = products.find((p) => p.id === productId);
    setData({
      product_name: product.product_name,
      product_description: product.product_description,
      price: product.price,
      categoryId: product.categoryId,
      product_status: product.product_status
    });
  };

  const handleDelete = (productId) => {
    axios
      .delete(`http://localhost:3000/product/del/${productId}`)
      .then((resp) => {
        console.log(resp.data);
        fetchAllProduct();
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <h2>ProductPage</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          className="input-field"
          type="text"
          name="product_name"
          placeholder="Enter Product Name"
          onChange={handleChange}
          value={data.product_name || ""}
        />
        <input
          className="input-field"
          type="text"
          name="product_description"
          placeholder="Enter Product Description"
          onChange={handleChange}
          value={data.product_description || ""}
        />
        <input
          className="input-field"
          type="number"
          name="price"
          placeholder="Enter Product Price"
          onChange={handleChange}
          value={data.price || ""}
        />
        <select className="input-field" name="categoryId" onChange={handleChange} value={data.categoryId || ""}>
          <option className="option-item" value="unselected">Select Category</option>
          {categories.map((category, index) => (
            <option className="option-item" key={index} value={category.id}>
              {category.category_name}
            </option>
          ))}
        </select>
        {selectedProductId ? <select
          className="input-field"
          name="product_status"
          onChange={handleChange}
          value={data.product_status ? "true" : "false" || ""}
        >
          <option className="option-item" value="true">Available</option>
          <option className="option-item" value="false">Not Available</option>
        </select> : <></>}
        {selectedProductId ? (
          <input type="submit" value="Update Product" className="add-product-button" />
        ) : (
          <input type="submit" value="Add Product" className="add-product-button" />
        )}
      </form>
      <br />
      <div className="product-cards">
        {products.map((product, index) => (
          <div className="product-card" key={index}>
            <img src={productimg} alt={"Product Image"} />
            <div className="product-details">
              <h3>{product.product_name}</h3>
              <p>{product.product_description}</p>
              <div className="row">
                <p>{product.category && product.category.category_name}</p>
                <p>{product.product_status ? "Available" : "Not Available"}</p>
              </div>
              <p>Rs.{product.price}</p>
            </div>
            <div className="product-actions">
              <button onClick={() => handleEdit(product.id)}>Edit</button>
              <button onClick={() => handleDelete(product.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductPage;
