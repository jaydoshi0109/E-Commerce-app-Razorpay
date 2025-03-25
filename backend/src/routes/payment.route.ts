import Razorpay from "razorpay";
import { Router } from "express";
import dotenv from "dotenv";

dotenv.config();

const router = Router();

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID as string,
  key_secret: process.env.RAZORPAY_KEY_SECRET as string,
});

const payment = router.post("/create-order", async (req, res) => {
  const { amount } = req.body;  // Amount in paise, e.g., ₹100 = 10000 paise

  try {
    const options = {
      amount: amount,  // Amount in paise (INR)
      currency: "INR",
      receipt: "receipt#1",
      payment_capture: 1, // Automatically capture payment
    };

    // Create Razorpay order
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({ message: "Failed to create Razorpay order" });
  }
});

export default payment;
