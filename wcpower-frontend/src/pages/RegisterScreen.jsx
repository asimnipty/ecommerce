import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { User, Mail, Lock, UserPlus } from 'lucide-react';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
    } else {
      try {
        const { data } = await axios.post('/api/users', { name, email, password });
        localStorage.setItem('userInfo', JSON.stringify(data));
        navigate('/');
      } catch (error) {
        alert(error.response?.data?.message || 'Registration failed');
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh] py-10">
      <div className="bg-white p-10 rounded-3xl shadow-xl border border-slate-100 w-full max-w-md">
        <h1 className="text-3xl font-black text-slate-900 mb-2 uppercase">Join WCPOWER</h1>
        <p className="text-slate-500 mb-8">Create an account to start your tech journey.</p>

        <form onSubmit={submitHandler} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
              <User size={16} /> Full Name
            </label>
            <input
              type="text"
              placeholder="Asim Niptu"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
              <Mail size={16} /> Email Address
            </label>
            <input
              type="email"
              placeholder="asim@neuratech.com"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
              <Lock size={16} /> Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
              <Lock size={16} /> Confirm Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 outline-none"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="w-full mt-4 bg-blue-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition active:scale-95 shadow-lg">
            Create Account <UserPlus size={20} />
          </button>
        </form>

        <div className="mt-8 text-center text-slate-600">
          Already a customer? <Link to="/login" className="text-blue-600 font-bold hover:underline">Login here</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;