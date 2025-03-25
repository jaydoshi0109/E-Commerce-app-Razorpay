import { Link } from "react-router-dom";

const AdminDashboard: React.FC = () => {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link to="/admin/products" className="p-6 bg-blue-100 rounded hover:bg-blue-200 transition">
              <h2 className="text-xl font-semibold text-blue-800">Manage Products</h2>
              <p className="text-sm text-blue-600">View, update, and delete your products.</p>
            </Link>
            <Link to="/admin/products/add" className="p-6 bg-green-100 rounded hover:bg-green-200 transition">
              <h2 className="text-xl font-semibold text-green-800">Add Product</h2>
              <p className="text-sm text-green-600">Create and publish a new product.</p>
            </Link>
          </div>
        </div>
      </div>
    );
  };
  
  export default AdminDashboard;