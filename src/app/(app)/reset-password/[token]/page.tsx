// app/reset-password/[token]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

export default function ResetPasswordPage() {
  const params = useParams() as { token?: string };
  const token = params.token;
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Wait for useParams() to populate
    if (typeof token === "undefined") {
      // If token is literally undefined (no param in URL), show an error
      setError("No token provided in URL.");
      setReady(true);
    } else {
      setReady(true);
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!token) {
      setError("Missing token.");
      return;
    }
    if (password !== password2) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await axios.put(
        `https://dakesh-backend.onrender.com/api/auth/reset-password/${token}`,
        { password }
      );
      setMessage(
        res.data.message || "Password successfully reset. You may now log in."
      );
      // Optionally, redirect once they see success:
      // setTimeout(() => router.push("/login"), 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || "Error resetting password");
    }
  };

  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading…
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#522c5d] to-[#232323] px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Reset Password</h1>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}
        {message && (
          <p className="text-green-500 text-sm mb-4 text-center">{message}</p>
        )}

        {!message && (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#cb6ce6] focus:border-[#cb6ce6]"
                placeholder="Enter new password"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#cb6ce6] focus:border-[#cb6ce6]"
                placeholder="Re-enter new password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#cb6ce6] hover:bg-[#89499b] text-white py-2 px-4 rounded-md transition duration-300"
            >
              Reset Password
            </button>
            <p className="text-sm text-[#703381] mt-6 text-center">
              <a href="/login">Back to Login</a>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
