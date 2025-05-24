"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { LogOut, Plus } from "lucide-react";
import axios from "axios";
import Link from "next/link";

type Product = {
  _id: string;
  title: string;
  description: string;
  images: string[];
  owner: { _id: string; username: string };
  category: string;
};

// Pull from .env.local or fallback
const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:5001";

/**
 * If `path` is already absolute (http:// or https://) return it.
 * Otherwise ensure it begins with "/" and prepend API_BASE.
 */
function getImageSrc(path: string): string {
  if (!path) return "";
  if (/^https?:\/\//.test(path)) {
    return path;
  }
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE}${clean}`;
}

export default function ProfilePage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = Cookies.get("token");
        const res = await axios.get<Product[]>(
          `${API_BASE}/api/products/my-products`,
          { headers: { Authorization: token ? `Bearer ${token}` : "" } }
        );
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []); // empty deps → no hook‐size warnings

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("username");
    Cookies.remove("role");
    router.push("/");
  };

  const handleAddProduct = () => {
    router.push("/add-product");
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#522c5d] to-[#232323] text-gray-100">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-12 gap-6">
          <div>
            <h1 className="text-5xl font-bold text-white mb-2">My Profile</h1>
            <p className="text-gray-300 text-lg">
              Manage your items and account settings.
            </p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 border border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white px-6 py-2 rounded-xl transition-shadow hover:shadow-md"
            >
              <LogOut className="h-5 w-5" />
              Log Out
            </button>
            <Link href="/admin/dashboard">
              <button className="px-8 py-3 bg-[#cb6ce6] hover:bg-[#89499b] text-white rounded-xl text-lg font-semibold transition-shadow shadow-md">
                Admin?
              </button>
            </Link>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Profile Info */}
          <div className="lg:col-span-1 self-start h-[370px] bg-gradient-to-br from-[#1f1f1f] to-[#2c2c2c] rounded-2xl p-6 shadow-xl text-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-24 h-24 rounded-full bg-purple-600 flex items-center justify-center text-white text-2xl font-bold shadow-inner">
                {Cookies.get("username")?.charAt(0).toUpperCase() || "U"}
              </div>
              <h2 className="text-2xl font-bold text-white">
                {Cookies.get("username") || "User"}
              </h2>
              <p className="text-gray-400 text-sm px-2">
                Welcome back! Here’s your personal space. You can add, edit, and
                manage your product listings easily.
              </p>
            </div>
            <Link href="/profile/update-profile">
              <button className="mt-4 px-4 py-2 bg-purple-700 hover:bg-purple-600 text-white rounded-md text-sm transition shadow">
                Edit Profile
              </button>
            </Link>
          </div>

          {/* Your Products */}
          <div className="lg:col-span-2 bg-gradient-to-br from-[#1f1f1f] to-[#2a2a2a] rounded-2xl p-8 shadow-2xl">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-white">Your Products</h2>
              <button
                onClick={handleAddProduct}
                className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white py-3 px-6 rounded-xl font-semibold text-sm transition-shadow shadow-md"
              >
                <Plus className="h-5 w-5" />
                Add Product
              </button>
            </div>

            {loading && <p className="text-gray-400">Loading products...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && products.length === 0 && (
              <p className="text-gray-400">You don't have any products yet.</p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {products.map((product) => (
                <Link
                  key={product._id}
                  href={`/products/${product._id}`}
                  className="bg-[#181818] hover:bg-[#232323] p-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-200 transform hover:scale-[1.02] flex flex-col h-full"
                >
                  {product.images?.length > 0 && (
                    <div className="relative w-full aspect-square rounded-lg overflow-hidden mb-3">
                      <Image
                        src={getImageSrc(product.images[0])}
                        alt={product.title}
                        fill
                        style={{ objectFit: "cover" }}
                        className="rounded"
                      />
                    </div>
                  )}
                  <div className="flex flex-col flex-grow">
                    <h3
                      className="text-lg font-semibold text-white truncate mb-1"
                      title={product.title}
                    >
                      {product.title}
                    </h3>
                    <p className="text-gray-400 text-sm line-clamp-2 flex-grow">
                      {product.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
