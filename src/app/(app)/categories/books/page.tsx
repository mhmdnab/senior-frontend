"use client";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation"; // Import useSearchParams
import Link from "next/link";
import Image from "next/image";

// Sample product data (replace with your actual data source)
const allProducts = [
  {
    id: 1,
    name: "The Lord of the Rings",
    description: "An epic fantasy adventure.",
    imageUrl: "https://via.placeholder.com/200/a08060/ffffff?Text=LOTR",
    price: "$25.00",
    category: "books",
    link: "/products/lotr",
  },
  {
    id: 2,
    name: "Pride and Prejudice",
    description: "A classic novel of manners.",
    imageUrl: "https://via.placeholder.com/200/80a060/ffffff?Text=P&P",
    price: "$15.00",
    category: "books",
    link: "/products/pride-prejudice",
  },
  {
    id: 3,
    name: "The Hitchhiker's Guide to the Galaxy",
    description: "A science fiction comedy series.",
    imageUrl: "https://via.placeholder.com/200/6080a0/ffffff?Text=H2G2",
    price: "$18.00",
    category: "books",
    link: "/products/hitchhikers-guide",
  },
  {
    id: 4,
    name: "Electronics Gadget X",
    description: "A cutting-edge electronic device.",
    imageUrl: "https://via.placeholder.com/200/60a080/ffffff?Text=Gadget+X",
    price: "$199.99",
    category: "electronics",
    link: "/products/gadget-x",
  },
  // Add more products here with their respective categories
];

const CategoryPage = () => {
  const searchParams = useSearchParams(); // Use useSearchParams hook
  const category = searchParams.get("category"); // Get the 'category' parameter

  if (!category) {
    return <div className="py-12 text-center">Loading category...</div>;
  }

  // Filter products based on the category from the URL
  const filteredProducts = allProducts.filter(
    (product) => product.category === category
  );

  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center capitalize">
          {category}
        </h1>
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {filteredProducts.map((product) => (
              <Link
                href={`/products/${product.link.split("/").pop()}`}
                key={product.id}
                className="block"
              >
                {" "}
                {/* Adjust link for App Router */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300">
                  <div className="relative w-full h-48">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-500 text-sm">
                      {product.description}
                    </p>
                    {product.price && (
                      <p className="text-indigo-600 font-semibold mt-2">
                        {product.price}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center">
            No products found in the {category} category.
          </p>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
