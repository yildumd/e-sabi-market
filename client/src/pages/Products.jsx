import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/products', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setProducts(response.data);
      } catch (err) {
        setError('Failed to fetch products');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/cart/add', 
        { productId, quantity: 1 },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      // Show success message or update cart count
      alert('Product added to cart!');
    } catch (err) {
      console.error('Error adding to cart:', err);
      alert('Failed to add product to cart');
    }
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
      <h1 className="text-3xl font-bold text-green-800 mb-8">Available Products</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <img 
              src={product.image || 'https://via.placeholder.com/300x200?text=Product+Image'} 
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-2">{product.description}</p>
              <p className="text-green-700 font-bold mb-2">₦{product.price}</p>
              <p className="text-sm text-gray-500 mb-4">Sold by: {product.vendor?.businessName || 'Unknown Vendor'}</p>
              
              <button
                onClick={() => addToCart(product._id)}
                className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-xl">No products available at the moment.</p>
        </div>
      )}
    </div>
  );
};

export default Products;