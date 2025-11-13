// components/ProductGrid.tsx
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

interface Product {
  _id: number;
  title: string;
  description: string;
  images: string[];
  link: string;
}

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "https://dakesh-backend.onrender.com";

const ProductGrid = () => {
  const [userProducts, setUserProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`${API_BASE}/api/products/`);
        setUserProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (isLoading) {
    return (
      <div className="bg-[#f4f4f5] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-gray-600 text-lg">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f4f4f5] py-20 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-5xl mx-auto text-center">
        {/* Header Text */}
        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-10 sm:mb-20 tracking-tight">
          Swap What You Have for What You Need!
        </h2>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
          {userProducts.slice(0, 4).map((product) => {
            const key = `product-${product._id}`;
            const productLink = `/products/${product._id}`;

            return (
              <Link href={productLink} key={key} className="block group">
                <div
                  className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200 
                            group-hover:shadow-xl group-hover:shadow-purple-400/20 
                            transition-all duration-300 transform group-hover:-translate-y-1"
                >
                  <div className="relative h-44 sm:h-52 overflow-hidden">
                    <img
                      src={product.images?.[0]}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate">
                      {product.title}
                    </h3>
                    <p className="text-gray-500 text-sm line-clamp-2">
                      {product.description}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* View More Button */}
        <div className="mt-12">
          <Link href="/products">
            <button
              type="button"
              className="bg-purple-600 hover:bg-purple-500 text-white font-semibold 
                     py-3 px-6 rounded-xl shadow-md text-base transition-all 
                     hover:shadow-purple-400/30 hover:-translate-y-1"
            >
              View More
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
