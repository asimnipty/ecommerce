import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ChevronLeft, ShoppingCart, ShieldCheck, Truck } from 'lucide-react';

const ProductScreen = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
  const fetchProduct = async () => {
    try {
      const { data } = await axios.get(`/api/products/${id}`);
      setProduct(data);
    } catch (error) {
      console.error("Fetch error:", error);
      setProduct("ERROR"); // Set a flag to show an error message instead of loading
    }
  };
  fetchProduct();
}, [id]);

if (product === "ERROR") return <div className="p-10 text-center text-red-500">Product not found in our system.</div>;
if (!product) return <div className="p-10 text-center font-bold">Loading Product...</div>;
  return (
    <div className="py-6">
      <Link to="/" className="flex items-center gap-2 text-slate-600 hover:text-blue-600 mb-8 transition">
        <ChevronLeft size={20} /> Back to Products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
        {/* Product Image */}
        <div className="bg-slate-50 rounded-2xl p-10 flex items-center justify-center">
          <img src={product.image} alt={product.name} className="max-h-[400px] object-contain" />
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <h1 className="text-4xl font-black text-slate-900 mb-4">{product.name}</h1>
          <p className="text-3xl font-bold text-blue-600 mb-6">${product.price}</p>
          
          <div className="border-t border-b border-slate-100 py-6 mb-6">
            <h3 className="font-bold text-slate-800 mb-2">Description</h3>
            <p className="text-slate-600 leading-relaxed">{product.description}</p>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-3 text-sm text-slate-500">
              <Truck size={18} className="text-blue-500" /> Free Shipping on orders over $500
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-500">
              <ShieldCheck size={18} className="text-blue-500" /> 2-Year Manufacturer Warranty
            </div>
          </div>

          <button className="flex items-center justify-center gap-3 bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-blue-600 transition-all active:scale-95">
            <ShoppingCart size={20} /> Add to Shopping Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductScreen;