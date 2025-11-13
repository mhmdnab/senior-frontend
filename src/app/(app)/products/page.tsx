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
      <div className="min-h-screen bg-gradient-to-tr from-[#522c5d] to-[#232323] flex items-center justify-center">
        <p className="text-lg text-[#cbcbcb]">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#522c5d] to-[#232323] py-12 overflow-x-hidden">
      <div className="container mx-auto px-4">
        {/* Page Title */}
        <h1 className="text-3xl font-bold text-white mb-4 text-center">
          Products
        </h1>
        <p className="text-xl font-semibold text-[#cbcbcb] mb-8 text-center">
          Check out the latest items that you might wanna barter with.
        </p>

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
              ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white border-purple-400 shadow-lg shadow-purple-900/40 scale-105"
              : "bg-white/10 text-purple-200 border-white/20 hover:bg-white/20 hover:text-white hover:border-purple-300 hover:shadow-md hover:shadow-purple-500/20 hover:scale-105"
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
                bg-white/90 backdrop-blur-sm
                border border-white/20
                shadow-md hover:shadow-2xl
                hover:-translate-y-1 transition-all duration-300
              "
                >
                  {/* Unavailable Badge */}
                  {!product.isAvailable && (
                    <span className="absolute top-2 right-2 bg-gray-500 text-white text-xs px-2 py-0.5 rounded-full shadow">
                      Unavailable
                    </span>
                  )}

                  {/* New badge */}
                  {new Date().getTime() -
                    new Date(product.createdAt).getTime() <
                    48 * 60 * 60 * 1000 && (
                    <span className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-0.5 rounded-full shadow">
                      New
                    </span>
                  )}

                  {/* Image */}
                  <div className="relative w-full h-48 bg-gray-200">
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
                    <h3 className="text-md font-semibold text-gray-800 mb-1 line-clamp-1">
                      {product.title}
                    </h3>
                    <p className="text-xs text-gray-500">
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
            bg-purple-600 hover:bg-purple-500 
            text-white font-semibold 
            py-2 px-8 rounded-xl 
            shadow-lg shadow-purple-700/30
            hover:-translate-y-0.5 
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
