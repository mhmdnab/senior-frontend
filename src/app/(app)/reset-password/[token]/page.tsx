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

  return (
    <div className="relative min-h-screen bg-[#141018] text-slate-50 overflow-hidden px-4">
      <div className="absolute inset-0 opacity-80 bg-[radial-gradient(circle_at_20%_20%,rgba(203,108,230,0.22),transparent_30%),radial-gradient(circle_at_80%_0,rgba(137,73,155,0.2),transparent_28%),radial-gradient(circle_at_60%_80%,rgba(255,255,255,0.06),transparent_32%)]" />
      <div className="absolute -bottom-32 -left-32 w-72 h-72 rounded-full bg-[#cb6ce6]/15 blur-3xl" />
      <div className="absolute -top-20 -right-10 w-64 h-64 rounded-full bg-[#89499b]/20 blur-3xl" />

      <div className="relative z-10 max-w-lg mx-auto py-16">
        <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl shadow-[0_25px_70px_-35px_rgba(203,108,230,0.35)] p-8 sm:p-10 space-y-6">
          <div className="text-center space-y-2">
            <p className="text-sm uppercase tracking-[0.35em] text-[#f7d7ff]/80">
              Account help
            </p>
            <h1 className="text-3xl font-semibold">Reset Password</h1>
            <p className="text-slate-200/80">
              Choose a new password to secure your account.
            </p>
          </div>

          {!ready && (
            <p className="text-center text-slate-200/80">Loading…</p>
          )}

          {error && (
            <p className="text-center text-sm text-[#f7d7ff] font-medium">
              {error}
            </p>
          )}
          {message && (
            <p className="text-center text-sm text-[#9ef0c0] font-medium">
              {message}
            </p>
          )}

          {!message && ready && (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-200">
                  New Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl bg-white/10 border border-white/15 text-white px-4 py-3 placeholder:text-slate-400/80 focus:border-[#cb6ce6] focus:ring-2 focus:ring-[#cb6ce6]/50 transition"
                  placeholder="Enter new password"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-200">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                  className="w-full rounded-xl bg-white/10 border border-white/15 text-white px-4 py-3 placeholder:text-slate-400/80 focus:border-[#cb6ce6] focus:ring-2 focus:ring-[#cb6ce6]/50 transition"
                  placeholder="Re-enter new password"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl font-semibold bg-gradient-to-r from-[#cb6ce6] via-[#b36ce0] to-[#89499b] text-slate-950 shadow-lg shadow-[#cb6ce6]/30 hover:translate-y-[-1px] hover:shadow-xl hover:shadow-[#cb6ce6]/35 transition"
              >
                Reset Password
              </button>
            </form>
          )}

          <p className="text-sm text-slate-300 text-center">
            Back to{" "}
            <a
              href="/login"
              className="font-semibold text-[#f7d7ff] hover:text-white underline underline-offset-4"
            >
              login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
