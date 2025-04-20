import React, { useState } from "react";

const ProductForm = () => {
  const [form, setForm] = useState({ name: "", date: "", price: "", category: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:3000/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm({ name: "", date: "", price: "", category: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-4 mb-6">
      <h2 className="text-xl font-medium mb-4">Add New Product</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="name" value={form.name} onChange={handleChange} required placeholder="Product Name" className="border p-2 rounded" />
        <input name="date" value={form.date} onChange={handleChange} required type="date" className="border p-2 rounded" />
        <input name="price" value={form.price} onChange={handleChange} required placeholder="Price" type="number" className="border p-2 rounded" />
        <input name="category" value={form.category} onChange={handleChange} required placeholder="Category" className="border p-2 rounded" />
      </div>
      <button type="submit" className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">Add Product</button>
    </form>
  );
};

export default ProductForm;