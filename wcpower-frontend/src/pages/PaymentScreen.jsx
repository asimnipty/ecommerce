import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CreditCard, Wallet } from 'lucide-react';

const PaymentScreen = () => {
  const { shippingAddress, setPaymentMethod } = useCart();
  const navigate = useNavigate();

  // If they somehow skipped shipping, send them back
  if (!shippingAddress.address) {
    navigate('/shipping');
  }

  const [method, setMethod] = useState('PayPal');

  const submitHandler = (e) => {
    e.preventDefault();
    setPaymentMethod(method);
    navigate('/placeorder');
  };

  return (
    <div className="flex justify-center items-center py-12 px-4">
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-slate-100 w-full max-w-lg">
        <h1 className="text-3xl font-black text-slate-900 mb-2 uppercase flex items-center gap-3">
          <CreditCard className="text-blue-600" /> Payment
        </h1>
        <p className="text-slate-500 mb-8 font-medium">Select your preferred method.</p>

        <form onSubmit={submitHandler} className="space-y-6">
          <div 
            onClick={() => setMethod('PayPal')}
            className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${method === 'PayPal' ? 'border-blue-500 bg-blue-50' : 'border-slate-100 hover:border-slate-200'}`}
          >
            <div className="flex items-center gap-4">
              <Wallet className={method === 'PayPal' ? 'text-blue-600' : 'text-slate-400'} />
              <span className="font-bold text-slate-800 text-lg">PayPal or Credit Card</span>
            </div>
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${method === 'PayPal' ? 'border-blue-500' : 'border-slate-300'}`}>
              {method === 'PayPal' && <div className="w-3 h-3 bg-blue-500 rounded-full" />}
            </div>
          </div>

          <button type="submit" className="w-full mt-6 bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-blue-600 transition shadow-lg active:scale-95">
            Continue to Place Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentScreen;