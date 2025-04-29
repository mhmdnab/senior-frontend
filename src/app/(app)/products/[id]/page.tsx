import React from "react";
import axios from "axios";
import Image from "next/image";

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
};

const ProductPage = async ({ params }: { params: { id: string } }) => {
  // No need to await params explicitly.
  const res = await axios.get(
    `http://localhost:5000/api/products/${params.id}`
  );
  const product: Product = res.data;

  return (
    <div className="p-8 max-w-6xl mx-auto h-screen">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Image on the left */}
        <div className="w-full md:w-1/2">
          <div className="relative w-full h-96 rounded-lg overflow-hidden shadow-md bg-white">
            <Image
              src={product.images?.[0] || "/placeholder.svg"}
              alt={product.title}
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>

        {/* Product details on the right */}
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-gray-800">{product.title}</h1>
          <p className="text-gray-600 text-sm">
            By {product.owner?.username || "Unknown"}
          </p>
          <p className="text-gray-700">{product.description}</p>

          {/* Dakesh Button */}
          <button className="mt-4 w-fit bg-[#cb6ce6] text-white px-6 py-2 rounded-md hover:bg-[#89499b] transition">
            Dakesh
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
