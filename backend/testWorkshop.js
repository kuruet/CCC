import mongoose from "mongoose";
import dotenv from "dotenv";
import Workshop from "./src/models/Workshop.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

await Workshop.updateOne({}, { $set: { price: 1 } });

console.log("Workshop price temporarily set to ₹1");
process.exit(0);
