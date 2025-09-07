const express = require('express');
const { 
  createVendorProfile, 
  getVendorProfile, 
  updateVendorProfile,
  getVendorProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  getVendorOrders,
  updateOrderStatus
} = require('../controllers/vendorController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

// Vendor profile routes
router.post('/profile', auth, createVendorProfile);
router.get('/profile', auth, getVendorProfile);
router.put('/profile', auth, updateVendorProfile);

// Product management routes
router.get('/products', auth, getVendorProducts);
router.post('/products', auth, upload.single('image'), addProduct);
router.put('/products/:productId', auth, upload.single('image'), updateProduct);
router.delete('/products/:productId', auth, deleteProduct);

// Order management routes
router.get('/orders', auth, getVendorOrders);
router.put('/orders/:orderId', auth, updateOrderStatus);

module.exports = router;