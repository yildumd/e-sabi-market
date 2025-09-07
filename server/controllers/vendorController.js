const Vendor = require('../models/Vendor');
const Product = require('../models/Product');
const Order = require('../models/Order');

// Create vendor profile
const createVendorProfile = async (req, res) => {
  try {
    const { storeName, address, deliveryPricingPerKm } = req.body;
    
    // Check if vendor profile already exists
    const existingVendor = await Vendor.findOne({ user: req.userId });
    if (existingVendor) {
      return res.status(400).json({ message: 'Vendor profile already exists' });
    }

    const vendor = new Vendor({
      user: req.userId,
      storeName,
      address,
      deliveryPricingPerKm: deliveryPricingPerKm || 50
    });

    await vendor.save();
    res.status(201).json({ message: 'Vendor profile created successfully', vendor });
  } catch (error) {
    res.status(500).json({ message: 'Error creating vendor profile', error: error.message });
  }
};

// Get vendor profile
const getVendorProfile = async (req, res) => {
  try {
    const vendor = await Vendor.findOne({ user: req.userId }).populate('user', 'name email');
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor profile not found' });
    }
    res.status(200).json({ vendor });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching vendor profile', error: error.message });
  }
};

// Update vendor profile
const updateVendorProfile = async (req, res) => {
  try {
    const { storeName, address, deliveryPricingPerKm } = req.body;
    
    const vendor = await Vendor.findOneAndUpdate(
      { user: req.userId },
      { storeName, address, deliveryPricingPerKm },
      { new: true, runValidators: true }
    );

    if (!vendor) {
      return res.status(404).json({ message: 'Vendor profile not found' });
    }

    res.status(200).json({ message: 'Vendor profile updated successfully', vendor });
  } catch (error) {
    res.status(500).json({ message: 'Error updating vendor profile', error: error.message });
  }
};

// Get vendor products
const getVendorProducts = async (req, res) => {
  try {
    const vendor = await Vendor.findOne({ user: req.userId });
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor profile not found' });
    }

    const products = await Product.find({ vendor: vendor._id });
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
};

// Add product
const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;
    const image = req.file ? req.file.path : null;

    const vendor = await Vendor.findOne({ user: req.userId });
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor profile not found' });
    }

    const product = new Product({
      vendor: vendor._id,
      name,
      description,
      price,
      category,
      stock,
      image
    });

    await product.save();
    res.status(201).json({ message: 'Product added successfully', product });
  } catch (error) {
    res.status(500).json({ message: 'Error adding product', error: error.message });
  }
};

// Update product
const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { name, description, price, category, stock } = req.body;
    const image = req.file ? req.file.path : undefined;

    const vendor = await Vendor.findOne({ user: req.userId });
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor profile not found' });
    }

    const product = await Product.findOneAndUpdate(
      { _id: productId, vendor: vendor._id },
      { name, description, price, category, stock, ...(image && { image }) },
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product updated successfully', product });
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error: error.message });
  }
};

// Delete product
const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const vendor = await Vendor.findOne({ user: req.userId });
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor profile not found' });
    }

    const product = await Product.findOneAndDelete({ _id: productId, vendor: vendor._id });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
};

// Get vendor orders
const getVendorOrders = async (req, res) => {
  try {
    const vendor = await Vendor.findOne({ user: req.userId });
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor profile not found' });
    }

    const orders = await Order.find({ vendor: vendor._id })
      .populate('customer', 'name email')
      .populate('items.product', 'name price');

    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
};

// Update order status
const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const vendor = await Vendor.findOne({ user: req.userId });
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor profile not found' });
    }

    const order = await Order.findOneAndUpdate(
      { _id: orderId, vendor: vendor._id },
      { status },
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ message: 'Order status updated successfully', order });
  } catch (error) {
    res.status(500).json({ message: 'Error updating order status', error: error.message });
  }
};

module.exports = {
  createVendorProfile,
  getVendorProfile,
  updateVendorProfile,
  getVendorProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  getVendorOrders,
  updateOrderStatus
};