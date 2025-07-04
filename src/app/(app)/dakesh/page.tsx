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
    <div className="p-6 w-full mx-auto bg-gradient-to-tr from-[#522c5d] to-[#232323]">
      <h1 className="text-2xl font-bold mb-4 text-white">Initiate Barter</h1>

      {productIdToBarterFor && (
        <p className="mb-4 text-white">
          You are offering a product to barter for the product:{" "}
          <span className="font-semibold">{productIdToBarterFor}</span>
        </p>
      )}

      {barterInitiated && otherUserEmail && (
        <div className="mt-6 p-4 bg-green-100 border border-green-400 text-green-800 rounded shadow-lg">
          <h3 className="text-xl font-semibold mb-2">
            Barter Request Initiated!
          </h3>
          <p className="mb-3">
            The owner of the product you want has been notified.
          </p>
          <p>You can contact them directly:</p>
          <p className="font-bold text-lg">Email: {otherUserEmail}</p>
          <div className="mt-4 flex gap-3">
            <button
              onClick={() => setBarterInitiated(false)}
              className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-md transition"
            >
              Close
            </button>
            <button
              onClick={handleGoHome}
              className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-md transition"
            >
              Go to Homepage
            </button>
          </div>
        </div>
      )}

      {loading && <p className="text-white">Loading your products...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && targetProduct && myProducts.length === 0 && (
        <p className="text-[#f58d33]">
          You have no products in the same category (
          <span className="font-semibold">{targetProduct.category}</span>) to
          offer.
        </p>
      )}

      {!loading && !error && myProducts.length > 0 && !barterInitiated && (
        <div className="mt-6">
          <h2 className="text-xl text-white font-semibold mb-3">
            Choose one of your products (Category:{" "}
            <span className="font-medium">{targetProduct?.category}</span>)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {myProducts.map((product) => (
              <div
                key={product._id}
                className={`p-4 border rounded shadow cursor-pointer transition-transform transform hover:scale-105 ${
                  selectedProductToOffer === product._id
                    ? "bg-green-200 border-green-500"
                    : "bg-white hover:border-gray-300"
                }`}
                onClick={() => handleProductSelect(product._id)}
              >
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedProductToOffer === product._id}
                    onChange={() => handleProductSelect(product._id)}
                    className="mr-2"
                  />
                  <div>
                    <div className="relative w-full h-32 mb-2 bg-gray-100">
                      <img
                        src={getImageSrc(product.images?.[0] || "")}
                        alt={product.title}
                        className="rounded object-cover w-full h-full"
                      />
                    </div>
                    <h3 className="text-lg font-semibold">{product.title}</h3>
                    <p className="text-sm text-gray-600">
                      {product.description}
                    </p>
                    <p className="text-xs text-gray-400">
                      Owner: {product.owner.username}
                    </p>
                  </div>
                </label>
              </div>
            ))}
          </div>
        </div>
      )}

      {!loading && !error && myProducts.length > 0 && !barterInitiated && (
        <button
          onClick={handleInitiateBarter}
          disabled={!selectedProductToOffer || loading}
          className={`mt-6 py-2 px-6 rounded-md font-bold transition-colors duration-300 ${
            !selectedProductToOffer || loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-700 text-white"
          }`}
        >
          {loading ? "Initiating..." : "Initiate Barter"}
        </button>
      )}
    </div>
  );
}
