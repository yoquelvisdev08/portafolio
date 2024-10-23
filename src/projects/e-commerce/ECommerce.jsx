import React, { useState } from 'react';

const products = [
  { id: 1, name: 'Product 1', price: 10 },
  { id: 2, name: 'Product 2', price: 20 },
  { id: 3, name: 'Product 3', price: 30 },
];

const ECommerce = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="e-commerce p-4 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">E-Commerce Store</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-xl font-semibold mb-2">Products</h3>
          {products.map(product => (
            <div key={product.id} className="flex justify-between items-center mb-2 p-2 bg-white rounded">
              <span>{product.name} - ${product.price}</span>
              <button 
                onClick={() => addToCart(product)}
                className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-1 px-2 rounded"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Cart</h3>
          {cart.map(item => (
            <div key={item.id} className="flex justify-between items-center mb-2 p-2 bg-white rounded">
              <span>{item.name} - ${item.price}</span>
              <button 
                onClick={() => removeFromCart(item.id)}
                className="bg-red-500 hover:bg-red-400 text-white font-bold py-1 px-2 rounded"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="mt-4 text-xl font-bold">
            Total: ${totalPrice}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ECommerce;
