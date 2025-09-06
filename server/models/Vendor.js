const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  storeName: {
    type: String,
    required: true,
    trim: true
  },
  logo: {
    type: String,
    default: null
  },
  description: {
    type: String,
    default: ''
  },
  address: {
    type: String,
    required: true
  },
  deliveryPricingPerKm: {
    type: Number,
    required: true,
    default: 0
  },
  isApproved: {
    type: Boolean,
    default: false
  },
  rating: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Vendor', vendorSchema);