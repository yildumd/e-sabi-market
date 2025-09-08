// client/src/services/api.js
import axios from 'axios';

// Change this line to use your Render URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://e-sabi-market-backend.onrender.com';

// The rest of your file remains the same
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Authentication API calls
export const authAPI = {
  register: (userData) => api.post('/api/auth/register', userData),
  registerVendor: (formData) => api.post('/api/auth/register/vendor', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }),
  login: (credentials) => api.post('/api/auth/login', credentials),
};

// Products API calls
export const productsAPI = {
  getAll: () => api.get('/api/products'),
  getById: (id) => api.get(`/api/products/${id}`),
  getByVendor: (vendorId) => api.get(`/api/products?vendor=${vendorId}`),
  create: (productData) => api.post('/api/products', productData),
  update: (id, productData) => api.put(`/api/products/${id}`, productData),
  delete: (id) => api.delete(`/api/products/${id}`),
};

// Vendors API calls
export const vendorsAPI = {
  getProfile: () => api.get('/api/vendors/profile'),
  updateProfile: (profileData) => api.put('/api/vendors/profile', profileData),
  getProducts: () => api.get('/api/vendors/products'),
  addProduct: (productData) => api.post('/api/vendors/products', productData),
  updateProduct: (id, productData) => api.put(`/api/vendors/products/${id}`, productData),
  deleteProduct: (id) => api.delete(`/api/vendors/products/${id}`),
  getOrders: () => api.get('/api/vendors/orders'),
  updateOrderStatus: (id, status) => api.put(`/api/vendors/orders/${id}`, { status }),
};

// Cart API calls
export const cartAPI = {
  get: () => api.get('/api/cart'),
  addItem: (productId, quantity = 1) => api.post('/api/cart/items', { productId, quantity }),
  updateItem: (productId, quantity) => api.put(`/api/cart/items/${productId}`, { quantity }),
  removeItem: (productId) => api.delete(`/api/cart/items/${productId}`),
  clear: () => api.delete('/api/cart'),
};

// Orders API calls
export const ordersAPI = {
  create: (orderData) => api.post('/api/orders', orderData),
  getAll: () => api.get('/api/orders'),
  getById: (id) => api.get(`/api/orders/${id}`),
  updateStatus: (id, status) => api.put(`/api/orders/${id}/status`, { status }),
};

// Health check
export const healthCheck = () => api.get('/api/health');

export default api;