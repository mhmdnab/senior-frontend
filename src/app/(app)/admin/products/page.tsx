"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

type Product = {
  _id: string;
  title: string;
  category: string;
  owner: {
    username: string;
  };
};
const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "https://dakesh-backend.onrender.com";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]); // Specify the type of products

  const handleDelete = async (productId: string) => {
    try {
      const token = Cookies.get("token");
      await axios.delete(`${API_BASE}/api/admin/product/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(products.filter((product) => product._id !== productId)); // Update the state to remove the deleted product
      alert("Product deleted successfully!");
    } catch (err) {
      console.error("Error deleting product:", err);
      alert("Failed to delete product.");
    }
  };

  useEffect(() => {
    const token = Cookies.get("token");
    axios
      .get(`${API_BASE}/api/admin/products`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="bg-gray-50 p-6 rounded-xl shadow-lg">
      {/* Go Back Button */}
      <button
        onClick={() => window.history.back()}
        className="mb-6 inline-flex items-center gap-2 text-gray-700 hover:text-gray-900 font-semibold text-sm"
      >
        ← Go Back
      </button>

      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Products</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-sm uppercase tracking-wider">
              <th className="text-left px-6 py-3">Title</th>
              <th className="text-left px-6 py-3">Category</th>
              <th className="text-left px-6 py-3">Owner</th>
              <th className="text-left px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product: Product) => (
              <tr
                key={product._id}
                className="border-t hover:bg-gray-50 transition duration-200"
              >
                <td className="px-6 py-4 text-gray-800">{product.title}</td>
                <td className="px-6 py-4 text-gray-600">{product.category}</td>
                <td className="px-6 py-4 text-gray-600">
                  {product.owner?.username || "N/A"}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
