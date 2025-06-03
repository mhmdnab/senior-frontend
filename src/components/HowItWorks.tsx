// components/HowItWorks.tsx
"use client";

import React from "react";
import { Edit, Search, MessageCircle } from "lucide-react";

export default function HowItWorks() {
  return (
    <div className="bg-white flex items-center justify-center min-h-screen">
      <div className="container mx-auto text-center px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <h2 className="text-3xl font-bold text-[#cb6ce6] mb-12">
          How It Works
        </h2>
        {/* Three Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Step 1 */}
          <div className="flex flex-col items-center px-4">
            <div className="bg-[#fbf1ff] rounded-full p-6 mb-6">
              <Edit className="w-12 h-12 text-[#cb6ce6]" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              1. Post Your Item
            </h3>
            <p className="text-gray-600 text-sm">
              Create a listing by adding photos, a title, and a brief
              description of what you want to trade.
            </p>
          </div>
          {/* Step 2 */}
          <div className="flex flex-col items-center px-4">
            <div className="bg-[#fbf1ff] rounded-full p-6 mb-6">
              <Search className="w-12 h-12 text-[#cb6ce6]" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              2. Browse Offers
            </h3>
            <p className="text-gray-600 text-sm">
              Explore available listings in your area or filter by category to
              find what you need.
            </p>
          </div>
          {/* Step 3 */}
          <div className="flex flex-col items-center px-4">
            <div className="bg-[#fbf1ff] rounded-full p-6 mb-6">
              <MessageCircle className="w-12 h-12 text-[#cb6ce6]" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              3. Complete the Swap
            </h3>
            <p className="text-gray-600 text-sm">
              Message the other user to finalize details and arrange a safe
              exchange.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
