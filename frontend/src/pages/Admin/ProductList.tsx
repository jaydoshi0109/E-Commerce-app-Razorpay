import { useState } from "react";
import API from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { useEffect } from "react";

interface ProductType {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
}

const ProductList = () => {
  const auth = useAuth();

  const [products, setProducts] = useState<ProductType[]>([]);
  const fetchProducts = async () => {
    try {
      const res = await API.get("/products", {
        headers: { Authorization: `Bearer ${auth?.token}` },
      });
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products", err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await API.delete(`/products/${id}`, {
        headers: { Authorization: `Bearer ${auth?.token}` },
      });
      setProducts(products.filter((product) => product._id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Manage Products</h2>
        <Link to="/admin/products/add" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Add Product</Link>
      </div>
  
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map(product => (
          <div key={product._id} className="border p-4 rounded shadow bg-white">
            <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded" />
            <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
            <p className="text-sm text-gray-500">{product.category}</p>
            <p className="font-bold mt-1">₹{product.price}</p>
            <div className="flex justify-between mt-3">
              <button onClick={() => handleDelete(product._id)} className="text-red-600 hover:underline">Delete</button>
              <Link to={`/admin/products/edit/${product._id}`} className="text-blue-600 hover:underline">Edit</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
};

export default ProductList;
