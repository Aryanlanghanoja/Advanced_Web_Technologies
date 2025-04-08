import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!product) return <div className="p-6 text-center text-lg">Loading...</div>;

  return (
    <div className="p-6 bg-gradient-to-br from-gray-100 to-white min-h-screen">
      <h1 className="text-4xl font-extrabold mb-10 text-center text-indigo-700">📦 Product Details</h1>
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
        <table className="w-full table-auto">
          <tbody>
            <tr className="hover:bg-gray-50 transition">
              <td className="px-6 py-5 font-bold text-gray-700 w-1/3 bg-gray-100">📝 Product Name</td>
              <td className="px-6 py-5 text-gray-800">{product.name}</td>
            </tr>
            <tr className="hover:bg-gray-50 transition">
              <td className="px-6 py-5 font-bold text-gray-700 bg-gray-100">🏷️ Brand</td>
              <td className="px-6 py-5 text-gray-800">{product.brand}</td>
            </tr>
            <tr className="hover:bg-gray-50 transition">
              <td className="px-6 py-5 font-bold text-gray-700 bg-gray-100">💰 Price</td>
              <td className="px-6 py-5 text-green-600 font-semibold text-lg">₹ {product.price}</td>
            </tr>
            <tr className="hover:bg-gray-50 transition">
              <td className="px-6 py-5 font-bold text-gray-700 bg-gray-100">🧾 Description</td>
              <td className="px-6 py-5 text-gray-800">{product.description}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductDetails;
