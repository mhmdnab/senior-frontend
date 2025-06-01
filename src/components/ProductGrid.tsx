"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import Cookies from "js-cookie";

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
    <div className="bg-[#f4f4f5] py-16 min-h-screen">
      <div className="container mx-auto text-center">
        {/* Header Text */}
        <h2 className="text-4xl font-extrabold text-gray-800 mb-12">
          Swap What You Have for What You Need!
        </h2>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 sm:px-6 lg:px-8">
          {userProducts.slice(0, 4).map((product) => {
            const key = `product-${product._id}`;
            const productLink = `/products/${product._id}`;

            return (
              <Link href={productLink} key={key} className="block">
                <div className="bg-white rounded-xl shadow-md hover:shadow-[#cb6ce6]/50 hover:shadow-2xl overflow-hidden transition-all duration-300 transform hover:scale-[1.02]">
                  <img
                    src={`https://dakesh-backend.onrender.com${product.images[0]}`}
                    alt={product.title}
                    className="w-full h-48 object-cover"
                  />
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
              className="bg-purple-600 hover:bg-purple-500 text-white font-semibold py-3 px-6 rounded-xl shadow-md transition duration-300"
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
