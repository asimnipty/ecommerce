import { ShoppingCart, User, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
    
  return (
    <header className="bg-slate-900 text-white shadow-xl">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold tracking-tighter">
          <Cpu className="text-blue-500" size={32} />
          WC<span className="text-blue-500">POWER</span>
        </Link>
        <div className="flex gap-8">
          <Link to="/cart" className="flex items-center gap-2 hover:text-blue-400 transition">
            <ShoppingCart size={20} /> <span>Cart</span>
          </Link>
          <Link to="/login" className="flex items-center gap-2 hover:text-blue-400 transition">
            <User size={20} /> <span>Login</span>
          </Link>
        </div>
      </nav>
    </header>
  );
};
export default Header;