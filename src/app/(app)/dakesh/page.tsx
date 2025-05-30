"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";

// Product/User Types
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
type User = {
  _id: string;
  username: string;
  email: string;
};

const getLoggedInUsername = () => Cookies.get("username");

// Safe image URL builder
const getImageUrl = (img?: string) => {
  if (!img) return "/placeholder.svg";
  if (img.startsWith("http")) return img;
  return `${
    process.env.NEXT_PUBLIC_API_BASE || "https://dakesh-backend.onrender.com"
  }${img}`;
};

const DakeshPage = () => {
  const API_BASE =
    process.env.NEXT_PUBLIC_API_BASE || "https://dakesh-backend.onrender.com";
  const router = useRouter();
  const searchParams = useSearchParams();

  const productIdToBarterFor = searchParams.get("productIdToBarterFor");

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

  useEffect(() => {
    if (!productIdToBarterFor) {
      setError("No target product specified for barter.");
      setLoading(false);
      return;
    }

    const loggedInUsername = getLoggedInUsername();

    if (!loggedInUsername) {
      setError("Please log in to initiate a barter.");
      setLoading(false);
      return;
    }

    const fetchAllProductsAndFilter = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await axios.get(`${API_BASE}/api/products/`, {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
          withCredentials: true,
        });
        const allProducts: Product[] = res.data;

        const userProducts = allProducts.filter(
          (product) =>
            product.owner && product.owner.username === loggedInUsername
        );
        setMyProducts(userProducts);
      } catch (err: any) {
        setError("Failed to load your products to offer.");
        setMyProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAllProductsAndFilter();
    // eslint-disable-next-line
  }, [productIdToBarterFor]);

  // Handle selection
  const handleProductSelect = (productId: string) => {
    setSelectedProductToOffer(
      productId === selectedProductToOffer ? null : productId
    );
  };

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

      // Only initiate barter
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

      if (res.data && res.data.otherUserEmail) {
        setOtherUserEmail(res.data.otherUserEmail);
        setBarterInitiated(true);
        setSelectedProductToOffer(null);
      } else {
        setError("Backend did not return the other user's email.");
      }
    } catch (err: any) {
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

      {!loading && !error && myProducts.length === 0 && (
        <p className="text-[#f58d33]">
          You have no products available to offer for barter.
        </p>
      )}

      {!loading && !error && myProducts.length > 0 && !barterInitiated && (
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
                    <div className="relative w-full h-32 mb-2">
                      <img
                        src={getImageUrl(product.images?.[0])}
                        alt={product.title}
                        className="rounded object-cover w-full h-full"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
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
    </div>
  );
};

export default DakeshPage;
