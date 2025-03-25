
// EditProduct.tsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../services/api";
import { useAuth } from "../../context/AuthContext";

const EditProduct: React.FC = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "",
    stock: "",
  });
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await API.get(`/products/${id}`, {
          headers: { Authorization: `Bearer ${auth?.token}` },
        });
        setFormData(res.data);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };
    fetchProduct();
  }, [id, auth?.token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await API.put(`/products/${id}`, formData, {
        headers: { Authorization: `Bearer ${auth?.token}` },
      });
      navigate("/admin/products");
    } catch (error: any) {
      console.error("Update error:", error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {Object.keys(formData).map((field) => (
            <input
              key={field}
              name={field}
              type={field === "price" || field === "stock" ? "number" : "text"}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={formData[field as keyof typeof formData]}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          ))}
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
