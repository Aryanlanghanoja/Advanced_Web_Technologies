import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";

function Home() {
  const [products, setProducts] = useState([]);
  // Display products in table rows
// Remove unused productRows mapping since the products are mapped directly in the table

  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    name: searchParams.get("name") || "",
    brand: searchParams.get("brand") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "" ,
    category: searchParams.get("category") || "" ,
    tags: searchParams.get("tags") || "" ,

  });

  useEffect(() => {
    const queryParams = new URLSearchParams();
    if (filters.name) queryParams.append("name", filters.name);
    if (filters.brand) queryParams.append("brand", filters.brand);
    if (filters.category) queryParams.append("category", filters.category);
    if (filters.minPrice) queryParams.append("minPrice", filters.minPrice);
    if (filters.maxPrice) queryParams.append("maxPrice", filters.maxPrice);
    if (filters.tags) queryParams.append("tags", filters.tags);

    const queryString = queryParams.toString();
    const url = `http://localhost:3000/api/products${queryString ? `?${queryString}` : ''}`;

    axios.get(url)
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));

    setSearchParams(queryParams);
  }, [filters, setSearchParams]);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-10 text-center text-green-600">All Products</h1>
      
      {/* Filter Form */}
      <div className="mb-8 bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-green-600">Filter Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={filters.name}
              onChange={handleFilterChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              placeholder="Filter by name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
            <input
              type="text"
              name="brand"
              value={filters.brand}
              onChange={handleFilterChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              placeholder="Filter by brand"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Min Price</label>
            <input
              type="number"
              name="minPrice"
              value={filters.minPrice}
              onChange={handleFilterChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              placeholder="Min price"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Max Price</label>
            <input
              type="number"
              name="maxPrice"
              value={filters.maxPrice}
              onChange={handleFilterChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              placeholder="Max price"
            />
          </div>
        </div>
      </div>

      {/* Rest of your table code remains the same */}
      <div className="overflow-x-auto rounded-xl shadow-lg">
      <table className="min-w-full text-base border-collapse bg-white">
          <thead className="bg-green-500 text-white">
            <tr>
              <th className="py-4 px-6 text-center font-semibold uppercase tracking-wider">Name</th>
              <th className="py-4 px-6 text-center font-semibold uppercase tracking-wider">Brand</th>
              <th className="py-4 px-6 text-center font-semibold uppercase tracking-wider">Price</th>
              <th className="py-4 px-6 text-center font-semibold uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((product, index) => (
              <tr 
                key={product.id} 
                className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100 transition-colors duration-200`}
              >
                <td className="py-4 px-6 text-center font-medium">{product.name}</td>
                <td className="py-4 px-6 text-center">{product.brand}</td>
                <td className="py-4 px-6 text-center text-green-600 font-semibold">₹ {product.price}</td>
                <td className="py-4 px-6 text-center">
                  <Link
                    to={`/product/${product.id}`}
                    className="inline-block px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 transition-colors duration-200"
                  >
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center text-gray-500 py-10">No products found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;