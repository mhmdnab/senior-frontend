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
      return alert("All fields (including the image) are required.");
    }

    const dataToSend = new FormData();
    dataToSend.append("title", formData.title);
    dataToSend.append("description", formData.description);
    dataToSend.append("category", formData.category);
    dataToSend.append("isAvailable", String(formData.isAvailable));
    dataToSend.append("image", file);

    try {
      await axios.post(`${API_BASE}/api/products`, dataToSend, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      alert("Product added successfully!");
      router.push("/products");
    } catch (err: any) {
      console.error("Error adding product:", {
        status: err.response?.status,
        data: err.response?.data,
      });
      alert("Failed to add product. See console for details.");
    }
  };

  if (checkingAuth) return <p className="text-white">Checking auth...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#522c5d] to-[#232323] text-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-10">
        <h1 className="text-3xl font-extrabold text-[#cb6ce6] mb-6 text-center drop-shadow">
          Add New Product
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <input
            type="text"
            name="title"
            placeholder="Product Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="
          w-full px-4 py-3 rounded-lg bg-white/10 text-white
          placeholder:text-purple-200/50
          border border-white/20
          focus:border-purple-400 focus:ring-2 focus:ring-purple-500/40
          outline-none transition
        "
          />

          {/* Description */}
          <textarea
            name="description"
            placeholder="Product Description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            className="
          w-full px-4 py-3 rounded-lg bg-white/10 text-white
          placeholder:text-purple-200/50
          border border-white/20
          focus:border-purple-400 focus:ring-2 focus:ring-purple-500/40
          outline-none resize-none transition
        "
          ></textarea>

          {/* File Upload */}
          <label className="block text-purple-200/80 text-sm font-semibold">
            Upload Product Image
          </label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            required
            className="
          w-full px-4 py-3 rounded-lg bg-white/10 text-white
          border border-white/20 cursor-pointer
          file:bg-purple-600 file:text-white file:rounded file:px-4 file:py-2
          file:border-none file:mr-4
          focus:border-purple-400 focus:ring-2 focus:ring-purple-500/40
          outline-none transition
        "
          />

          {/* Preview */}
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-48 object-cover rounded-xl border border-white/20 shadow-lg mt-3"
            />
          )}

          {/* Category */}
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="
          w-full px-4 py-3 rounded-lg bg-white/10 text-white
          border border-white/20
          focus:border-purple-400 focus:ring-2 focus:ring-purple-500/40
          outline-none transition
        "
          >
            <option className="text-gray-700" value="Electronics">
              Electronics
            </option>
            <option className="text-gray-700" value="Clothing">
              Clothing
            </option>
            <option className="text-gray-700" value="Books">
              Books
            </option>
            <option className="text-gray-700" value="Toys">
              Toys
            </option>
            <option className="text-gray-700" value="Home">
              Home
            </option>
            <option className="text-gray-700" value="Automobiles">
              Automobiles
            </option>
            <option className="text-gray-700" value="Other">
              Other
            </option>
          </select>

          {/* Submit Button */}
          <button
            type="submit"
            className="
          w-full py-3 rounded-lg font-semibold text-white
          bg-gradient-to-r from-purple-600 to-pink-600
          hover:from-purple-500 hover:to-pink-500
          shadow-lg shadow-purple-900/40 hover:shadow-purple-700/50
          transition-all duration-300 active:scale-[0.97]
        "
          >
            Add Product
          </button>
        </form>

        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="
        mt-5 w-full py-2 rounded-lg text-gray-300
        bg-white/5 border border-white/10
        hover:bg-white/10 transition-all
      "
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
