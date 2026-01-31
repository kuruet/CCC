import razorpay from "../config/razorpay.js";

export const createOrder = async (amountInPaise, currency = "INR") => {
  try {
    const options = {
      amount: Number(amountInPaise), // 🔒 force number
      currency,
      receipt: `rcpt_${Date.now()}`,
      payment_capture: 1,
    };

    console.log("📤 Creating Razorpay order with:", options);

    return await razorpay.orders.create(options);
  } catch (error) {
    console.error("🔥 Razorpay API ERROR:", error?.error || error);
    throw error;
  }
};
