// components/WhyUseDakesh.tsx
"use client";

import React from "react";
import { DollarSign, Users, ShieldCheck, Box } from "lucide-react";

export default function WhyUseDakesh() {
  return (
    <div className="relative bg-[#141018] flex items-center justify-center py-16 md:py-20 overflow-hidden">
      <div className="absolute inset-0 opacity-80 bg-[radial-gradient(circle_at_15%_20%,rgba(203,108,230,0.16),transparent_28%),radial-gradient(circle_at_80%_0,rgba(137,73,155,0.16),transparent_26%),radial-gradient(circle_at_60%_80%,rgba(255,255,255,0.05),transparent_32%)]" />
      <div className="absolute -bottom-24 -right-20 w-72 h-72 bg-[#cb6ce6]/15 blur-3xl rounded-full" />
      <div className="absolute -top-28 -left-16 w-64 h-64 bg-[#89499b]/15 blur-3xl rounded-full" />
      <div className="relative z-10 w-full">
      <div className="max-w-7xl w-full text-center px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-3 mb-14">
          <p className="text-sm uppercase tracking-[0.35em] text-[#f7d7ff]/80">
            Benefits
          </p>
          <h2 className="text-4xl font-extrabold text-white drop-shadow-md">
            Why Use Dakesh?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Card 1 */}
          <div
            className="
        flex flex-col items-center text-center p-6 rounded-2xl
        bg-white/5 backdrop-blur-md border border-white/10
        shadow-lg shadow-[#cb6ce6]/20 hover:shadow-[#cb6ce6]/40 hover:-translate-y-2
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
        shadow-lg shadow-[#cb6ce6]/20 hover:shadow-[#cb6ce6]/40 hover:-translate-y-2
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
        shadow-lg shadow-[#cb6ce6]/20 hover:shadow-[#cb6ce6]/40 hover:-translate-y-2
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
        shadow-lg shadow-[#cb6ce6]/20 hover:shadow-[#cb6ce6]/40 hover:-translate-y-2
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
    </div>
  );
}
