"use client";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5001/api/auth/login", {
        email,
        password,
      });

      Cookies.set("token", res.data.token, {
        expires: 1, // expires in 1 day
        path: "/", // make it accessible across the app
      });

      // Save username if exists
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

      // Save role if exists
      if (res.data.user?.role) {
        Cookies.set("role", res.data.user.role, {
          expires: 1,
          path: "/",
        });
      }

      const urlParams = new URLSearchParams(window.location.search);
      const callbackUrl = urlParams.get("callbackUrl") || "/";
      router.push(callbackUrl);
    } catch (error: any) {
      setError(error.response?.data?.message || "Login failed");
      console.error("Login error:", error.response?.data || error);
    }
  };

  // end
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#522c5d] to-[#232323] px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#cb6ce6] focus:border-[#cb6ce6]"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#cb6ce6] focus:border-[#cb6ce6]"
              placeholder="Enter your password"
              required
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-[#cb6ce6] hover:bg-[#89499b] text-white py-2 px-4 rounded-md transition duration-300"
          >
            Login
          </button>

          <p className="text-sm text-[#703381] mt-6 text-center underline">
            <a href="/register">Don't have an account? Register Here</a>
          </p>
        </form>
      </div>
    </div>
  );
}
