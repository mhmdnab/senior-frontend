"use client";
import type React from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { LogOut, Plus } from "lucide-react"; // <-- Added Plus icon
import axios from "axios";

export default function ProfilePage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleLogout = () => {
    // Remove the auth token cookie
    Cookies.remove("token");
    Cookies.remove("username");
    Cookies.remove("role");
    console.log("Logged out.");
    router.push("/");
  };

  const handleAddProduct = () => {
    router.push("/add-product"); // <-- Adjust the route to where your add product page is
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#522c5d] to-[#232323] text-gray-100">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
          <h1 className="text-3xl font-bold">My Profile</h1>
          <div className="flex gap-4">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 border border-gray-700 text-gray-300 hover:bg-gray-800 px-4 py-2 rounded-md transition"
            >
              <LogOut className="h-4 w-4" />
              Log Out
            </button>
          </div>
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
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={handleAddProduct}
                className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-md transition"
              >
                <Plus className="h-5 w-5" />
                Add Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
