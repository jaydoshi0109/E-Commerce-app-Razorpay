import mongoose from "mongoose";
import { User } from "./User.model";
import { Product } from "./product.model";

const orderSchema = new mongoose.Schema(
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: User, required: true },
      orderItems: [
        {
          product: { type: mongoose.Schema.Types.ObjectId, ref: Product, required: true },
          quantity: { type: Number, required: true }
        }
      ],
      totalAmount: { type: Number, required: true },
      paymentStatus: {
        type: String,
        enum: ["pending", "paid"],
        default: "pending"
      },
      orderStatus: {
        type: String,
        enum: ["processing", "shipped", "delivered"],
        default: "processing"
      },
      paymentInfo: {
        paymentId: { type: String },
        paymentMethod: { type: String },
        paidAt: { type: Date }
      }
    },
    { timestamps: true }
  );
  

export const Order = mongoose.model("Order", orderSchema);