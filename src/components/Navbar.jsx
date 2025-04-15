import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ProductContext } from '../store';

const Navbar = () => {
  const { product } = useContext(ProductContext);
  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white hover:text-yellow-300 transition">
          <h1 className="text-2xl font-bold">MyShop</h1>
        </Link>
        <div className="space-x-6">
          <Link to="/login" className="text-white hover:text-yellow-300 transition">Login</Link>
          <Link to="/cart" className="text-white hover:text-yellow-300 transition px-6 py-3 bg-blue-800 rounded-xl">Cart <sup>{product?.length}</sup></Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
