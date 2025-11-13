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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#522c5d] to-[#232323] px-4">
      <div
        className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 
                  p-8 rounded-2xl shadow-xl shadow-black/30"
      >
        <h1 className="text-3xl font-extrabold text-white mb-6 text-center drop-shadow">
          Register
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-purple-200 mb-1">
              Name
            </label>
            <input
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your name"
              required
              className="
            w-full px-4 py-2 rounded-lg bg-white/20 text-white
            border border-white/30 focus:border-purple-400 focus:ring-2 
            focus:ring-purple-500/40 transition-all placeholder-purple-200/50
          "
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-purple-200 mb-1">
              Email
            </label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="
            w-full px-4 py-2 rounded-lg bg-white/20 text-white
            border border-white/30 focus:border-purple-400 focus:ring-2 
            focus:ring-purple-500/40 transition-all placeholder-purple-200/50
          "
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-purple-200 mb-1">
              Password
            </label>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="
            w-full px-4 py-2 rounded-lg bg-white/20 text-white
            border border-white/30 focus:border-purple-400 focus:ring-2 
            focus:ring-purple-500/40 transition-all placeholder-purple-200/50
          "
            />
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="
          w-full py-3 rounded-lg font-semibold 
          bg-gradient-to-r from-purple-500 to-pink-500 
          hover:opacity-90 hover:shadow-lg hover:shadow-purple-800/40
          transition-all duration-300 text-white
        "
          >
            Register
          </button>

          {/* Error / Success Message */}
          {message && (
            <p className="text-center text-sm text-red-400 font-medium mt-2">
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
