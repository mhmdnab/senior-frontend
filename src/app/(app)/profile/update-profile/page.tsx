"use client";

import { useState } from "react";
import Cookies from "js-cookie";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "https://dakesh-backend.onrender.com";

export default function UpdateProfilePage() {
  const [formData, setFormData] = useState({
    email: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      alert("New passwords do not match!");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/users/update-profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`, // Assuming you use js-cookie
        },
        body: JSON.stringify({
          email: formData.email,
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to update profile");

      alert("Profile updated successfully!");
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#522c5d] to-[#232323] px-4 py-12 text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-[#2a1f33]/80 p-8 rounded-2xl shadow-2xl w-full max-w-md backdrop-blur-md border border-white/10"
      >
        {/* Title */}
        <h2 className="text-3xl font-bold mb-8 text-center text-purple-200 tracking-wide">
          Update Profile
        </h2>

        {/* Email */}
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full mb-4 p-3 bg-transparent border border-purple-400/40 text-white placeholder-purple-200/50 rounded-lg 
                 focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />

        {/* Old Password */}
        <input
          type="password"
          name="oldPassword"
          value={formData.oldPassword}
          onChange={handleChange}
          placeholder="Old Password"
          className="w-full mb-4 p-3 bg-transparent border border-purple-400/40 text-white placeholder-purple-200/50 rounded-lg 
                 focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />

        {/* New Password */}
        <input
          type="password"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
          placeholder="New Password"
          className="w-full mb-4 p-3 bg-transparent border border-purple-400/40 text-white placeholder-purple-200/50 rounded-lg 
                 focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />

        {/* Confirm Password */}
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm Password"
          className="w-full mb-8 p-3 bg-transparent border border-purple-400/40 text-white placeholder-purple-200/50 rounded-lg 
                 focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#cb6ce6] hover:bg-[#b55bd3] text-white py-3 rounded-xl font-semibold
                 shadow-lg hover:shadow-purple-500/30 transition-all active:scale-[0.97]"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
}
