const Vendor = require('../models/Vendor');
const Product = require('../models/Product');
const Order = require('../models/Order');

// Create vendor profile
exports.createVendorProfile = async (req, res) => {
  try {
    // Check if the user is a vendor
    if (req.user.role !== 'vendor') {
      return res.status(403).json({ message: 'Only vendors can create a vendor profile' });
    }

    // Check if the vendor profile already exists for this user
    const existingVendor = await Vendor.findOne({ user: req.user._id });
    if (existingVendor) {
      return res.status(400).json({ message: 'Vendor profile already exists' });
    }

    const { storeName, logo, description, address, deliveryPricingPerKm } = req.body;

    const vendor = await Vendor.create({
      user: req.user._id,
      storeName,
      logo,
      description,
      address,
      deliveryPricingPerKm
    });

    res.status(201).json({
      status: 'success',
      data: {
        vendor
      }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get vendor profile
exports.getVendorProfile = async (req, res) => {
  try {
    const vendor = await Vendor.findOne({ user: req.user._id });
    
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor profile not found' });
    }

    res.status(200).json({
      status: 'success',
      data: {
        vendor
      }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update vendor profile
exports.updateVendorProfile = async (req, res) => {
  try {
    const vendor = await Vendor.findOneAndUpdate(
      { user: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!vendor) {
      return res.status(404).json({ message: 'Vendor profile not found' });
    }

    res.status(200).json({
      status: 'success',
      data: {
        vendor
      }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get vendor products
exports.getVendorProducts = async (req, res) => {
  try {
    const products = await Product.find({ vendor: req.user._id });
    
    res.status(200).json({
      status: 'success',
      results: products.length,
      data: {
        products
      }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Add product
exports.addProduct = async (req, res) => {
  try {
    const { name, description, price, category, discount } = req.body;
    
    const product = await Product.create({
      vendor: req.user._id,
      name,
      description,
      price,
      category,
      discount,
      image: req.file ? req.file.path : null
    });

    res.status(201).json({
      status: 'success',
      data: {
        product
      }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate(
      { _id: req.params.productId, vendor: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({
      status: 'success',
      data: {
        product
      }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({
      _id: req.params.productId,
      vendor: req.user._id
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get vendor orders
exports.getVendorOrders = async (req, res) => {
  try {
    const orders = await Order.find({ vendor: req.user._id })
      .populate('customer', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      status: 'success',
      results: orders.length,
      data: {
        orders
      }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['pending', 'accepted', 'in-transit', 'delivered', 'cancelled'];
    
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const order = await Order.findOneAndUpdate(
      { _id: req.params.orderId, vendor: req.user._id },
      { status },
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({
      status: 'success',
      data: {
        order
      }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};