import { Routes, Route } from "react-router-dom";
import LoginForm from "./pages/Auth/Login";
import SignupForm from "./pages/Auth/Signup";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminProductList from "./pages/Admin/ProductList";
import AddProduct from "./pages/Admin/AddProduct";
import EditProduct from "./pages/Admin/EditProduct";
import ProtectedAdminRoute from "./pages/ProtectedAdminRoute";
import ProtectedUserRoute from "./pages/ProtectedUserRoute";
import Cart from "./pages/Cart";

function App() {
  return (
    <Routes>
      {/*Admin Routes*/}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedAdminRoute>
            <AdminDashboard />
          </ProtectedAdminRoute>
        }
      />
      <Route
        path="/admin/products"
        element={
          <ProtectedAdminRoute>
            <AdminProductList />
          </ProtectedAdminRoute>
        }
      />
      <Route
        path="/admin/products/add"
        element={
          <ProtectedAdminRoute>
            <AddProduct />
          </ProtectedAdminRoute>
        }
      />
      <Route
        path="/admin/products/edit/:id"
        element={
          <ProtectedAdminRoute>
            <EditProduct />
          </ProtectedAdminRoute>
        }
      />

      {/* User Routes */}
      <Route
        path="/"
        element={
          <ProtectedUserRoute>
            <Dashboard />
          </ProtectedUserRoute>
        }
      />
      <Route
        path="/cart"
        element={
          <ProtectedUserRoute>
            <Cart />
          </ProtectedUserRoute>
        }
      />

      {/* Public Auth Routes */}
      <Route path="/login" element={<LoginForm />} />
      <Route path="/signup" element={<SignupForm />} />
      <Route path="/success" element={<div>Payment Successful!</div>} />
      <Route path="/cancel" element={<div>Payment Canceled</div>} />
    </Routes>
  );
}

export default App;
