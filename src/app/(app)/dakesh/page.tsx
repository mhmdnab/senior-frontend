// frontend/app/dakesh/page.tsx
"use client"; // This is a Client Component

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation"; // For navigation and query params
import axios from "axios"; // For making API calls
import Cookies from "js-cookie"; // For accessing cookies (like the username and token)
import Image from "next/image";

// Define your Product interface - must match the structure returned by backend GET /api/products
// Ensure owner is populated with at least _id and username
interface Product {
  _id: string;
  title: string;
  description: string;
  images: string[];
  category: string;
  owner: {
    // Crucially, includes owner with username for frontend filtering
    _id: string;
    username: string;
  };
  isAvailable: boolean;
  createdAt: string;
}

// Helper function to get the logged-in username from the cookie
const getLoggedInUsername = () => Cookies.get("username");

const DakeshPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams(); // Hook to read URL query parameters

  // --- State Variables ---
  // Get the ID of the product the user wants to barter FOR from the query params
  const productIdToBarterFor = searchParams.get("productIdToBarterFor");

  const [myProducts, setMyProducts] = useState<Product[]>([]); // Products owned by the logged-in user
  const [loading, setLoading] = useState(true); // Loading state for fetching products
  const [error, setError] = useState<string | null>(null); // Error state

  // State to hold the ID of the product the user selects to OFFER for barter
  const [selectedProductToOffer, setSelectedProductToOffer] = useState<
    string | null
  >(null);

  // State to manage the success popup and display the other user's email
  const [barterInitiated, setBarterInitiated] = useState(false);
  const [otherUserEmail, setOtherUserEmail] = useState<string | null>(null);
  // --- End State Variables ---

  // --- Effect to Fetch User's Products ---
  useEffect(() => {
    // --- 1. Validate Target Product ID ---
    // If productIdToBarterFor is missing, the user didn't come from a product page.
    // Redirect them or show an error.
    if (!productIdToBarterFor) {
      setError("No target product specified for barter.");
      setLoading(false);
      // Optionally redirect after a delay
      // setTimeout(() => router.push('/products'), 3000);
      return; // Stop execution
    }

    // --- 2. Get Logged-in User Username ---
    const loggedInUsername = getLoggedInUsername();

    if (!loggedInUsername) {
      // Handle case where user is not logged in (e.g., redirect to login page)
      console.warn(
        "User not logged in or username cookie not found for Dakesh page."
      );
      setError("Please log in to initiate a barter.");
      setLoading(false);
      // Example redirect: Redirect to login, and after login, come back here
      // router.push(`/login?callbackUrl=/dakesh?productIdToBarterFor=${productIdToBarterFor}`);
      return; // Stop execution
    }
    console.log(
      "Dakesh Page: Logged-in username from cookie:",
      loggedInUsername
    ); // Debug log

    // --- 3. Fetch All Products and Filter ---
    const fetchAllProductsAndFilter = async () => {
      try {
        setLoading(true);
        setError(null); // Clear previous errors

        // Call the backend endpoint that returns ALL products
        // Ensure this endpoint is accessible and returns products with populated owner.username
        const res = await axios.get("http://localhost:5001/api/products/", {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
          withCredentials: true,
        });
        const allProducts: Product[] = res.data; // Cast response data to Product array

        console.log("Dakesh Page: Fetched total products:", allProducts.length); // Debug log

        // Filter the products client-side to find only those owned by the logged-in user
        const userProducts = allProducts.filter(
          (product) =>
            // Check if product.owner exists and if its username matches the logged-in username
            product.owner && product.owner.username === loggedInUsername
        );

        console.log(
          "Dakesh Page: Filtered products for user:",
          userProducts.length
        ); // Debug log

        setMyProducts(userProducts); // Update state with the filtered list
      } catch (err: any) {
        console.error(
          "Dakesh Page: Error fetching all products for filtering:",
          err.response?.data || err
        );
        setError("Failed to load your products to offer.");
        setMyProducts([]); // Clear products on error
      } finally {
        setLoading(false); // Set loading to false
      }
    };

    fetchAllProductsAndFilter(); // Execute the fetch and filter logic

    // Dependencies: Re-run effect if the target product ID changes
    // If loggedInUsername could change during the component's life (less common if from cookie), add it here too
  }, [productIdToBarterFor]);
  // --- End Fetch Effect ---

  // --- Handle Product Selection (Checkbox) ---
  const handleProductSelect = (productId: string) => {
    // This toggles the selection: if already selected, deselect; otherwise, select this one
    setSelectedProductToOffer(
      productId === selectedProductToOffer ? null : productId
    );
  };
  // --- End Handle Product Selection ---

  // --- Handle Initiate Barter Button Click ---
  const handleInitiateBarter = async () => {
    if (!productIdToBarterFor) {
      setError("Internal error: Target product ID is missing.");
      return;
    }
    if (!selectedProductToOffer) {
      setError("Please select one of your products to offer for barter.");
      return;
    }

    const token = Cookies.get("token"); // Get token for backend authentication

    if (!token) {
      setError("Authentication token missing. Please log in again.");
      return;
    }
    console.log(
      "Dakesh Page: Initiating barter with token:",
      token ? "Token Found" : "No Token"
    ); // Debug log

    try {
      const res = await axios.post(
        "http://localhost:5001/api/barter/initiate", // <-- CALL THE NEW BACKEND ENDPOINT
        {
          productIdToBarterFor: productIdToBarterFor, // ID of the product the user wants
          productOfferedId: selectedProductToOffer, // ID of the product the user is offering
        },
        {
          // Configuration object for axios post
          headers: {
            Authorization: `Bearer ${token}`, // Include the authentication token
            // "Content-Type": "application/json", // Specify content type
          },
        }
      );

      console.log("Dakesh Page: Barter Initiation Response:", res.data); // Debug log

      if (res.data && res.data.otherUserEmail) {
        setOtherUserEmail(res.data.otherUserEmail); // Store the other user's email
        setBarterInitiated(true);
        setSelectedProductToOffer(null);
      } else {
        setError("Backend did not return the other user's email.");
      }
    } catch (err: any) {
      console.error(
        "Dakesh Page: Error initiating barter:",
        err.response?.data || err
      );
      setError(
        err.response?.data?.message || "Failed to initiate barter request."
      );
    } finally {
      setLoading(false); // Reset loading state
    }
  };
  // --- End Handle Initiate Barter ---

  // --- Render Logic ---
  return (
    <div className="p-6 w-full mx-auto bg-gradient-to-tr from-[#522c5d] to-[#232323]">
      <h1 className="text-2xl font-bold mb-4">Initiate Barter</h1>

      {productIdToBarterFor && (
        <p className="mb-4 text-white">
          You are offering a product to barter for product:
          <span className="font-semibold">{productIdToBarterFor}</span>
        </p>
      )}

      {loading && <p className="text-white">Loading your products...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && myProducts.length === 0 && (
        <p className="text-[#f58d33]">
          You have no products available to offer for barter.
        </p>
      )}

      {!loading && !error && myProducts.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl text-white font-semibold mb-3">
            Choose one of your products to offer
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
                    {product.images && product.images.length > 0 && (
                      <div className="relative w-full h-32 mb-2">
                        <Image
                          src={product.images[0]}
                          alt={product.title}
                          layout="fill"
                          objectFit="cover"
                          className="rounded"
                        />
                      </div>
                    )}
                    <h3 className="text-lg font-semibold">{product.title}</h3>
                    <p className="text-sm text-gray-600">
                      {product.description}
                    </p>
                    <p className="text-xs text-gray-400">
                      Owner: {product.owner?.username}
                    </p>
                  </div>
                </label>
              </div>
            ))}
          </div>
        </div>
      )}

      {!loading && !error && myProducts.length > 0 && (
        <button
          onClick={handleInitiateBarter}
          disabled={!selectedProductToOffer || !!error || loading}
          className={`mt-6 py-2 px-6 rounded-md font-bold transition-colors duration-300 ${
            !selectedProductToOffer || !!error || loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-700 text-white"
          }`}
        >
          {loading ? "Initiating..." : "Initiate Barter"}
        </button>
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
          <button onClick={() => setBarterInitiated(false)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default DakeshPage;
