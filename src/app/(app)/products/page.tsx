"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";

type Product = {
  _id: string;
  title: string;
  description: string;
  images: string[];
  category: string;
  owner: {
    _id: string;
    username: string;
  };
  isAvailable: boolean;
  createdAt: string;
};

const ProductsPage = () => {
  const [userProducts, setUserProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        setUserProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#383838] to-[#232323] py-12 overflow-x-hidden">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          Our Products
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
                    src={product.images?.[0] || "/placeholder.svg"}
                    alt={product.title}
                    fill
                    className="object-cover"
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
};

export default ProductsPage;
