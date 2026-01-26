const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  razorpay_order_id: {
    type: String,
    required: true,
    unique: true,
  },
  razorpay_payment_id: {
    type: String,
    required: false, // will be added after payment success
  },
  razorpay_signature: {
    type: String,
    required: false, // will be added after payment success
  },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    default: 'INR',
  },
  status: {
    type: String,
    enum: ['CREATED', 'SUCCESS', 'FAILED'],
    default: 'CREATED',
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  workshopId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Workshop',
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);
