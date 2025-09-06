import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">E</span>
            </div>
            <span className="text-2xl font-bold text-green-800">E-Sabi Market</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-green-600 transition-colors">Home</Link>
            {user && (
              <>
                <Link to="/products" className="text-gray-700 hover:text-green-600 transition-colors">Products</Link>
                <Link to="/cart" className="text-gray-700 hover:text-green-600 transition-colors">Cart</Link>
              </>
            )}
            <Link to="/about" className="text-gray-700 hover:text-green-600 transition-colors">About</Link>
            
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-gray-700">Hello, {user.name}</span>
                  <button 
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <Link to="/login" className="px-4 py-2 text-gray-700 hover:text-green-600 transition-colors">Login</Link>
                  <Link to="/register" className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </nav>

          {/* Mobile menu button */}
          <button 
            className="md:hidden flex flex-col space-y-1"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="w-6 h-0.5 bg-gray-700"></span>
            <span className="w-6 h-0.5 bg-gray-700"></span>
            <span className="w-6 h-0.5 bg-gray-700"></span>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-gray-700 hover:text-green-600 transition-colors">Home</Link>
              {user && (
                <>
                  <Link to="/products" className="text-gray-700 hover:text-green-600 transition-colors">Products</Link>
                  <Link to="/cart" className="text-gray-700 hover:text-green-600 transition-colors">Cart</Link>
                </>
              )}
              <Link to="/about" className="text-gray-700 hover:text-green-600 transition-colors">About</Link>
              
              <div className="pt-4 border-t border-gray-200 flex flex-col space-y-3">
                {user ? (
                  <>
                    <div className="text-gray-700 text-center">Hello, {user.name}</div>
                    <button 
                      onClick={handleLogout}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-center"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="px-4 py-2 text-gray-700 text-center hover:text-green-600 transition-colors">Login</Link>
                    <Link to="/register" className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-center">
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;