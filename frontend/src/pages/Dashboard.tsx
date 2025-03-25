import Navbar from "../components/Navbar";
import ProductList from "../pages/Products/ProductList";

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="px-4 py-8 md:px-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">All Products</h1>
        <ProductList />
      </div>
    </div>
  );
};

export default Dashboard;
