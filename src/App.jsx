import axios from 'axios';
import './App.css';
import { useContext, useEffect, useState } from 'react';
import { ProductContext } from './store';
import { StarRating } from './components/StarRating';

function Home() {
  const [data, setData] = useState([])
  const { product, setProduct } = useContext(ProductContext);

  useEffect(() => {

    axios.get('https://fakestoreapi.com/products', {
      headers: {
        'Content-Type': 'application/json',
      },

    }).then((response) => {
      setData(response?.data);
    }).catch((error) => {
      console.log(error);
    });

  }, [])
  console.log({ product })

  const handleAddToCart = (product) => {
    setProduct((prev) => [...prev, product])
  }
  const handleRemoveFromCart = (item) => {
    const updatedCart = product.filter((p) => p.id !== item.id);
    setProduct(updatedCart);
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data && data.map((item, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full">

            {/* Image section - full image display */}
            <div className="w-full h-60 overflow-hidden bg-gray-100 relative">
              <img
                src={item?.image}
                alt={item?.title}
                style={{ "mix-blend-mode": "multiply" }}
                className="w-full h-full object-contain p-2 transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute top-2 right-2">
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">SALE</span>
              </div>
            </div>

            <div className="p-4 flex-grow flex flex-col">
              <p className='text-xs text-gray-500'>{item?.category}</p>
              <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 mb-1">{item?.title}</h3>
              <p className="text-sm text-gray-500 mb-3 line-clamp-2">{item?.description}</p>
              <div className="mt-auto flex items-center justify-between">
                <p className="text-xl font-bold text-indigo-600">${item?.price}</p>
                <div className="flex items-center text-amber-400">
                  <StarRating rating={item?.rating?.rate} />
                  <span className="text-xs text-gray-500 ml-4">({item?.rating?.rate})</span>
                </div>
              </div>
            </div>

            <div className="px-4 pb-4">
              {product.find((p) => p.id === item.id) ? (
                <button
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-300"
                  onClick={() => handleRemoveFromCart(item)}
                >
                  Remove from Cart
                </button>
              ) : (
                <button
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-300"
                  onClick={() => handleAddToCart(item)}
                >
                  Add to Cart
                </button>
              )}
            </div>

          </div>
        ))}
      </div>
    </div>

  );
}

export default Home;
