"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import Cookies from "js-cookie";

type Product = {
  _id: string;
  title: string;
  description: string;
  images: string[]; // e.g. ["/uploads/abc.jpg"] or ["https://i.pinimg.com/..."]
  category: string;
  owner: { _id: string; username: string };
  isAvailable: boolean;
  createdAt: string;
};

// read once at module‐scope so it's truly constant
const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:5001";

/**
 * If `path` starts with "http://" or "https://", return it as-is.
 * Otherwise treat it as a server-relative path and prepend API_BASE.
 */
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
  const [userProducts, setUserProducts] = useState<Product[]>([]);

  useEffect(() => {
    // empty deps → never changes size/order
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/products/`, {
          headers: { Authorization: `Bearer ${Cookies.get("token")}` },
          withCredentials: true,
        });
        setUserProducts(res.data);
      } catch (err: any) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#522c5d] to-[#232323] py-12 overflow-x-hidden">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          Products
        </h1>
        <p className="text-xl font-semibold text-[#cbcbcb] mb-8 text-center">
          Check out the latest items that you might wanna barter with.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {userProducts.map((product) => (
            <Link
              href={`/products/${product._id}`}
              key={product._id}
              className="block"
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300">
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
      </div>
    </div>
  );
}
