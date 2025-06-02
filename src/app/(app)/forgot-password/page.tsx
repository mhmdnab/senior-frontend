// app/forgot-password/page.tsx
"use client";

import { useState } from "react";
import axios from "axios";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "https://dakesh-backend.onrender.com";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const res = await axios.post(`${API_BASE}/api/auth/forgot-password`, {
        email,
      });
      setMessage(res.data.message || "Check your email for a reset link.");
    } catch (err: any) {
      setError(err.response?.data?.message || "Error sending reset email.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#522c5d] to-[#232323] px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Forgot Password</h1>
        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}
        {message && (
          <p className="text-green-500 text-sm mb-4 text-center">{message}</p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Enter your email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#cb6ce6] focus:border-[#cb6ce6]"
              placeholder="you@example.com"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#cb6ce6] hover:bg-[#89499b] text-white py-2 px-4 rounded-md transition duration-300"
          >
            Send Reset Link
          </button>
          <p className="text-sm text-[#703381] mt-6 text-center">
            <a href="/login">Back to Login</a>
          </p>
        </form>
      </div>
    </div>
  );
}
