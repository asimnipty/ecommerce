import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomeScreen from './pages/HomeScreen';
import LoginScreen from './pages/LoginScreen';
import ProductScreen from './pages/ProductScreen';
import CartScreen from './pages/CartScreen';

function App() {
  return (
    <Router>
      <Header />
      <main className="min-h-screen bg-slate-50">
        <div className="container mx-auto px-6 py-4">
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/product/:id" element={<ProductScreen />} />
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/login" element={<LoginScreen />} />
          </Routes>
        </div>
      </main>
    </Router>
  );
}

export default App;