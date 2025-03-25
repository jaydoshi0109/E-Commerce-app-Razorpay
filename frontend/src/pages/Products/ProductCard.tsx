import React from "react";
import { useCart } from "../../context/CartContext";

interface ProductType {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
}

const ProductCard: React.FC<{ product: ProductType }> = ({ product }) => {
  const { addToCart } = useCart(); // ✅ Moved inside component

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition">
      <img src={product.image} alt={product.name} className="h-48 w-full object-cover" />
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-1">{product.name}</h2>
        <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>
        <p className="text-sm text-green-700 font-semibold">In Stock: {product.stock}</p>
        <p className="text-xl font-bold text-gray-900 mt-1">₹{product.price}</p>
        <button
          className="mt-3 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
