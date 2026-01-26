const Payment = require('../models/Payment');
const User = require('../models/User');
const Workshop = require('../models/Workshop');
const { createOrder } = require('../services/razorpayService');

exports.createPaymentOrder = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    // Validate request
    if (!name || !email || !phone) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create or find user
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ name, email, phone });
    }

    // Fetch the workshop
    const workshop = await Workshop.findOne(); // single workshop for now
    if (!workshop) return res.status(404).json({ message: 'Workshop not found' });

    // Create Razorpay order
    const order = await createOrder(workshop.price, 'INR');

    // Save Payment in DB
    const payment = await Payment.create({
      razorpay_order_id: order.id,
      amount: workshop.price,
      currency: 'INR',
      status: 'CREATED',
      userId: user._id,
      workshopId: workshop._id,
    });

    res.status(200).json({
      success: true,
      order_id: order.id,
      key_id: process.env.RAZORPAY_KEY_ID,
      amount: workshop.price,
      currency: 'INR',
      user: { name, email, phone },
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
