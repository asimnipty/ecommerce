import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Package, Truck, CreditCard, Receipt } from 'lucide-react';
import axios from 'axios';

const placeOrderHandler = async () => {
  try {
    // Get the user token from local storage
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      '/api/orders',
      {
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      },
      config
    );

    // If successful, navigate to the specific order page
    navigate(`/order/${data._id}`);
    
    // Optional: Clear cart after successful order
    localStorage.removeItem('cart');
  } catch (error) {
    alert(error.response?.data?.message || 'Order failed to process');
  }
};

const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const { cartItems, shippingAddress, paymentMethod } = useCart();

  // Redirect if data is missing
  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    } else if (!paymentMethod) {
      navigate('/payment');
    }
  }, [shippingAddress, paymentMethod, navigate]);

  // Calculations
  const addDecimals = (num) => (Math.round(num * 100) / 100).toFixed(2);
  
  const itemsPrice = addDecimals(cartItems.reduce((acc, item) => acc + item.price * item.qty, 0));
  const shippingPrice = addDecimals(itemsPrice > 500 ? 0 : 25); // Free shipping over $500
  const taxPrice = addDecimals(Number((0.15 * itemsPrice).toFixed(2))); // 15% Tax
  const totalPrice = addDecimals(Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice));

  const placeOrderHandler = () => {
    console.log('Order Data:', {
      orderItems: cartItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    });
    alert('Order logic will be connected to the backend next! 🚀');
  };

  return (
    <div className="py-8">
      <h1 className="text-3xl font-black mb-10 uppercase tracking-tighter">Review Order</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Side: Summary Details */}
        <div className="lg:col-span-2 space-y-8">
          {/* Shipping Info */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
              <Truck size={20} className="text-blue-600" /> Shipping Details
            </h2>
            <p className="text-slate-600">
              {shippingAddress.address}, {shippingAddress.city} {shippingAddress.postalCode}, {shippingAddress.country}
            </p>
          </div>

          {/* Payment Info */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
              <CreditCard size={20} className="text-blue-600" /> Payment Method
            </h2>
            <p className="text-slate-600">{paymentMethod}</p>
          </div>

          {/* Order Items */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
              <Package size={20} className="text-blue-600" /> Order Items
            </h2>
            {cartItems.length === 0 ? <p>Your cart is empty</p> : (
              <div className="divide-y divide-slate-100">
                {cartItems.map((item, index) => (
                  <div key={index} className="py-4 flex items-center gap-4">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-contain bg-slate-50 p-2 rounded-lg" />
                    <Link to={`/product/${item._id}`} className="flex-grow font-bold hover:text-blue-600">{item.name}</Link>
                    <div className="font-medium text-slate-500">{item.qty} x ${item.price} = <span className="text-slate-900 font-bold">${(item.qty * item.price).toFixed(2)}</span></div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Price Breakdown */}
        <div className="bg-slate-900 text-white p-8 rounded-3xl h-fit shadow-2xl">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Receipt size={24} /> Total Summary
          </h2>
          <div className="space-y-4 text-slate-300">
            <div className="flex justify-between"><span>Items:</span><span className="text-white">${itemsPrice}</span></div>
            <div className="flex justify-between"><span>Shipping:</span><span className="text-white">${shippingPrice}</span></div>
            <div className="flex justify-between"><span>Tax:</span><span className="text-white">${taxPrice}</span></div>
            <div className="border-t border-slate-700 mt-4 pt-4 flex justify-between text-2xl font-black text-white">
              <span>Total:</span><span>${totalPrice}</span>
            </div>
          </div>
          <button 
            onClick={placeOrderHandler}
            disabled={cartItems.length === 0}
            className="w-full mt-8 bg-blue-600 py-4 rounded-xl font-bold hover:bg-blue-500 transition-all active:scale-95 disabled:opacity-50"
          >
            Place Final Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderScreen;