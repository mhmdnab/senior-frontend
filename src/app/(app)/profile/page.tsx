"use client";
import type React from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import axios from "axios";

export default function ProfilePage() {
  const router = useRouter();
  type Product = {
    id: string;
    title: string;
    description: string;
    images: string[];
    category: string;
    owner: string;
    isAvailable: boolean;
    createdAt: string;
  };
  const [userProducts, setUserProducts] = useState<Product[]>([]);
  const [formData, setFormData] = useState({
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products"); // Your Express API
        setUserProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
  };

  const handleLogout = () => {
    // Handle logout logic here
    console.log("Logging out...");
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#383838] to-[#232323] text-gray-100">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold">My Profile</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 border border-gray-700 text-gray-300 hover:bg-gray-800 px-4 py-2 rounded-md transition"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Log Out
          </button>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-1">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-1">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-300"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-gray-600 text-gray-100 focus:border-gray-400 focus:outline-none py-2 px-0"
                />
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="phoneNumber"
                  className="text-sm font-medium text-gray-300"
                >
                  Phone Number
                </label>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-gray-600 text-gray-100 focus:border-gray-400 focus:outline-none py-2 px-0"
                />
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-300"
                >
                  Change Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-gray-600 text-gray-100 focus:border-gray-400 focus:outline-none py-2 px-0"
                />
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="confirmPassword"
                  className="text-sm font-medium text-gray-300"
                >
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-gray-600 text-gray-100 focus:border-gray-400 focus:outline-none py-2 px-0"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gray-800 hover:bg-gray-700 text-white py-2 rounded-md transition"
              >
                Save Changes
              </button>
            </form>
          </div>

          {/* Products Section */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-gray-200 mb-6">
              My Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {userProducts?.map((product) => (
                <div
                  key={product.id}
                  className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition"
                >
                  <div className="relative aspect-square w-full">
                    <Image
                      src={product.images?.[0] || "/placeholder.svg"}
                      alt={product.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-lg text-gray-200 mb-2">
                      {product.title}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {product.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
