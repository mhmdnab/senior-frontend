"use client";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import { useAuth } from "@/contexts/AuthContext"; // <-- import the context hook

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "https://dakesh-backend.onrender.com";

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE}/api/auth/login`, {
        email,
        password,
      });

      login(res.data.token);

      if (res.data.user?.username) {
        Cookies.set("username", res.data.user.username, {
          expires: 1,
          path: "/",
        });
      } else if (res.data.user?.id) {
        Cookies.set("userId", res.data.user.id, {
          expires: 1,
          path: "/",
        });
      }

      if (res.data.user?.role) {
        Cookies.set("role", res.data.user.role, {
          expires: 1,
          path: "/",
        });
      }

      // Redirect to callback or home
      const urlParams = new URLSearchParams(window.location.search);
      const callbackUrl = urlParams.get("callbackUrl") || "/";
      router.push(callbackUrl);
    } catch (error: any) {
      setError(error.response?.data?.message || "Login failed");
      console.error("Login error:", error.response?.data || error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#522c5d] to-[#232323] px-4">
      <div
        className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 
                  p-8 rounded-2xl shadow-xl shadow-black/30"
      >
        <h1 className="text-3xl font-extrabold text-white mb-6 text-center drop-shadow">
          Login
        </h1>

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-purple-200 mb-1">
              Email
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Type your email"
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
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="
            w-full px-4 py-2 rounded-lg bg-white/20 text-white
            border border-white/30 focus:border-purple-400 focus:ring-2 
            focus:ring-purple-500/40 transition-all placeholder-purple-200/50
          "
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-400 text-sm text-center font-medium">
              {error}
            </p>
          )}

          {/* Button */}
          <button
            type="submit"
            className="
          w-full py-3 rounded-lg font-semibold 
          bg-gradient-to-r from-purple-500 to-pink-500 
          hover:opacity-90 hover:shadow-lg hover:shadow-purple-800/40
          transition-all duration-300 text-white
        "
          >
            Login
          </button>

          {/* Links */}
          <p className="text-sm text-purple-200 mt-4 text-center">
            <a href="/register" className="hover:underline">
              Don’t have an account? Register here
            </a>
          </p>

          <p className="text-sm text-purple-200 mt-2 text-center">
            <a href="/forgot-password" className="hover:underline">
              Forgot your password?
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
