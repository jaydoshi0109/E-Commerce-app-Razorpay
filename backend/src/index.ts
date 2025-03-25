import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.routes";
import productRoutes from "./routes/product.routes";
import cors from "cors";
import payment from "./routes/payment.route";
import orderRoutes from "./routes/orders.route";


dotenv.config();

const app = express();
app.use(express.json());

// Routes
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/payment", payment);
app.use("/api/orders", orderRoutes);

// DB connection & server start
mongoose.connect(process.env.MONGO_URI as string).then(() => {
  console.log("MongoDB connected");
  app.listen(5000, () => console.log("Server running on port 5000"));
});
