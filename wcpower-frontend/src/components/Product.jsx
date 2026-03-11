import { Link } from 'react-router-dom';

const Product = ({ product }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-xl transition-all group">
      <div className="overflow-hidden rounded-lg mb-4">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-48 object-contain group-hover:scale-110 transition duration-300" 
        />
      </div>
      <h3 className="font-bold text-lg text-slate-800 truncate">{product.name}</h3>
      <p className="text-2xl font-black text-blue-600 mt-2">${product.price}</p>
      <Link to={`/product/${product._id}`}>
        <button className="w-full mt-4 bg-slate-900 text-white py-3 rounded-lg font-bold hover:bg-blue-600 transition">
          View Details
        </button>
      </Link>
    </div>
  );
};

export default Product;