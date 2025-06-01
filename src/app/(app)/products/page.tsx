// src/app/products/page.tsx   (or wherever your ProductsPage lives)

"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";

type Product = {
  _id: string;
  title: string;
  description: string;
  images: string[]; // e.g. ["/uploads/abc.jpg"] or full URLs
  category: string;
  owner: { _id: string; username: string };
  isAvailable: boolean;
  createdAt: string;
};

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "https://dakesh-backend.onrender.com";

function getImageSrc(path: string): string {
  if (!path) return "/placeholder.svg";
  if (/^https?:\/\//.test(path)) {
    return path;
  }
  // ensure leading slash
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE}${clean}`;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get<Product[]>(`${API_BASE}/api/products`);
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#522c5d] to-[#232323] py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          Products
        </h1>
        <p className="text-xl font-semibold text-[#cbcbcb] mb-8 text-center">
          Check out the latest items that you might want to barter for.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {products.map((product) => {
            // If product is unavailable, render a non-clickable card with "Unavailable" overlay
            if (!product.isAvailable) {
              return (
                <div
                  key={product._id}
                  className="relative bg-gray-200 rounded-lg shadow-md overflow-hidden opacity-50 cursor-not-allowed"
                >
                  {/* Show image (dimmed) */}
                  <div className="relative w-full h-48">
                    <Image
                      src={getImageSrc(product.images?.[0] || "")}
                      alt={product.title}
                      fill
                      style={{ objectFit: "cover" }}
                      className="rounded"
                    />
                  </div>
                  {/* Overlay “Unavailable” label */}
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      Unavailable
                    </span>
                  </div>
                  {/* Title + owner, also dimmed */}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-700 mb-1 line-clamp-1">
                      {product.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      By {product.owner?.username || "Unknown"}
                    </p>
                  </div>
                </div>
              );
            }

            // Otherwise (isAvailable = true)
            return (
              <Link
                href={`/products/${product._id}`}
                key={product._id}
                className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl hover:scale-105 transition duration-300"
              >
                <div className="relative w-full h-48">
                  <Image
                    src={getImageSrc(product.images?.[0] || "")}
                    alt={product.title}
                    fill
                    style={{ objectFit: "cover" }}
                    className="rounded"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-700 mb-1 line-clamp-1">
                    {product.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    By {product.owner?.username || "Unknown"}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
