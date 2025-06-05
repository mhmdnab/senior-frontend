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
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {allCategories.map((cat) => {
            const isActive = cat === selectedCategory;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`
                  px-4 py-1 rounded-full text-sm font-medium
                  transition duration-200
                  ${
                    isActive
                      ? "bg-purple-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-200"
                  }
                `}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* PRODUCTS GRID (client-side pagination) */}
        {visibleProducts.length === 0 ? (
          <p className="text-center text-gray-300">No items found.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {visibleProducts.map((product) => (
              <Link
                href={`/products/${product._id}`}
                key={product._id}
                className="block"
              >
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300 relative">
                  {/* Availability badge in top-right corner */}
                  {!product.isAvailable && (
                    <span className="absolute top-2 right-2 bg-gray-400 text-white text-xs px-2 py-0.5 rounded">
                      Unavailable
                    </span>
                  )}

                  {/* “New” ribbon if created within last 48 hours */}
                  {new Date().getTime() -
                    new Date(product.createdAt).getTime() <
                    48 * 60 * 60 * 1000 && (
                    <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded">
                      New
                    </span>
                  )}

                  <div className="relative w-full h-48 bg-gray-100">
                    <Image
                      src={getImageSrc(product.images?.[0] || "")}
                      alt={product.title}
                      fill
                      loading="lazy"
                      style={{ objectFit: "cover" }}
                      className="rounded"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-700 mb-1">
                      {product.title}
                    </h3>
                    <p className="text-sm text-gray-500">
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
          <div className="flex justify-center mt-8">
            <button
              onClick={() =>
                setVisibleCount((prev) => prev + INITIAL_VISIBLE_COUNT)
              }
              className="bg-purple-600 hover:bg-purple-500 text-white font-semibold py-2 px-6 rounded-xl shadow-md transition duration-300"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
