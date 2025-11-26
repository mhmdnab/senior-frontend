// components/ProductsPage.tsx
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { getImageSrc } from "@/lib/getImageSrc";

type Product = {
  _id: string;
  title: string;
  description: string;
  images: string[];
  category: string;
  owner: { _id: string; username: string };
  isAvailable: boolean;
  createdAt: string;
};

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "https://dakesh-backend.onrender.com";

// How many products to show per “page”
const INITIAL_VISIBLE_COUNT = 10;

export default function ProductsPage() {
  const [userProducts, setUserProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 1. Category filter state
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [allCategories, setAllCategories] = useState<string[]>([]);

  // 2. How many filtered products to show (client-side pagination)
  const [visibleCount, setVisibleCount] = useState<number>(
    INITIAL_VISIBLE_COUNT
  );

  // 3. Fetch all products once
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get<Product[]>(`${API_BASE}/api/products/`);
        setUserProducts(res.data);
      } catch (err: any) {
        console.error("Error fetching products:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // 4. When products arrive, build the “All” + unique categories array
  useEffect(() => {
    if (userProducts.length === 0) {
      setAllCategories(["All"]);
      return;
    }

    const categoriesSet = new Set<string>();
    userProducts.forEach((prod) => {
      if (prod.category && prod.category.trim() !== "") {
        categoriesSet.add(prod.category);
      }
    });

    setAllCategories(["All", ...Array.from(categoriesSet)]);
  }, [userProducts]);

  // 5. Filter all products by the selected category
  const filteredProducts =
    selectedCategory === "All"
      ? userProducts
      : userProducts.filter((p) => p.category === selectedCategory);

  // 6. Whenever category changes, reset visibleCount back to the initial value
  useEffect(() => {
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  }, [selectedCategory]);

  // 7. Decide which products to actually render this pass
  const visibleProducts = filteredProducts.slice(0, visibleCount);

  // 8. Show a loading message if we're still fetching
  if (isLoading) {
    return (
      <div className="relative min-h-screen bg-[#141018] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-80 bg-[radial-gradient(circle_at_20%_20%,rgba(203,108,230,0.22),transparent_30%),radial-gradient(circle_at_80%_0,rgba(137,73,155,0.2),transparent_28%),radial-gradient(circle_at_60%_80%,rgba(255,255,255,0.06),transparent_32%)]" />
        <div className="relative z-10 flex flex-col items-center gap-3 text-center px-6">
          <p className="text-sm uppercase tracking-[0.35em] text-[#f7d7ff]/80">
            Marketplace
          </p>
          <p className="text-lg text-slate-200">Loading products…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#141018] py-14 overflow-x-hidden">
      <div className="absolute inset-0 opacity-80 bg-[radial-gradient(circle_at_20%_20%,rgba(203,108,230,0.18),transparent_30%),radial-gradient(circle_at_80%_0,rgba(137,73,155,0.18),transparent_28%),radial-gradient(circle_at_60%_80%,rgba(255,255,255,0.05),transparent_32%)]" />
      <div className="absolute -bottom-32 -right-24 w-80 h-80 bg-[#cb6ce6]/15 blur-3xl rounded-full" />
      <div className="absolute -top-24 -left-16 w-64 h-64 bg-[#89499b]/15 blur-3xl rounded-full" />
      <div className="relative container mx-auto px-4">
        {/* Page Title */}
        <div className="text-center space-y-3 mb-10">
          <p className="text-sm uppercase tracking-[0.35em] text-[#f7d7ff]/80">
            Marketplace
          </p>
          <h1 className="text-4xl font-bold text-white">Products</h1>
          <p className="text-lg font-semibold text-slate-200/85">
            Check out the latest items that you might want to barter with.
          </p>
        </div>

        {/* CATEGORY FILTER BAR */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {allCategories.map((cat) => {
            const isActive = cat === selectedCategory;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`
          px-5 py-2 rounded-full text-sm font-semibold tracking-wide
          transition-all duration-300
          backdrop-blur-md border
          ${
            isActive
              ? "bg-gradient-to-r from-[#cb6ce6] via-[#b36ce0] to-[#89499b] text-slate-950 border-[#cb6ce6]/40 shadow-lg shadow-[#cb6ce6]/30 scale-105"
              : "bg-white/5 text-slate-100 border-white/10 hover:bg-white/10 hover:text-white hover:border-[#cb6ce6]/40 hover:shadow-md hover:shadow-[#cb6ce6]/25 hover:scale-105"
          }
        `}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* PRODUCTS GRID */}
        {visibleProducts.length === 0 ? (
          <p className="text-center text-gray-300">No items found.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-7">
            {visibleProducts.map((product) => (
              <Link
                href={`/products/${product._id}`}
                key={product._id}
                className="block"
              >
                <div
                  className="
                relative rounded-xl overflow-hidden
                bg-white/5 backdrop-blur-md
                border border-white/10
                shadow-[0_15px_40px_-20px_rgba(203,108,230,0.45)]
                hover:shadow-[#cb6ce6]/35
                hover:-translate-y-1 transition-all duration-300
              "
                >
                  {/* Unavailable Badge */}
                  {!product.isAvailable && (
                    <span className="absolute top-2 right-2 bg-slate-900/80 text-white text-xs px-2 py-0.5 rounded-full shadow">
                      Unavailable
                    </span>
                  )}

                  {/* New badge */}
                  {new Date().getTime() -
                    new Date(product.createdAt).getTime() <
                    48 * 60 * 60 * 1000 && (
                    <span className="absolute top-2 left-2 bg-[#f7d7ff] text-slate-900 text-xs px-2 py-0.5 rounded-full shadow">
                      New
                    </span>
                  )}

                  {/* Image */}
                  <div className="relative w-full h-48 bg-slate-900/60">
                    <Image
                      src={getImageSrc(product.images?.[0] || "")}
                      alt={product.title}
                      fill
                      loading="lazy"
                      className="
                    object-cover 
                    transition-transform duration-500 
                    group-hover:scale-110
                  "
                    />
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="text-md font-semibold text-white mb-1 line-clamp-1">
                      {product.title}
                    </h3>
                    <p className="text-xs text-slate-300">
                      By {product.owner?.username || "Unknown"}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* LOAD MORE BUTTON */}
        {visibleCount < filteredProducts.length && (
          <div className="flex justify-center mt-10">
            <button
              onClick={() =>
                setVisibleCount((prev) => prev + INITIAL_VISIBLE_COUNT)
              }
              className="
            bg-gradient-to-r from-[#cb6ce6] via-[#b36ce0] to-[#89499b]
            text-slate-950 font-semibold 
            py-2.5 px-8 rounded-xl 
            shadow-lg shadow-[#cb6ce6]/30
            hover:-translate-y-0.5 hover:shadow-[#cb6ce6]/35
            transition-all duration-300
          "
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
