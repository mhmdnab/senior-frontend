"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie"; // Need to import Cookies here
import Image from "next/image";
import { getImageSrc } from "@/lib/getImageSrc";

interface Product {
  _id: string; // Changed to string
  title: string;
  description: string;
  images: string[]; // Changed to array
  category: string; // Added
  owner: {
    // Crucially includes owner with username
    _id: string;
    username: string;
  };
  isAvailable: boolean; // Added
  createdAt: string; // Added
}

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "https://dakesh-backend.onrender.com";

const MyProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllProductsAndFilter = async () => {
      try {
        setLoading(true);
        setError(null);

        // --- Get the username from the cookie ---
        const loggedInUsername = Cookies.get("username");

        if (!loggedInUsername) {
          console.warn("User not logged in or username cookie not found.");
          setError("Please log in to view your products."); // Inform user
          setProducts([]);
          setLoading(false);
          return; // Stop execution if no username
        }
        console.log("Logged-in username from cookie:", loggedInUsername); // Log the username

        // --- Fetch ALL products ---
        const res = await axios.get(
          `${API_BASE}/api/products` // <-- Call the GET ALL endpoint
          // No Authorization header needed here if the endpoint is public
        );

        const allProducts: Product[] = res.data;

        // --- Filter products by logged-in user's username ---
        console.log("Fetched total products:", allProducts.length); // Log total fetched
        const userProducts = allProducts.filter(
          (product) =>
            // Check if product.owner exists and its username matches the loggedInUsername from cookie
            product.owner && product.owner.username === loggedInUsername
        );
        console.log("Filtered products for user:", userProducts.length); // Log filtered count

        setProducts(userProducts); // Set state with the FILTERED products
      } catch (err: any) {
        console.error("Error fetching all products for filtering:", err);
        setError("Failed to load products.");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAllProductsAndFilter();
    // No dependencies needed unless username can change during component lifetime
  }, []); // Empty dependencies array means this runs once on mount

  return (
    <div className="relative min-h-screen bg-[#141018] text-slate-100 px-6 py-12 overflow-hidden">
      <div className="absolute inset-0 opacity-80 bg-[radial-gradient(circle_at_20%_20%,rgba(203,108,230,0.22),transparent_30%),radial-gradient(circle_at_80%_0,rgba(137,73,155,0.2),transparent_28%),radial-gradient(circle_at_60%_80%,rgba(255,255,255,0.06),transparent_32%)]" />
      <div className="absolute -bottom-32 -right-24 w-80 h-80 bg-[#cb6ce6]/15 blur-3xl rounded-full" />
      <div className="absolute -top-24 -left-16 w-64 h-64 bg-[#89499b]/15 blur-3xl rounded-full" />
      <div className="relative">
        <div className="flex flex-col gap-2 mb-8">
          <p className="text-sm uppercase tracking-[0.35em] text-[#f7d7ff]/80">
            Listings
          </p>
          <h1 className="text-3xl font-bold">My Products</h1>
        </div>

        {/* Display messages */}
        {loading && <p className="text-slate-300">Loading products...</p>}
        {error && <p className="text-[#f7d7ff]">{error}</p>}
        {!loading && !error && products.length === 0 && (
          <p className="text-slate-300">You haven’t added any products yet.</p>
        )}

        {/* Product Grid */}
        {!loading && !error && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product._id}
                className="group bg-white/5 rounded-xl shadow-lg shadow-[#cb6ce6]/20 border border-white/10 hover:shadow-[#cb6ce6]/30 transition-all duration-300 overflow-hidden"
              >
                {/* Product Image */}
                {product.images && (
                  <div className="w-full h-48 overflow-hidden">
                    <Image
                      src={getImageSrc(product.images?.[0])}
                      alt={product.title}
                      width={300}
                      height={300}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                )}

                {/* Card Content */}
                <div className="p-5 space-y-2">
                  <h2 className="text-lg font-semibold text-white mb-1 line-clamp-1">
                    {product.title}
                  </h2>

                  <p className="text-sm text-slate-200/80 line-clamp-2">
                    {product.description}
                  </p>

                  {/* Divider + Optional Button or Future Section */}
                  <div className="mt-3 border-t border-white/10 pt-3 flex justify-between items-center">
                    <p className="text-xs text-slate-300/80">
                      {product.category}
                    </p>

                    <button className="text-sm font-semibold text-[#f7d7ff] hover:text-white underline underline-offset-4">
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProductsPage;
