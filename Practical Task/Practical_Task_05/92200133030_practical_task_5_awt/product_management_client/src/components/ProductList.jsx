import React, { useEffect, useState } from "react";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const res = await fetch("http://localhost:3000/api/products");
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="bg-white shadow-md rounded p-4">
      <h2 className="text-xl font-medium mb-4">All Products</h2>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2">Name</th>
            <th className="p-2">Date</th>
            <th className="p-2">Price</th>
            <th className="p-2">Category</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-t">
              <td className="p-2">{product.name}</td>
              <td className="p-2">{new Date(product.date).toLocaleDateString()}</td>
              <td className="p-2">${product.price}</td>
              <td className="p-2">{product.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;