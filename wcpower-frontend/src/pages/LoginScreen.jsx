import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Mail, Lock, LogIn } from 'lucide-react';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/users/login', { email, password });
      
      // Store user info (including the JWT token) in localStorage
      localStorage.setItem('userInfo', JSON.stringify(data));
      
      alert('Login Successful! 🚀');
      navigate('/'); // Redirect to home
    } catch (error) {
      alert(error.response?.data?.message || 'Invalid Email or Password');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <div className="bg-white p-10 rounded-3xl shadow-xl border border-slate-100 w-full max-w-md">
        <h1 className="text-3xl font-black text-slate-900 mb-2 uppercase">Welcome Back</h1>
        <p className="text-slate-500 mb-8">Login to manage your tech orders.</p>

        <form onSubmit={submitHandler} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
              <Mail size={16} /> Email Address
            </label>
            <input
              type="email"
              placeholder="asim@neuratech.com"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
              <Lock size={16} /> Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-600 transition active:scale-95 shadow-lg shadow-blue-100">
            Sign In <LogIn size={20} />
          </button>
        </form>

        <div className="mt-8 text-center text-slate-600">
          New Customer? <Link to="/register" className="text-blue-600 font-bold hover:underline">Register here</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;