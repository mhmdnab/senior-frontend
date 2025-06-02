"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

type DecodedToken = {
  id: string;
  exp: number;
};

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "https://dakesh-backend.onrender.com";

export default function AddProductPage() {
  const router = useRouter();
  const [ownerId, setOwnerId] = useState<string | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Other",
    isAvailable: true,
  });

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      try {
        const decoded = jwtDecode<DecodedToken>(token);
        if (decoded.exp * 1000 < Date.now()) {
          Cookies.remove("token");
          router.push("/login");
        } else {
          setOwnerId(decoded.id);
        }
      } catch (err) {
        console.error("Invalid token", err);
        Cookies.remove("token");
        router.push("/login");
      }
    } else {
      router.push("/login");
    }
    setCheckingAuth(false);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ownerId || !file) {
      return alert("All fields including image are required.");
    }

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("isAvailable", String(formData.isAvailable));
    formDataToSend.append("owner", ownerId);
    formDataToSend.append("image", file);

    try {
      await axios.post(`${API_BASE}/api/products`, formDataToSend, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Product added successfully!");
      router.push("/products");
    } catch (err) {
      console.error("Error adding product:", err);
      alert("Failed to add product.");
    }
  };

  if (checkingAuth) return <p className="text-white">Checking auth...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#522c5d] to-[#232323] text-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-[#60346c] backdrop-blur-md rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Add New Product</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full p-2 rounded bg-[#522c5d] placeholder-gray-400 focus:outline-none"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full p-2 rounded bg-[#522c5d] placeholder-gray-400 focus:outline-none"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            required
            className="w-full p-2 rounded bg-[#522c5d] text-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-[#cb6ce6] file:text-white"
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-48 object-cover rounded-md mt-2"
            />
          )}
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full p-2 rounded bg-[#5d3269] text-white focus:outline-none"
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
            className="w-full hover:bg-[#89499b] bg-[#cb6ce6] text-white py-2 px-4 rounded-md transition"
          >
            Add Product
          </button>
        </form>
        <button
          onClick={() => router.back()}
          className="mt-4 w-full bg-gray-700 text-gray-300 hover:bg-gray-800 py-2 px-4 rounded-md transition"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
