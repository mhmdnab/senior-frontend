// components/WhyUseDakesh.tsx
"use client";

import React from "react";
import { DollarSign, Users, ShieldCheck, Box } from "lucide-react";

const benefits = [
  {
    title: "Zero Fees",
    description: "No transaction costs—swap directly with other members.",
    Icon: DollarSign,
  },
  {
    title: "Community-Driven",
    description: "Join local barter groups and build trust over time.",
    Icon: Users,
  },
  {
    title: "Safe & Secure",
    description: "We verify profiles so you can swap with confidence.",
    Icon: ShieldCheck,
  },
  {
    title: "Wide Variety",
    description: "From electronics to automobiles—lots of items available.",
    Icon: Box,
  },
];

export default function WhyUseDakesh() {
  return (
    <section className="relative bg-[#141018] text-white overflow-hidden py-20 sm:py-24">
      <div className="absolute inset-0 opacity-80 bg-[radial-gradient(circle_at_15%_20%,rgba(203,108,230,0.16),transparent_28%),radial-gradient(circle_at_80%_0,rgba(137,73,155,0.16),transparent_26%),radial-gradient(circle_at_60%_80%,rgba(255,255,255,0.05),transparent_32%)]" />
      <div className="absolute -bottom-24 -right-20 w-72 h-72 bg-[#cb6ce6]/15 blur-3xl rounded-full" />
      <div className="absolute -top-28 -left-16 w-64 h-64 bg-[#89499b]/15 blur-3xl rounded-full" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-3 mb-14 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-[#f7d7ff]/80">
            Benefits
          </p>
          <h2 className="text-4xl font-extrabold text-white drop-shadow-md">
            Why Use Dakesh?
          </h2>
          <span
            aria-hidden
            className="h-px w-16 bg-gradient-to-r from-transparent via-[#cb6ce6] to-transparent"
          />
        </div>

        <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map(({ title, description, Icon }) => (
            <div
              key={title}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 text-center shadow-lg shadow-[#cb6ce6]/20 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[#cb6ce6]/45"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/10 to-white/[0.02] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative flex flex-col items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[#cb6ce6]/70 via-[#b36ce0]/70 to-[#89499b]/70 shadow-inner shadow-[#cb6ce6]/30">
                  <Icon className="h-8 w-8 text-white drop-shadow" />
                </div>
                <h4 className="text-lg font-semibold text-white">{title}</h4>
                <p className="text-sm leading-relaxed text-slate-200/80">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
