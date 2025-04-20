import React from "react";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 font-poppins p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold text-center mb-6">Product Management</h1>
        <ProductForm />
        <ProductList />
      </div>
    </div>
  );
}

export default App;