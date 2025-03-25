import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const cart = useCart();
  const auth = useAuth();
  const navigate = useNavigate();

  const cartCount = cart?.cartItems.reduce((acc, item) => acc + item.quantity, 0) || 0;

  const handleLogout = () => {
    auth?.logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold text-blue-600">
            MyStore
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              Home
            </Link>

            <Link
              to="/cart"
              className="relative text-gray-700 hover:text-blue-600 font-medium transition"
            >
              Cart
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-3 text-xs bg-red-600 text-white px-1.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            {auth?.user ? (
              <>
                {auth.user.isAdmin ? (
                  <Link to="/admin/dashboard" className="text-gray-700 hover:text-blue-600 font-medium transition">
                    Admin
                  </Link>
                ) : (
                  <span className="text-gray-600 font-medium">{auth.user.username}</span>
                )}

                <button
                  onClick={handleLogout}
                  className="text-red-600 hover:underline font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-blue-600 font-medium transition">
                  Login
                </Link>
                <Link to="/signup" className="text-gray-700 hover:text-blue-600 font-medium transition">
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
