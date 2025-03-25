import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"; // ✅ Import your provider
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { CartProvider } from "./context/CartContext";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
  <BrowserRouter>
    <AuthProvider>
      <CartProvider> 
        <App />
      </CartProvider>
    </AuthProvider>
  </BrowserRouter>
</React.StrictMode>
);
