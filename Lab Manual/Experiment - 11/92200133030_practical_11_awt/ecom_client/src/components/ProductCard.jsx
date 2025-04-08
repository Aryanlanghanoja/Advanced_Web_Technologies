import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-2xl shadow p-4 hover:shadow-lg transition">
      <table className="w-full">
        <tbody>
          <tr className="border-b">
            <td className="py-2 font-semibold text-gray-600">Name:</td>
            <td className="py-2 text-lg">{product.name}</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 font-semibold text-gray-600">Brand:</td>
            <td className="py-2">{product.brand}</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 font-semibold text-gray-600">Price:</td>
            <td className="py-2 text-blue-600 font-bold">₹ {product.price}</td>
          </tr>
        </tbody>
      </table>
      <Link 
        to={`/product/${product.id}`} 
        className="text-sm text-indigo-500 mt-4 block text-center hover:underline"
      >
        View Details
      </Link>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
  }).isRequired
};

export default ProductCard;