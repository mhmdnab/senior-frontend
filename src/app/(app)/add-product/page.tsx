"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function AddProductPage() {
  const router = useRouter();

  // 🧠 Assuming you already know the logged-in user's ID
  const ownerId = "your-logged-in-user-id"; // Replace this with dynamic data later!

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    images: "",
    category: "Electronics", // default selected
    isAvailable: true,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/products", {
        ...formData,
        owner: ownerId, // 👈 Attach the owner ID manually here
      });
      alert("Product added successfully!");
      router.push("/products");
    } catch (err) {
      console.error("Error adding product:", err);
      alert("Failed to add product.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#383838] to-[#232323] text-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Add New Product</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full p-2 rounded bg-gray-700 placeholder-gray-400 focus:outline-none"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full p-2 rounded bg-gray-700 placeholder-gray-400 focus:outline-none"
          />
          <input
            type="text"
            name="images"
            placeholder="Image URL"
            value={formData.images}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 placeholder-gray-400 focus:outline-none"
          />
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full p-2 rounded bg-gray-700 placeholder-gray-400 focus:outline-none"
          >
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Books">Books</option>
            <option value="Toys">Toys</option>
            <option value="Home">Home</option>
            <option value="Other">Other</option>
          </select>
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-500 text-white py-2 px-4 rounded-md transition"
          >
            Add Product
          </button>
        </form>
        <button
          onClick={() => router.back()}
          className="mt-4 w-full bg-gray-600 hover:bg-gray-500 text-white py-2 px-4 rounded-md transition"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
