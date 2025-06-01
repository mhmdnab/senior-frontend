"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { getImageSrc } from "@/lib/getImageSrc";

type Product = {
  _id: string;
  title: string;
  images: string[];
  description: string;
};
type User = {
  _id: string;
  username: string;
  email: string;
};
type Barter = {
  _id: string;
  status: string;
  productOfferedId: Product;
  productRequestedId: Product;
  offeredBy: User;
  requestedFrom: User;
};

export default function RespondBarterPage() {
  const API_BASE = "https://dakesh-backend.onrender.com";
  const router = useRouter();
  const searchParams = useSearchParams();
  const barterId = searchParams.get("barterId");

  const [barter, setBarter] = useState<Barter | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [decision, setDecision] = useState<null | "approved" | "declined">(
    null
  );

  useEffect(() => {
    if (!barterId) {
      setError("Missing barter request.");
      setLoading(false);
      return;
    }
    axios
      .get<Barter>(`${API_BASE}/api/barter/${barterId}`, {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` },
      })
      .then((res) => setBarter(res.data))
      .catch(() => setError("Failed to fetch barter."))
      .finally(() => setLoading(false));
  }, [barterId]);

  const handleDecision = async (decisionType: "approved" | "declined") => {
    setLoading(true);

    if (!barterId) {
      console.error("barterId is missing");
      setError("Cannot update: missing barter ID.");
      setLoading(false);
      return;
    }

    // 1) Endpoint must match your Express route exactly:
    const url = `${API_BASE}/api/barter/${barterId}/decision`;
    console.log("PATCHing to:", url);

    // 2) Body must have { decision: "approved" } or { decision: "declined" }
    const payload = { decision: decisionType };
    console.log("Payload:", payload);

    // 3) Include the Bearer token if this route is protected by auth middleware:
    const token = Cookies.get("token");
    console.log("Using token:", token);

    try {
      const response = await axios.patch(url, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log("PATCH response data:", response.data);
      // If the server saved the decision successfully, update UI state:
      setDecision(decisionType);
    } catch (err: any) {
      if (err.response) {
        // The server returned 4xx or 5xx—log status + body for debugging
        console.error("PATCH /barter/:id/decision failed:", {
          status: err.response.status,
          data: err.response.data,
        });
      } else {
        // Network or other error
        console.error("PATCH error:", err.message);
      }
      setError("Failed to update barter status.");
    }

    setLoading(false);
  };

  if (loading)
    return (
      <div className="text-white min-h-screen bg-gradient-to-tr from-[#522c5d] to-[#232323] px-4 py-12">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="text-red-500 min-h-screen bg-gradient-to-tr from-[#522c5d] to-[#232323] px-4 py-12">
        {error}
      </div>
    );
  if (!barter) return <div>Barter not found.</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#522c5d] to-[#232323] px-4 py-12">
      {/* 2. Card itself: max width, softer purple, rounded corners, gentle shadow */}
      <div className="w-full max-w-md bg-[#5d4969] rounded-2xl shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-purple-100 text-center">
          Barter Request
        </h1>

        {/* Requested Product */}
        <div className="mb-6 border-b border-purple-400/50 pb-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-100">
            You own this product:
          </h2>
          <div className="flex items-start gap-4">
            {barter.productRequestedId?.images?.[0] && (
              <img
                src={getImageSrc(barter.productRequestedId.images[0])}
                alt={barter.productRequestedId.title}
                className="w-24 h-24 object-cover rounded-lg border border-purple-300/40"
              />
            )}
            <div className="flex-1">
              <h3 className="font-medium text-gray-100">
                {barter.productRequestedId?.title}
              </h3>
              <p className="text-gray-300 text-sm mt-1">
                {barter.productRequestedId?.description}
              </p>
            </div>
          </div>
        </div>

        {/* Offered Product */}
        <div className="mb-6 border-b border-purple-400/50 pb-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-100">
            They offer you:
          </h2>
          <div className="flex items-start gap-4">
            {barter.productOfferedId?.images?.[0] && (
              <img
                src={
                  barter.productOfferedId.images[0].startsWith("http")
                    ? barter.productOfferedId.images[0]
                    : `${
                        process.env.NEXT_PUBLIC_API_BASE ||
                        "https://dakesh-backend.onrender.com"
                      }${barter.productOfferedId.images[0]}`
                }
                alt={barter.productOfferedId.title}
                className="w-24 h-24 object-cover rounded-lg border border-purple-300/40"
              />
            )}
            <div className="flex-1">
              <h3 className="font-medium text-gray-100">
                {barter.productOfferedId?.title}
              </h3>
              <p className="text-gray-300 text-sm mt-1">
                {barter.productOfferedId?.description}
              </p>
              <p className="text-xs text-gray-400 mt-2">
                Offered by:{" "}
                <span className="font-medium text-purple-200">
                  {barter.offeredBy?.username}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Approved/Decline Buttons or Result Text */}
        {decision ? (
          <div className="mt-4 text-center">
            <span className="inline-block px-4 py-2 bg-purple-700/60 text-gray-100 font-semibold rounded-lg">
              Barter {decision === "approved" ? "is approved" : "is declined"}
            </span>
          </div>
        ) : (
          <div className="flex gap-4 mt-4 justify-center">
            <button
              className="bg-green-600 hover:bg-green-700 transition-colors text-white px-5 py-2 rounded-lg font-medium"
              onClick={() => handleDecision("approved")}
            >
              Approve
            </button>
            <button
              className="bg-red-600 hover:bg-red-700 transition-colors text-white px-5 py-2 rounded-lg font-medium"
              onClick={() => handleDecision("declined")}
            >
              Decline
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
