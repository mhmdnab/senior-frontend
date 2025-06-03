// WhyUseDakesh.tsx
"use client";

import React from "react";
import { DollarSign, Users, ShieldCheck, Box } from "lucide-react";

export default function WhyUseDakesh() {
  return (
    <div className="min-h-screen bg-[#232323] flex flex-col">
      <div className="flex flex-col flex-grow justify-center px-4">
        {/* Heading */}
        <h2 className="text-4xl font-bold text-[#cb6ce6] text-center mb-16">
          Why Use Dakesh?
        </h2>

        {/* Cards Row */}
        <div className="flex flex-wrap justify-center gap-8">
          {/* Card 1 */}
          <div className="w-56 flex flex-col items-center text-center px-4">
            <DollarSign className="w-12 h-12 text-[#cb6ce6] mb-4" />
            <h4 className="font-semibold text-lg text-white">Zero Fees</h4>
            <p className="text-gray-400 text-sm mt-2">
              No transaction costs—swap directly with other members.
            </p>
          </div>

          {/* Card 2 */}
          <div className="w-56 flex flex-col items-center text-center px-4">
            <Users className="w-12 h-12 text-[#cb6ce6] mb-4" />
            <h4 className="font-semibold text-lg text-white">
              Community-Driven
            </h4>
            <p className="text-gray-400 text-sm mt-2">
              Join local barter groups and build trust over time.
            </p>
          </div>

          {/* Card 3 */}
          <div className="w-56 flex flex-col items-center text-center px-4">
            <ShieldCheck className="w-12 h-12 text-[#cb6ce6] mb-4" />
            <h4 className="font-semibold text-lg text-white">
              Safe &amp; Secure
            </h4>
            <p className="text-gray-400 text-sm mt-2">
              We verify profiles so you can swap with confidence.
            </p>
          </div>

          {/* Card 4 */}
          <div className="w-56 flex flex-col items-center text-center px-4">
            <Box className="w-12 h-12 text-[#cb6ce6] mb-4" />
            <h4 className="font-semibold text-lg text-white">Wide Variety</h4>
            <p className="text-gray-400 text-sm mt-2">
              From electronics to automobiles—lots of items available.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
