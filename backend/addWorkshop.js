const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Workshop = require("./src/models/Workshop");

dotenv.config();

async function addWorkshop() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    const workshop = await Workshop.create({
      title: "Online Caricature Workshop",
      price: 1999, // optional, default exists
      date: new Date("2026-02-15")
    });

    console.log("Workshop added successfully:");
    console.log(workshop);

    process.exit(0);
  } catch (error) {
    console.error("Error adding workshop:", error.message);
    process.exit(1);
  }
}

addWorkshop();
