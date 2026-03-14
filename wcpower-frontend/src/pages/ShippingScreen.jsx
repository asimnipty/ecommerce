import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Truck, MapPin, Globe, Building } from 'lucide-react';

const ShippingScreen = () => {
  const { shippingAddress, saveShippingAddress } = useCart();
  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
  const [country, setCountry] = useState(shippingAddress.country || '');

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    saveShippingAddress({ address, city, postalCode, country });
    navigate('/payment');
  };

  return (
    <div className="flex justify-center items-center py-12 px-4">
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-slate-100 w-full max-w-lg">
        <h1 className="text-3xl font-black text-slate-900 mb-2 uppercase flex items-center gap-3">
          <Truck className="text-blue-600" /> Shipping
        </h1>
        <p className="text-slate-500 mb-8 font-medium">Where should we send your tech?</p>

        <form onSubmit={submitHandler} className="space-y-5">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2 tracking-wider">
              <MapPin size={14} /> Address
            </label>
            <input
              type="text"
              placeholder="123 NeuraTech Lane"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 outline-none transition-all"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                 City
              </label>
              <input
                type="text"
                placeholder="Dhaka"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 outline-none"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Postal Code</label>
              <input
                type="text"
                placeholder="1200"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 outline-none"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
              <Globe size={14} /> Country
            </label>
            <input
              type="text"
              placeholder="Bangladesh"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 outline-none"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="w-full mt-6 bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-blue-600 transition shadow-lg active:scale-95">
            Continue to Payment
          </button>
        </form>
      </div>
    </div>
  );
};

export default ShippingScreen;