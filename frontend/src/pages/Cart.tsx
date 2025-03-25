import { useState } from "react";
import { useCart } from "../context/CartContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/AuthContext"; 

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface OrderData {
  id: string;
  amount: number;
  currency: string;
}

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, increaseQty, decreaseQty } = useCart();
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState<OrderData | null>(null);

  const { user } = useAuth() || {};
 
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const createOrder = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/payment/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: totalPrice * 100 }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const order: OrderData = await res.json();
      setOrderData(order);
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error("Failed to create order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSuccess = async (response: any) => {
    toast.success("Payment Successful");
    console.log(response);

    try {
        // Send order details to your backend API
        const res = await fetch("http://localhost:5000/api/orders/create", { //replace with your order creation route
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                paymentId: response.razorpay_payment_id,
                orderId: response.razorpay_order_id,
                signature: response.razorpay_signature,
                cartItems: cartItems, // Send your cart items
                totalAmount: totalPrice, // Send the total amount
                userId: user?.userId
                // Add user ID if you have it in your app's state
                // userId: yourUserId,
            }),
        });

        if (!res.ok) {
            throw new Error("Failed to create order in database");
        }

        // Clear the cart after successfully saving the order
        clearCart();

    } catch (error) {
        console.error("Error saving order to database:", error);
        toast.error("Failed to save order. Please contact support.");
    }
};
  const handlePaymentFailure = (error: any) => {
    toast.error("Payment Failed");
    console.log(error);
  };

  const handleCheckout = async () => {
   
    if (cartItems.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }
    
    await createOrder(); // Call createOrder when checkout is clicked.

    if (orderData) {
      
      const options = {
        key: process.env.RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "MyStore",
        description: "Order Payment",
        order_id: orderData.id,
        handler: handlePaymentSuccess,
        modal: {
          ondismiss: () => {
            handlePaymentFailure("Payment modal closed");
          },
        },
        onError: (error: any) => {
          handlePaymentFailure(error);
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: "9876543210",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
      };
    } else {
      toast.error("Order data not available. Please try again.");
    }
  };
  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Your Cart</h2>
      {loading && <p>Loading...</p>}
      <div className="space-y-6">
        {cartItems.map((item) => (
          <div key={item._id} className="flex items-center justify-between bg-white p-4 shadow rounded-md">
            <div className="flex items-center space-x-4">
              <img src={item.image} alt={item.name} className="h-20 w-20 object-cover rounded" />
              <div>
                <h3 className="font-semibold text-gray-800">{item.name}</h3>
                <div className="flex items-center space-x-2 mt-2">
                  <button
                    onClick={() => {
                      decreaseQty(item._id);
                      toast.info(`Decreased quantity of ${item.name}`);
                    }}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    −
                  </button>
                  <span className="w-6 text-center">{item.quantity}</span>
                  <button
                    onClick={() => {
                      increaseQty(item._id);
                      toast.success(`Increased quantity of ${item.name}`);
                    }}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <p className="text-lg font-bold text-gray-800">₹{item.price * item.quantity}</p>
              <button
                onClick={() => {
                  removeFromCart(item._id);
                  toast.error(`${item.name} removed from cart`);
                }}
                className="text-red-600 hover:underline"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 flex justify-between items-center border-t pt-6">
        <h3 className="text-xl font-bold">Total: ₹{totalPrice}</h3>
        <div className="flex space-x-4">
          <button
            onClick={() => {
              clearCart();
              toast.info("Cart cleared");
            }}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Clear Cart
          </button>

          <button
            onClick={handleCheckout}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={2000} hideProgressBar theme="light" />
    </div>
  );
};

export default Cart;