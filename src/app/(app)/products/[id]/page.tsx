// frontend/app/products/[id]/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation"; // Import useRouter
// import Cookies from 'js-cookie'; // You might need this later to check logged-in user ID

// Define your Product interface (ensure it matches backend structure, especially owner)
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

const ProductPage = () => {
  const params = useParams();
  const productId = params.id as string;
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get(
          `http://localhost:5001/api/products/${productId}`
        );
        setProduct(res.data as Product);
      } catch (err: any) {
        console.error("Error fetching product:", err.response?.data || err);
        setError("Failed to load product.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleDakesh = () => {
    if (product) {
      router.push(`/dakesh?productIdToBarterFor=${product._id}`);
    }
  };

  if (loading)
    return (
      <div className="p-8 max-w-6xl mx-auto h-screen">
        <p>Loading product...</p>
      </div>
    );
  if (error)
    return (
      <div className="p-8 max-w-6xl mx-auto h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  if (!product)
    return (
      <div className="p-8 max-w-6xl mx-auto h-screen">
        <p>Product not found.</p>
      </div>
    );

  return (
    <div className="p-8 max-w-full h-screen bg-gradient-to-tr from-[#522c5d] to-[#232323]">
      <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
        {/* Image on the left */}
        <div className="w-full md:w-1/3">
          <div className="relative w-full h-96 rounded-lg overflow-hidden shadow-md bg-white">
            {/* Add check if images array is not empty */}
            {product.images && product.images.length > 0 ? (
              <Image
                src={product.images[0]}
                alt={product.title}
                fill
                style={{ objectFit: "contain" }}
              />
            ) : (
              // Placeholder if no image
              <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-500">
                No Image
              </div>
            )}
          </div>
        </div>
        {/* Product details on the right */}
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          {" "}
          <h1 className="text-3xl font-bold text-white">{product.title}</h1>
          <p className="text-white text-sm">
            By {product.owner?.username || "Unknown"}
            {/* Use optional chaining for safety */}
          </p>
          <p className="text-gray-400">{product.description}</p>
          {/* --- Dakesh Button --- */}
          {/* Conditionally render the button if it's NOT the user's own product */}
          {/* Uncomment the isMyProduct check above if using it */}
          {/* {!isMyProduct && ( */}
          <button
            onClick={handleDakesh} // <-- Add the onClick handler
            className="mt-4 w-fit bg-[#cb6ce6] text-white px-6 py-2 rounded-md hover:bg-[#89499b] transition"
          >
            Dakesh
          </button>
          {/* )} */}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
