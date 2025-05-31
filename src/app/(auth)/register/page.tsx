"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Cookies from "js-cookie";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "https://dakesh-backend.onrender.com";

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // 1) Register new user
      const res = await axios.post(`${API_BASE}/api/auth/register`, formData);
      setMessage("Registration successful!");

      // 2) Log them in right away
      const loginRes = await axios.post(`${API_BASE}/api/auth/login`, {
        email: formData.email,
        password: formData.password,
      });

      // 3) Store the JWT (so you stay “logged in”)
      login(loginRes.data.token);

      // 4) Also write username & role cookies (exact same as your login page does)
      Cookies.set("username", loginRes.data.user.username, { expires: 7 });
      Cookies.set("role", loginRes.data.user.role, { expires: 7 });

      // 5) Redirect home
      router.push("/");
    } catch (error: any) {
      setMessage(
        error.response?.data?.error ||
          error.response?.data?.message ||
          "Registration failed"
      );
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#522c5d] to-[#232323]">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#cb6ce6] focus:border-[#cb6ce6]"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#cb6ce6] focus:border-[#cb6ce6]"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#cb6ce6] focus:border-[#cb6ce6]"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#cb6ce6] text-white py-2 px-4 rounded-md hover:bg-[#89499b] transition duration-300"
          >
            Register
          </button>

          {message && (
            <p className="mt-4 text-center text-sm text-red-600">{message}</p>
          )}
        </form>
      </div>
    </div>
  );
}
