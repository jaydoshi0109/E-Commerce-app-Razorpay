// server/routes/orders.route.js
import express from "express";
import { Order } from "../models/order.model"; // Assuming your Order model is in models/Order.model.js

const router = express.Router();

interface OrderRequestBody {
    paymentId: string;
    orderId: string;
    signature: string;
    cartItems: { _id: string; quantity: number }[];
    totalAmount: number;
    userId: string;
  }
  
 


router.post("/create", async (req, res) => {
    try {
        const { paymentId, cartItems, totalAmount, userId } : OrderRequestBody = req.body;
        console.log("Received userId:", userId);

        // Create an order document
        const order = new Order({
            user: userId, // Add the user ID
            orderItems: cartItems.map((item: { _id: string; quantity: number }) => ({
                product: item._id, // Assuming item._id is the product ID
                quantity: item.quantity,
            })),
            totalAmount: totalAmount,
            paymentStatus: "paid", // Set payment status to "paid"
            paymentInfo: {
                paymentId: paymentId,
                paymentMethod: "Razorpay", // Or however you want to label it
                paidAt: new Date(),
            },
        });

        // Save the order to the database
        await order.save();

        res.status(201).json({ message: "Order created successfully" });
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ message: "Failed to create order" });
    }
});

export default router;