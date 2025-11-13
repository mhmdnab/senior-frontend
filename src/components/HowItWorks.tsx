// components/HowItWorks.tsx
"use client";

import React from "react";
import { Edit, Search, MessageCircle } from "lucide-react";

export default function HowItWorks() {
  return (
    // Add the same mobile-only padding here, then remove at md+
    <div className="bg-white flex items-center justify-center min-h-screen py-16">
      <div className="max-w-7xl w-full text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-extrabold text-[#cb6ce6] mb-14">
          How It Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Step 1 */}
          <div
            className="
        flex flex-col items-center p-6 rounded-2xl
        bg-[#fbf1ff]/60 backdrop-blur-md border border-[#cb6ce6]/20
        shadow-md hover:shadow-xl hover:shadow-purple-300/30
        hover:-translate-y-2 transition-all duration-300
      "
          >
            <div
              className="
          bg-gradient-to-br from-[#ffeaff] to-[#f3d3ff]
          rounded-full p-6 mb-6 shadow-inner shadow-white/40
        "
            >
              <Edit className="w-12 h-12 text-[#cb6ce6]" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              1. Post Your Item
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Create a listing by adding photos, a title, and a brief
              description of what you want to trade.
            </p>
          </div>

          {/* Step 2 */}
          <div
            className="
        flex flex-col items-center p-6 rounded-2xl
        bg-[#fbf1ff]/60 backdrop-blur-md border border-[#cb6ce6]/20
        shadow-md hover:shadow-xl hover:shadow-purple-300/30
        hover:-translate-y-2 transition-all duration-300
      "
          >
            <div
              className="
          bg-gradient-to-br from-[#ffeaff] to-[#f3d3ff]
          rounded-full p-6 mb-6 shadow-inner shadow-white/40
        "
            >
              <Search className="w-12 h-12 text-[#cb6ce6]" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              2. Browse Offers
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Explore available listings or filter by category to find what you
              need.
            </p>
          </div>

          {/* Step 3 */}
          <div
            className="
        flex flex-col items-center p-6 rounded-2xl
        bg-[#fbf1ff]/60 backdrop-blur-md border border-[#cb6ce6]/20
        shadow-md hover:shadow-xl hover:shadow-purple-300/30
        hover:-translate-y-2 transition-all duration-300
      "
          >
            <div
              className="
          bg-gradient-to-br from-[#ffeaff] to-[#f3d3ff]
          rounded-full p-6 mb-6 shadow-inner shadow-white/40
        "
            >
              <MessageCircle className="w-12 h-12 text-[#cb6ce6]" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              3. Complete the Swap
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Message the other user to finalize the details and arrange a safe
              exchange.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
