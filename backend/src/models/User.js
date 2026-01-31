import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    unique: true, // prevents duplicate registrations
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    
  },
  paymentStatus: {
    type: String,
    enum: ['PENDING', 'SUCCESS', 'FAILED'],
    default: 'PENDING',
  },
}, { timestamps: true }); // automatically adds createdAt and updatedAt

export default mongoose.model('User', userSchema);
