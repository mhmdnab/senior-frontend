"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  const { scrollY } = useScroll();

  // Parallax movement
  const bgY = useTransform(scrollY, [0, 500], [0, -150]);

  // Larger scale to prevent gaps
  const bgScale = useTransform(scrollY, [0, 500], [1.2, 1.35]);

  // Text movement
  const textY = useTransform(scrollY, [0, 300], [0, -60]);

  return (
    <section className="relative h-screen flex bg-[#232323] text-white overflow-hidden">
      {/* Background Image */}
      <motion.div
        className="absolute inset-0"
        style={{
          y: bgY,
          scale: bgScale,
        }}
      >
        <Image
          src="/assets/herobg.png"
          alt="Background"
          fill
          priority
          style={{ objectFit: "cover" }}
          className="opacity-90"
        />
      </motion.div>

      {/* Content */}
      <div className="relative h-full flex items-center pl-10 md:pl-24">
        <motion.div style={{ y: textY }}>
          <h1 className="text-5xl font-bold mb-4">Dakesh</h1>
          <p className="text-xl mb-8">Trade it, Don’t waste it</p>
          <Link href="/products">
            <button className="px-8 py-3 bg-[#cb6ce6] text-white rounded-lg text-lg font-semibold hover:bg-[#89499b] transition duration-300">
              Dakesh Now
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
