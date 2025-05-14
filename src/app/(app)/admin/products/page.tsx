"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("/api/products") // Adjust path
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Products</h2>
      <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-200">
            <th className="text-left p-3">Title</th>
            <th className="text-left p-3">Category</th>
            <th className="text-left p-3">Owner</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product: any) => (
            <tr key={product._id} className="border-t">
              <td className="p-3">{product.title}</td>
              <td className="p-3">{product.category}</td>
              <td className="p-3">{product.owner}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
