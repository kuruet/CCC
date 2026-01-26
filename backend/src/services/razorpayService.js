const razorpay = require('../config/razorpay');

const createOrder = async (amount, currency = 'INR') => {
  try {
    const options = {
      amount: amount * 100, // amount in paise
      currency,
      payment_capture: 1, // auto-capture
    };

    const order = await razorpay.orders.create(options);
    return order; // contains order_id, amount, currency
  } catch (error) {
    throw new Error('Razorpay order creation failed');
  }
};

module.exports = { createOrder };
