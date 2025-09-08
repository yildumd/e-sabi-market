import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { productsAPI, cartAPI } from '../services/api';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await productsAPI.getAll();
        setProducts(response.data);
      } catch (err) {
        const errorMessage = err.response?.data?.message || 
                            'Failed to fetch products. Please try again later.';
        setError(errorMessage);
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = async (productId) => {
    try {
      await cartAPI.addItem(productId, 1);
      
      // Show success message with a better UI notification
      const notification = document.createElement('div');
      notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg z-50';
      notification.textContent = 'Product added to cart!';
      document.body.appendChild(notification);
      
      // Remove notification after 3 seconds
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 3000);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 
                          'Failed to add product to cart. Please try again.';
      
      // Show error message
      const notification = document.createElement('div');
      notification.className = 'fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-md shadow-lg z-50';
      notification.textContent = errorMessage;
      document.body.appendChild(notification);
      
      // Remove notification after 3 seconds
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 3000);
      
      console.error('Error adding to cart:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        <p className="ml-4 text-gray-600">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">{error}</div>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-green-800">Available Products</h1>
        <div className="text-sm text-gray-600">
          Welcome back, {user?.name}
        </div>
      </div>
      
      {products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map(product => (
            <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100">
              <div className="relative">
                <img 
                  src={product.image || 'https://via.placeholder.com/300x200?text=No+Image'} 
                  alt={product.name}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                  }}
                />
                {product.stock === 0 && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs">
                    Out of Stock
                  </div>
                )}
              </div>
              
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2 h-10">{product.description}</p>
                
                <div className="flex justify-between items-center mb-3">
                  <p className="text-green-700 font-bold text-lg">₦{product.price?.toLocaleString()}</p>
                  {product.stock > 0 && (
                    <p className="text-xs text-gray-500">{product.stock} in stock</p>
                  )}
                </div>
                
                <p className="text-sm text-gray-500 mb-4">
                  Sold by: <span className="font-medium">{product.vendor?.businessName || 'Unknown Vendor'}</span>
                </p>
                
                <button
                  onClick={() => addToCart(product._id)}
                  disabled={product.stock === 0}
                  className={`w-full py-2 rounded transition-colors duration-200 ${
                    product.stock === 0 
                      ? 'bg-gray-400 text-gray-700 cursor-not-allowed' 
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🛒</div>
          <p className="text-gray-500 text-xl mb-4">No products available at the moment.</p>
          <p className="text-gray-400">Check back later or contact vendors to add products.</p>
        </div>
      )}
    </div>
  );
};

export default Products;