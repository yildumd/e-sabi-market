import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/cart', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setCartItems(response.data.items || []);
      } catch (err) {
        setError('Failed to fetch cart items');
        console.error('Error fetching cart:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put('http://localhost:5000/api/cart/update', 
        { productId, quantity: newQuantity },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setCartItems(response.data.items || []);
    } catch (err) {
      console.error('Error updating cart:', err);
      alert('Failed to update cart');
    }
  };

  const removeItem = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete('http://localhost:5000/api/cart/remove', {
        headers: {
          Authorization: `Bearer ${token}`
        },
        data: { productId }
      });
      setCartItems(response.data.items || []);
    } catch (err) {
      console.error('Error removing item from cart:', err);
      alert('Failed to remove item from cart');
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-green-800 mb-8">Your Shopping Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-xl mb-4">Your cart is empty</p>
          <Link 
            to="/products" 
            className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {cartItems.map(item => (
              <div key={item.product._id} className="bg-white rounded-lg shadow-md p-4 mb-4 flex flex-col md:flex-row items-center">
                <img 
                  src={item.product.image || 'https://via.placeholder.com/100x100?text=Product'} 
                  alt={item.product.name}
                  className="w-24 h-24 object-cover rounded mb-4 md:mb-0 md:mr-4"
                />
                
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold text-gray-800">{item.product.name}</h3>
                  <p className="text-gray-600">Vendor: {item.product.vendor?.businessName || 'Unknown'}</p>
                  <p className="text-green-700 font-bold">₦{item.product.price}</p>
                </div>
                
                <div className="flex items-center mt-4 md:mt-0">
                  <button 
                    onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                    className="w-8 h-8 bg-gray-200 rounded-l-md flex items-center justify-center"
                  >
                    -
                  </button>
                  <span className="w-10 h-8 bg-gray-100 flex items-center justify-center">
                    {item.quantity}
                  </span>
                  <button 
                    onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                    className="w-8 h-8 bg-gray-200 rounded-r-md flex items-center justify-center"
                  >
                    +
                  </button>
                  
                  <button 
                    onClick={() => removeItem(item.product._id)}
                    className="ml-4 text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between mb-2">
                  <span>Subtotal:</span>
                  <span>₦{calculateTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Delivery Fee:</span>
                  <span>₦500.00</span>
                </div>
                <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t border-gray-200">
                  <span>Total:</span>
                  <span>₦{(calculateTotal() + 500).toFixed(2)}</span>
                </div>
                
                <button className="w-full bg-green-600 text-white py-3 rounded-lg mt-6 hover:bg-green-700 transition-colors">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;