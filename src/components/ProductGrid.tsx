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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/products/`);
        setUserProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="bg-[#f4f4f5] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto text-center">
        {/* Header Text */}
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-8 sm:mb-12">
          Swap What You Have for What You Need!
        </h2>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {userProducts.slice(0, 4).map((product) => {
            const key = `product-${product._id}`;
            const productLink = `/products/${product._id}`;

            return (
              <Link href={productLink} key={key} className="block">
                <div className="bg-white rounded-xl shadow-md hover:shadow-[#cb6ce6]/50 hover:shadow-2xl overflow-hidden transition-all duration-300 transform hover:scale-[1.02]">
                  <img
                    src={product.images?.[0]}
                    alt={product.title}
                    className="w-full h-40 sm:h-48 object-cover"
                  />
                  <div className="p-3 sm:p-4">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1 truncate">
                      {product.title}
                    </h3>
                    <p className="text-gray-500 text-xs sm:text-sm line-clamp-2">
                      {product.description}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* View More Button */}
        <div className="mt-8 sm:mt-12">
          <Link href="/products">
            <button
              type="button"
              className="bg-purple-600 hover:bg-purple-500 text-white font-semibold py-2 px-4 sm:py-3 sm:px-6 rounded-xl shadow-md transition duration-300 text-sm sm:text-base"
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
