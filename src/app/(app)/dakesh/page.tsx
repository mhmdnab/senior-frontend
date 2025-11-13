// pages/dakesh.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";
import { getImageSrc } from "@/lib/getImageSrc"; // your helper for building image URLs

type Product = {
  _id: string;
  title: string;
  description: string;
  images?: string[];
  category: string;
  owner: {
    _id: string;
    username: string;
  };
  isAvailable: boolean;
  createdAt: string;
};

const getLoggedInUsername = () => Cookies.get("username");

export default function DakeshPage() {
  const API_BASE =
    process.env.NEXT_PUBLIC_API_BASE || "https://dakesh-backend.onrender.com";
  const router = useRouter();
  const searchParams = useSearchParams();
  const productIdToBarterFor = searchParams.get("productIdToBarterFor");

  // 1. State for the target product (the one we want to barter for)
  const [targetProduct, setTargetProduct] = useState<Product | null>(null);

  // 2. State for “myProducts” that match that category
  const [myProducts, setMyProducts] = useState<Product[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedProductToOffer, setSelectedProductToOffer] = useState<
    string | null
  >(null);
  const [barterInitiated, setBarterInitiated] = useState(false);
  const [otherUserEmail, setOtherUserEmail] = useState<string | null>(null);

  const handleGoHome = () => {
    router.push("/");
  };

  //
  // ─── STEP A: Fetch the target product first (to learn its category) ─────────────────
  //
  useEffect(() => {
    if (!productIdToBarterFor) {
      setError("No target product specified for barter.");
      setLoading(false);
      return;
    }

    const fetchTargetProduct = async () => {
      try {
        setLoading(true);
        // We don’t need auth headers just to fetch a public product
        const res = await axios.get<Product>(
          `${API_BASE}/api/products/${productIdToBarterFor}`
        );
        setTargetProduct(res.data);
      } catch (err: any) {
        console.error("Error fetching target product:", err);
        setError("Failed to load the product you want to barter for.");
      } finally {
        setLoading(false);
      }
    };

    fetchTargetProduct();
  }, [productIdToBarterFor]);

  //
  // ─── STEP B: Once targetProduct is known, fetch “my products” and filter to same category ─────────────────
  //
  useEffect(() => {
    if (!targetProduct) return;

    const loggedInUsername = getLoggedInUsername();
    if (!loggedInUsername) {
      setError("Please log in to initiate a barter.");
      return;
    }

    const fetchAndFilterMyProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch ALL products (protected route—so pass token)
        const res = await axios.get<Product[]>(`${API_BASE}/api/products/`, {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        });
        const allProducts: Product[] = res.data;

        // 1) Keep only products owned by me
        const ownedByMe = allProducts.filter(
          (p) => p.owner.username === loggedInUsername
        );

        // 2) Next, keep only those whose category matches targetProduct.category
        const sameCategory: Product[] = ownedByMe.filter(
          (p) =>
            p.category === targetProduct.category && p._id !== targetProduct._id
        );

        setMyProducts(sameCategory);
      } catch (err: any) {
        console.error("Error fetching/filtering my products:", err);
        setError("Failed to load your products to offer.");
        setMyProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAndFilterMyProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetProduct]);

  //
  // ─── SELECTION HANDLER ─────────────────────────────────────────────────────────────────────────
  //
  const handleProductSelect = (productId: string) => {
    // If you click a card that’s already selected, unselect it
    setSelectedProductToOffer((prev) =>
      prev === productId ? null : productId
    );
  };

  //
  // ─── INITIATE BARTER ────────────────────────────────────────────────────────────────────────────
  //
  const handleInitiateBarter = async () => {
    if (!productIdToBarterFor) {
      setError("Target product ID for barter is missing from the URL.");
      return;
    }
    if (!selectedProductToOffer) {
      setError("Please select one of your products to offer for barter.");
      return;
    }

    const token = Cookies.get("token");
    if (!token) {
      setError("Authentication token missing. Please log in again.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // POST to /api/barter/initiate; backend will re‐check category at this point
      const res = await axios.post(
        `${API_BASE}/api/barter/initiate`,
        {
          productIdToBarterFor,
          productOfferedId: selectedProductToOffer,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // If backend gives us the other user’s email, show the “success” banner
      if (res.data?.otherUserEmail) {
        setOtherUserEmail(res.data.otherUserEmail);
        setBarterInitiated(true);
        setSelectedProductToOffer(null);
      } else {
        setError("Backend did not return the other user's email.");
      }
    } catch (err: any) {
      // If backend responded with a 400 due to a category mismatch, you’ll get that here
      setError(
        err.response?.data?.message || "Failed to initiate barter request."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 w-full mx-auto min-h-screen bg-gradient-to-tr from-[#522c5d] to-[#232323] text-white">
      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-4">Initiate Barter</h1>

      {/* If product ID is passed */}
      {productIdToBarterFor && (
        <p className="mb-4 text-purple-200">
          You are offering a product to barter for:
          <span className="font-semibold text-white ml-1">
            {productIdToBarterFor}
          </span>
        </p>
      )}

      {/* Barter Initiated Message */}
      {barterInitiated && otherUserEmail && (
        <div className="mt-6 p-6 rounded-xl border border-green-400/40 bg-green-900/20 text-green-200 shadow-xl">
          <h3 className="text-2xl font-bold mb-2">Barter Request Sent!</h3>
          <p className="mb-2">The product owner has been notified.</p>
          <p>You can contact them directly at:</p>
          <p className="font-bold text-lg mt-1">{otherUserEmail}</p>

          <div className="mt-6 flex gap-4">
            <button
              onClick={() => setBarterInitiated(false)}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-md transition"
            >
              Close
            </button>

            <button
              onClick={handleGoHome}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-md transition font-semibold"
            >
              Go to Homepage
            </button>
          </div>
        </div>
      )}

      {/* Loading / Error */}
      {loading && <p className="text-purple-200">Loading your products...</p>}
      {error && <p className="text-red-400">{error}</p>}

      {/* No products in same category */}
      {!loading && !error && targetProduct && myProducts.length === 0 && (
        <p className="text-orange-300">
          You have no products in the{" "}
          <span className="font-semibold">{targetProduct.category}</span>{" "}
          category.
        </p>
      )}

      {/* Product Selection */}
      {!loading && !error && myProducts.length > 0 && !barterInitiated && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-purple-200 mb-4">
            Select one of your products to offer (Category:{" "}
            <span className="text-white">{targetProduct?.category}</span>)
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {myProducts.map((product) => {
              const selected = selectedProductToOffer === product._id;

              return (
                <div
                  key={product._id}
                  onClick={() => handleProductSelect(product._id)}
                  className={`
                cursor-pointer rounded-xl transition-all duration-300 p-4 border shadow-lg
                ${
                  selected
                    ? "bg-[#cb6ce6]/20 border-purple-400 shadow-purple-800"
                    : "bg-white/10 border-white/20 hover:bg-white/20"
                }
                hover:-translate-y-1
              `}
                >
                  <label className="cursor-pointer flex flex-col">
                    {/* Image */}
                    <div className="relative w-full h-36 mb-3 rounded-md overflow-hidden">
                      <img
                        src={getImageSrc(product.images?.[0] || "")}
                        alt={product.title}
                        className="object-cover w-full h-full rounded-md"
                      />
                    </div>

                    {/* Checkbox + Title */}
                    <div className="flex items-center gap-2 mb-1">
                      <input
                        type="checkbox"
                        checked={selected}
                        onChange={() => handleProductSelect(product._id)}
                        className="w-4 h-4 accent-purple-500"
                      />
                      <h3 className="text-lg font-bold text-white">
                        {product.title}
                      </h3>
                    </div>

                    <p className="text-purple-200 text-sm">
                      {product.description}
                    </p>
                    <p className="text-xs text-gray-300 mt-1">
                      Owner: {product.owner.username}
                    </p>
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Submit Button */}
      {!loading && !error && myProducts.length > 0 && !barterInitiated && (
        <button
          onClick={handleInitiateBarter}
          disabled={!selectedProductToOffer || loading}
          className={`
        mt-8 py-3 px-6 rounded-md font-bold text-lg transition-all duration-300
        ${
          !selectedProductToOffer || loading
            ? "bg-gray-500 cursor-not-allowed text-gray-300"
            : "bg-purple-600 hover:bg-purple-500 text-white shadow-lg hover:shadow-purple-900"
        }
      `}
        >
          {loading ? "Initiating..." : "Initiate Barter"}
        </button>
      )}
    </div>
  );
}
