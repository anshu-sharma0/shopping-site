import React, { useContext } from 'react'
import { ProductContext } from '../store';

const Cart = () => {
  const { product, setProduct } = useContext(ProductContext);
  console.log({ product })

  const handleRemoveCart = (itemToRemove) => {
    const updatedCart = product.filter((item) => item.id !== itemToRemove.id);
    setProduct(updatedCart);
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {product && product.map((product, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full">

            <div className="w-full h-60 overflow-hidden bg-gray-100 relative">
              <img
                src={product?.image}
                alt={product?.title}
                style={{ "mix-blend-mode": "multiply" }}
                className="w-full h-full object-contain p-2 transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute top-2 right-2">
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">SALE</span>
              </div>
            </div>

            <div className="p-4 flex-grow flex flex-col">
              <p className='text-xs text-gray-500'>{product?.category}</p>
              <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 mb-1">{product?.title}</h3>
              <p className="text-sm text-gray-500 mb-3 line-clamp-2">{product?.description}</p>
              <div className="mt-auto flex items-center justify-between">
                <p className="text-xl font-bold text-indigo-600">${product?.price}</p>
                <div className="flex items-center text-amber-400">
                  <span className="text-sm mr-1">★★★★☆</span>
                  <span className="text-xs text-gray-500">({product?.rating?.rate})</span>
                </div>
              </div>
            </div>

            <div className="px-4 pb-4">
              <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-300"
                onClick={() => {
                  handleRemoveCart(product)
                }}
              >
                Remove from Cart

              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Cart