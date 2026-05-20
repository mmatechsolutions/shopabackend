import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import onboardingRoutes from "./routes/onboardingRoutes.js";
import tenantRoutes from "./routes/tenantRoutes.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", onboardingRoutes);
app.use("/api", tenantRoutes);
app.use("/api", productRoutes);
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");
  } catch (error) {
    console.error("DB connection failed:", error.message);
    process.exit(1);
  }
};

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  await connectDB();

  console.log(`Server running on port ${PORT}`);
});
