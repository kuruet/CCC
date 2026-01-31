export const validateRegistration = (req, res, next) => {
  const { name, email, phone } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({
      success: false,
      message: "Full name is required",
    });
  }

  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Email is required",
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Invalid email address",
    });
  }

  if (!phone) {
    return res.status(400).json({
      success: false,
      message: "Mobile number is required",
    });
  }

  if (!/^\d{10,15}$/.test(phone)) {
    return res.status(400).json({
      success: false,
      message: "Mobile number must be 10–15 digits",
    });
  }

  next();
};

export default validateRegistration;