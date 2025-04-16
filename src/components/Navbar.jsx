import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ProductContext } from '../store';
import { ShoppingBag } from 'lucide-react';

const Navbar = () => {
  const { product } = useContext(ProductContext);
  return (
    <nav className="bg-blue-600 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-white hover:text-yellow-300 transition-colors">
            <h1 className="text-2xl font-extrabold tracking-wide">MyShop</h1>
          </Link>
          <div className="flex items-center gap-6">
            <Link
              to="/login"
              className="text-white text-sm font-medium hover:text-yellow-300 transition-colors"
            >
              Login
            </Link>
            <Link to="/cart" className="relative group">
              <div className="flex items-center gap-2 bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 rounded-full transition duration-300 shadow-md">
                <ShoppingBag className="w-5 h-5" />
                <span className="text-sm font-medium">Cart</span>

                {product?.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-yellow-300 text-black text-xs font-bold px-2 py-0.5 rounded-full shadow-md animate-pulse">
                    {product.length}
                  </span>
                )}
              </div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
