"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";

type Product = {
  id: string;
  title: string;
  description: string;
  images: string;
  category: string;
  owner: string;
  isAvailable: boolean;
  createdAt: string;
};
const [userProducts, setUserProducts] = useState<Product[]>([]);

const ProductsPage = () => {
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products"); // Your Express API
        setUserProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-12 text-center">
          Our Products
        </h1>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {userProducts.map((userProducts) => (
            <Link
              href={"/products/:id"}
              key={userProducts.id}
              className="block"
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300">
                <div className="relative w-full h-48">
                  <Image
                    src={userProducts.images}
                    alt={userProducts.title}
                    fill
                    objectFit="cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    {userProducts.title}
                  </h3>
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
