import React from 'react';
import { ShoppingCart, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import useProductStore from '../zustand/store/productStore';

const Cart = () => {
  const {product, increaseQuantity, decreaseQuantity, removeItem} = useProductStore();

  const finalPrice = product.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

  const funnyQuotes = [
    "Your cart is as empty as your fridge on a Sunday night.",
    "This cart is emptier than my bank account after online shopping.",
    "Even tumbleweeds are rolling through here.",
    "Your cart is crying... please adopt some items.",
    "Cart Status: Single and ready to mingle with products."
  ];
  const randomQuote = funnyQuotes[Math.floor(Math.random() * funnyQuotes.length)];

  if (product.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-20">
        <ShoppingCart className="w-16 h-16 text-gray-400 mb-4" />
        <h2 className="text-3xl font-bold text-gray-800">Oops! Nothing to see here... 👀</h2>
        <p className="text-gray-500 font-black mt-2">{randomQuote}</p>
        <Link to="/">
          <div className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded-full font-semibold shadow-lg transition-all duration-300 mt-4">
            🛍️ Start Shopping
          </div>
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow p-6 overflow-x-auto">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Your Shopping Cart</h2>
          <table className="w-full table-auto text-left border-separate border-spacing-y-4">
            <thead>
              <tr className="text-gray-500 text-sm">
                <th className="p-2">Product</th>
                <th className="p-2">Category</th>
                <th className="p-2">Price</th>
                <th className="p-2 text-center">Quantity</th>
                <th className="p-2">Total Price</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {product.map((item) => (
                <tr key={item.id} className="bg-gray-100 rounded-lg">
                  <td className="flex items-center gap-4 p-2">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-14 h-14 object-contain bg-white"
                      style={{ mixBlendMode: 'multiply' }}
                    />
                    <span className="font-medium text-gray-800 line-clamp-2 max-w-[200px]">{item.title}</span>
                  </td>
                  <td className="p-2 text-sm text-gray-500">{item.category}</td>
                  <td className="p-2 font-semibold text-indigo-600">
                    ${(item.price)}
                  </td>
                  <td className="p-2">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="px-2 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded"
                      >−</button>
                      <span className="px-2 font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="px-2 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded"
                      >+</button>
                    </div>
                  </td>
                  <td className="p-2 font-semibold text-indigo-600">
                    ${(item.price * item.quantity).toFixed(2)}
                  </td>
                  <td className="p-2">
                    {/* <button
                      onClick={() => handleRemoveCart(item)}
                      className="text-sm text-red-600 hover:text-red-800 font-medium"
                    > */}
                    <Trash2 onClick={() => removeItem(item?.id)}
                      className="text-sm text-red-600 hover:text-red-800 font-medium cursor-pointer" />
                    {/* </button> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white rounded-2xl shadow p-6 h-fit sticky top-20">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h3>
          <div className="flex flex-col gap-3 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Total Items:</span>
              <span className="font-semibold">{product.reduce((acc, item) => acc + item.quantity, 0)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-gray-800 border-t pt-4">
              <span>Final Price:</span>
              <span className="text-indigo-600">${finalPrice}</span>
            </div>
          </div>
          <Link to="/checkout">
            <button className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold shadow transition-all duration-300">
              Proceed to Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
