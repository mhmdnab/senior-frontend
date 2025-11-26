// components/HowItWorks.tsx
"use client";

import React from "react";
import { Edit, Search, MessageCircle } from "lucide-react";

export default function HowItWorks() {
  return (
    // Add the same mobile-only padding here, then remove at md+
    <div className="relative bg-[#141018] flex items-center justify-center min-h-screen py-16 overflow-hidden">
      <div className="absolute inset-0 opacity-80 bg-[radial-gradient(circle_at_20%_20%,rgba(203,108,230,0.18),transparent_30%),radial-gradient(circle_at_80%_0,rgba(137,73,155,0.18),transparent_28%),radial-gradient(circle_at_60%_80%,rgba(255,255,255,0.05),transparent_32%)]" />
      <div className="absolute -bottom-24 -right-20 w-72 h-72 bg-[#cb6ce6]/15 blur-3xl rounded-full" />
      <div className="absolute -top-28 -left-16 w-64 h-64 bg-[#89499b]/15 blur-3xl rounded-full" />
      <div className="relative max-w-7xl w-full text-center px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 items-center mb-14">
          <p className="text-sm uppercase tracking-[0.35em] text-[#f7d7ff]/80">
            How it works
          </p>
          <h2 className="text-4xl font-extrabold text-white">
            How It Works
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Step 1 */}
          <div
            className="
        flex flex-col items-center p-6 rounded-2xl
        bg-white/5 backdrop-blur-md border border-white/10
        shadow-lg shadow-[#cb6ce6]/20 hover:shadow-[#cb6ce6]/40
        hover:-translate-y-2 transition-all duration-300 text-left
      "
          >
            <div
              className="
          bg-gradient-to-br from-[#cb6ce6] to-[#89499b]
          rounded-full p-6 mb-6 shadow-inner shadow-[#cb6ce6]/30
        "
            >
              <Edit className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              1. Post Your Item
            </h3>
            <p className="text-slate-200 text-sm leading-relaxed text-center">
              Create a listing by adding photos, a title, and a brief
              description of what you want to trade.
            </p>
          </div>

          {/* Step 2 */}
          <div
            className="
        flex flex-col items-center p-6 rounded-2xl
        bg-white/5 backdrop-blur-md border border-white/10
        shadow-lg shadow-[#cb6ce6]/20 hover:shadow-[#cb6ce6]/40
        hover:-translate-y-2 transition-all duration-300 text-left
      "
          >
            <div
              className="
          bg-gradient-to-br from-[#cb6ce6] to-[#89499b]
          rounded-full p-6 mb-6 shadow-inner shadow-[#cb6ce6]/30
        "
            >
              <Search className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              2. Browse Offers
            </h3>
            <p className="text-slate-200 text-sm leading-relaxed text-center">
              Explore available listings or filter by category to find what you
              need.
            </p>
          </div>

          {/* Step 3 */}
          <div
            className="
        flex flex-col items-center p-6 rounded-2xl
        bg-white/5 backdrop-blur-md border border-white/10
        shadow-lg shadow-[#cb6ce6]/20 hover:shadow-[#cb6ce6]/40
        hover:-translate-y-2 transition-all duration-300 text-left
      "
          >
            <div
              className="
          bg-gradient-to-br from-[#cb6ce6] to-[#89499b]
          rounded-full p-6 mb-6 shadow-inner shadow-[#cb6ce6]/30
        "
            >
              <MessageCircle className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              3. Complete the Swap
            </h3>
            <p className="text-slate-200 text-sm leading-relaxed text-center">
              Message the other user to finalize the details and arrange a safe
              exchange.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
