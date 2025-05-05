"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

interface Product {
  _id: number;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
}

const ProductGrid = () => {
  const [userProducts, setUserProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        setUserProducts(res.data); // Set the fetched products to state
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="bg-white py-12 min-h-screen mt-12">
      <div className="container mx-auto text-center">
        {/* Header Text */}
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          Swap What You Have for What You Need!
        </h2>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 sm:px-0 py-12">
          {userProducts.map((product) => {
            const key = `product-${product._id}`;
            const productLink = `/products/${product._id}`;

            return (
              <Link href={productLink} key={key} className="block">
                <div className="bg-gray-100 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300">
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">
                      {product.title}
                    </h3>
                    <p className="text-gray-500 text-sm">
                      {product.description}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* View More Button */}
        <div className="mt-8">
          <Link href="/products">
            <button
              type="submit"
              className="w-auto bg-[#cb6ce6] hover:bg-[#89499b] text-white py-2 px-4 rounded-md transition duration-300"
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
