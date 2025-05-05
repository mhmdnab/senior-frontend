"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie"; // Need to import Cookies here
import Image from "next/image";

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
          "http://localhost:5000/api/products" // <-- Call the GET ALL endpoint
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
    <div className="p-6 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">My Products</h1>

      {/* Display messages based on state */}
      {loading && <p>Loading products...</p>}

      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && products.length === 0 && (
        <p>You haven’t added any products yet.</p>
      )}

      {!loading && !error && products.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="p-4 border rounded shadow bg-white"
            >
              {/* Product Image */}
              {product.images && (
                <Image
                  src={product.images[0]}
                  alt={product.title}
                  width={100}
                  height={100}
                  className="w-full h-48 object-cover rounded mb-4"
                />
              )}
              {/* Product Title */}
              <h2 className="text-lg font-semibold">{product.title}</h2>
              {/* Product Description */}
              <p className="text-sm text-gray-600">{product.description}</p>
              {/* Optional Owner Display */}
              {/* <p className="text-xs text-gray-400">Owner: {product.owner?.username}</p> */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyProductsPage;
