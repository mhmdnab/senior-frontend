// app/categories/[category]/page.tsx
import React from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

type Product = {
  _id: string;
  title: string;
  description: string;
  images: string[];
  owner: {
    _id: string;
    username: string;
  };
  category: string;
};

const CategoryPage = async ({ params }: { params: { category: string } }) => {
  params;
  const res = await axios.get(
    `http://localhost:5001/api/products?category=${params.category}`
  );
  const products: Product[] = res.data;

  return (
    <div className="p-8 bg-gradient-to-tr from-[#522c5d] to-[#232323]">
      <h1 className="text-2xl font-bold capitalize mb-6 text-white">
        {params.category} Products
      </h1>
      {products.length === 0 ? (
        <p>No products found in this category.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link
              key={product._id}
              href={`/products/${product._id}`}
              className="block"
            >
              <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="relative h-48 w-full">
                  <Image
                    src={product.images?.[0] || "/placeholder.svg"}
                    alt={product.title}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-lg font-semibold">{product.title}</h2>
                  <p className="text-sm text-gray-500">
                    By {product.owner?.username || "Unknown"}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
