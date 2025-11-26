"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { LogOut, Plus } from "lucide-react";
import axios from "axios";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { getImageSrc } from "@/lib/getImageSrc";

type Product = {
  _id: string;
  title: string;
  description: string;
  images: string[];
  owner: { _id: string; username: string };
  category: string;
};

// Pull from .env.local or fallback
const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "https://dakesh-backend.onrender.com";

export default function ProfilePage() {
  const router = useRouter();
  const { logout } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    setRole(Cookies.get("role") || null);
  }, []);

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
  }, []);

  const handleLogout = () => {
    logout(); // <-- This removes the token and updates React state!
    Cookies.remove("username");
    Cookies.remove("role");
    router.push("/");
  };

  const handleAddProduct = () => {
    router.push("/add-product");
  };

  return (
    <div className="relative min-h-screen bg-[#141018] text-slate-100 overflow-hidden">
      <div className="absolute inset-0 opacity-80 bg-[radial-gradient(circle_at_20%_20%,rgba(203,108,230,0.22),transparent_30%),radial-gradient(circle_at_80%_0,rgba(137,73,155,0.2),transparent_28%),radial-gradient(circle_at_60%_80%,rgba(255,255,255,0.06),transparent_32%)]" />
      <div className="absolute -bottom-32 -right-24 w-80 h-80 bg-[#cb6ce6]/15 blur-3xl rounded-full" />
      <div className="absolute -top-24 -left-16 w-64 h-64 bg-[#89499b]/15 blur-3xl rounded-full" />
      <div className="relative container mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-12 gap-6">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-[#f7d7ff]/80">
              Account
            </p>
            <h1 className="text-5xl font-bold text-white mb-2 tracking-tight">
              My Profile
            </h1>
            <p className="text-slate-200 text-lg">
              Manage your items and account settings.
            </p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 border border-white/10 text-slate-200 hover:bg-white/10 
                     hover:text-white px-6 py-2 rounded-xl transition-all hover:shadow-lg hover:shadow-[#cb6ce6]/20"
            >
              <LogOut className="h-5 w-5" />
              Log Out
            </button>

            {role === "admin" && (
              <Link href="/admin">
                <button
                  className="px-8 py-3 bg-gradient-to-r from-[#cb6ce6] via-[#b36ce0] to-[#89499b] text-slate-950 rounded-xl 
                               text-lg font-semibold transition-all shadow-md shadow-[#cb6ce6]/30 hover:shadow-[#cb6ce6]/35"
                >
                  Admin Panel
                </button>
              </Link>
            )}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Profile Card */}
          <div
            className="lg:col-span-1 bg-white/5 backdrop-blur-md 
                      rounded-2xl p-8 shadow-2xl shadow-[#cb6ce6]/25 text-center border border-white/10"
          >
            <div className="flex flex-col items-center space-y-5">
              <div
                className="w-24 h-24 rounded-full bg-gradient-to-br from-[#cb6ce6] to-[#89499b] flex items-center justify-center 
                          text-slate-950 text-3xl font-bold shadow-lg shadow-[#cb6ce6]/25 border border-white/20"
              >
                {Cookies.get("username")?.charAt(0).toUpperCase() || "U"}
              </div>

              <h2 className="text-2xl font-bold text-white">
                {Cookies.get("username") || "User"}
              </h2>

              <p className="text-slate-300 text-sm leading-relaxed">
                Welcome back! Manage your products, update your profile, and
                keep track of your barters in one place.
              </p>

              <Link href="/profile/update-profile">
                <button
                  className="mt-2 px-5 py-2 bg-white/10 hover:bg-white/15 text-white rounded-md 
                               text-sm transition-all border border-white/15 shadow hover:shadow-[#cb6ce6]/25"
                >
                  Edit Profile
                </button>
              </Link>
            </div>
          </div>

          {/* PRODUCTS */}
          <div
            className="lg:col-span-2 bg-white/5 backdrop-blur-md 
                      rounded-2xl p-8 shadow-xl shadow-[#cb6ce6]/20 border border-white/10"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-white">Your Products</h2>

              <button
                onClick={handleAddProduct}
                className="flex items-center gap-2 bg-gradient-to-r from-[#cb6ce6] via-[#b36ce0] to-[#89499b]
                       text-slate-950 py-3 px-6 rounded-xl font-semibold text-sm transition-all shadow-md 
                       shadow-[#cb6ce6]/30 hover:shadow-[#cb6ce6]/35"
              >
                <Plus className="h-5 w-5" />
                Add Product
              </button>
            </div>

            {loading && <p className="text-slate-300">Loading products...</p>}
            {error && <p className="text-[#f7d7ff]">{error}</p>}
            {!loading && products.length === 0 && (
              <p className="text-slate-300">You don’t have any products yet.</p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {products.map((product) => (
                <Link
                  key={product._id}
                  href={`/products/${product._id}`}
                  className="bg-white/5 hover:bg-white/10 p-4 rounded-xl shadow-lg hover:shadow-[#cb6ce6]/25 
                         border border-white/10 transition-all duration-200 transform hover:scale-[1.03] 
                         flex flex-col h-full"
                >
                  {product.images?.length > 0 && (
                    <div className="relative w-full aspect-square rounded-lg overflow-hidden mb-3">
                      <Image
                        src={getImageSrc(product.images[0])}
                        alt={product.title}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                  )}

                  <div className="flex flex-col flex-grow">
                    <h3 className="text-lg font-semibold text-white truncate mb-1">
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
