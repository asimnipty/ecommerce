import { useParams } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const OrderScreen = () => {
  const { id } = useParams();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="bg-green-100 p-6 rounded-full mb-6">
        <CheckCircle size={64} className="text-green-600" />
      </div>
      <h1 className="text-4xl font-black text-slate-900 mb-2 uppercase">Order Successful!</h1>
      <p className="text-slate-500 text-lg mb-8 font-medium">
        Thank you for your purchase. Your order ID is:
      </p>
      <div className="bg-slate-100 px-6 py-3 rounded-xl font-mono text-blue-600 font-bold border border-slate-200">
        {id}
      </div>
      <button 
        onClick={() => window.location.href = '/'} 
        className="mt-10 bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-600 transition shadow-lg"
      >
        Return to Shop
      </button>
    </div>
  );
};

export default OrderScreen;