import { useCart } from '../context/CartContext';
import { Trash2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CartScreen = () => {
  const { cartItems, removeFromCart } = useCart();

  const subtotal = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);

  return (
    <div className="py-8">
      <h1 className="text-3xl font-black mb-10 uppercase tracking-tighter">Shopping Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="bg-blue-50 p-8 rounded-2xl text-center">
          Your cart is empty. <Link to="/" className="text-blue-600 font-bold underline">Go Shopping</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item._id} className="flex items-center gap-4 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-contain bg-slate-50 p-2 rounded-lg" />
                <div className="flex-grow">
                  <h3 className="font-bold text-slate-800">{item.name}</h3>
                  <p className="text-blue-600 font-bold">${item.price}</p>
                </div>
                <div className="font-bold px-4">x{item.qty}</div>
                <button onClick={() => removeFromCart(item._id)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition">
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 h-fit shadow-sm">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <span>Items ({cartItems.reduce((a, c) => a + c.qty, 0)}):</span>
              <span className="font-bold">${subtotal.toFixed(2)}</span>
            </div>
            <div className="border-t mt-4 pt-4 flex justify-between text-xl font-black">
              <span>Total:</span>
              <span className="text-blue-600">${subtotal.toFixed(2)}</span>
            </div>
            <button className="w-full mt-6 bg-slate-900 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-600 transition">
              Proceed to Checkout <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartScreen;