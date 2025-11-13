// components/WhyUseDakesh.tsx
"use client";

import React from "react";
import { DollarSign, Users, ShieldCheck, Box } from "lucide-react";

export default function WhyUseDakesh() {
  return (
    // Add pt-12 pb-12 for small screens, and remove it on md+ (md:pt-0 md:pb-0)
    <div className="bg-[#232323] flex items-center justify-center min-h-screen pt-16 pb-16">
      <div className="max-w-7xl w-full text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-extrabold text-[#cb6ce6] mb-14 drop-shadow-md">
          Why Use Dakesh?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Card 1 */}
          <div
            className="
        flex flex-col items-center text-center p-6 rounded-2xl
        bg-white/5 backdrop-blur-md border border-white/10
        shadow-lg hover:shadow-purple-900/40 hover:-translate-y-2
        transition-all duration-300
      "
          >
            <DollarSign className="w-12 h-12 text-[#cb6ce6] mb-4 drop-shadow" />
            <h4 className="font-semibold text-lg text-white mb-2">Zero Fees</h4>
            <p className="text-gray-400 text-sm">
              No transaction costs—swap directly with other members.
            </p>
          </div>

          {/* Card 2 */}
          <div
            className="
        flex flex-col items-center text-center p-6 rounded-2xl
        bg-white/5 backdrop-blur-md border border-white/10
        shadow-lg hover:shadow-purple-900/40 hover:-translate-y-2
        transition-all duration-300
      "
          >
            <Users className="w-12 h-12 text-[#cb6ce6] mb-4 drop-shadow" />
            <h4 className="font-semibold text-lg text-white mb-2">
              Community‐Driven
            </h4>
            <p className="text-gray-400 text-sm">
              Join local barter groups and build trust over time.
            </p>
          </div>

          {/* Card 3 */}
          <div
            className="
        flex flex-col items-center text-center p-6 rounded-2xl
        bg-white/5 backdrop-blur-md border border-white/10
        shadow-lg hover:shadow-purple-900/40 hover:-translate-y-2
        transition-all duration-300
      "
          >
            <ShieldCheck className="w-12 h-12 text-[#cb6ce6] mb-4 drop-shadow" />
            <h4 className="font-semibold text-lg text-white mb-2">
              Safe & Secure
            </h4>
            <p className="text-gray-400 text-sm">
              We verify profiles so you can swap with confidence.
            </p>
          </div>

          {/* Card 4 */}
          <div
            className="
        flex flex-col items-center text-center p-6 rounded-2xl
        bg-white/5 backdrop-blur-md border border-white/10
        shadow-lg hover:shadow-purple-900/40 hover:-translate-y-2
        transition-all duration-300
      "
          >
            <Box className="w-12 h-12 text-[#cb6ce6] mb-4 drop-shadow" />
            <h4 className="font-semibold text-lg text-white mb-2">
              Wide Variety
            </h4>
            <p className="text-gray-400 text-sm">
              From electronics to automobiles—lots of items available.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
