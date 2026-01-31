import mongoose from "mongoose";

const workshopSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    default: 1999, // fixed for now, can change later
  },
  date: {
    type: Date,
    required: true,
  },
}, { timestamps: true });

export default mongoose.model('Workshop', workshopSchema);
