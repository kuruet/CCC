import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import paymentRoutes from "./routes/paymentRoutes.js";

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/payment", paymentRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

export default app;
