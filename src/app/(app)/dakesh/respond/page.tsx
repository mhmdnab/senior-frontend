"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!barter) return <div>Barter not found.</div>;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow">
      <h1 className="text-xl font-bold mb-4">Barter Request</h1>

      {/* Requested Product */}
      <div className="mb-4 border-b pb-4">
        <h2 className="text-lg font-semibold mb-2">You own this product:</h2>
        <div className="flex items-center gap-4">
          {barter.productRequestedId?.images?.[0] && (
            <img
              src={
                barter.productRequestedId.images[0].startsWith("http")
                  ? barter.productRequestedId.images[0]
                  : `${
                      process.env.NEXT_PUBLIC_API_BASE ||
                      "https://dakesh-backend.onrender.com"
                    }${barter.productRequestedId.images[0]}`
              }
              alt={barter.productRequestedId.title}
              className="w-20 h-20 object-cover rounded"
            />
          )}
          <div>
            <div className="font-semibold">
              {barter.productRequestedId?.title}
            </div>
            <div className="text-gray-600 text-sm">
              {barter.productRequestedId?.description}
            </div>
          </div>
        </div>
      </div>

      {/* Offered Product */}
      <div className="mb-4 border-b pb-4">
        <h2 className="text-lg font-semibold mb-2">They offer you:</h2>
        <div className="flex items-center gap-4">
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
              className="w-20 h-20 object-cover rounded"
            />
          )}
          <div>
            <div className="font-semibold">
              {barter.productOfferedId?.title}
            </div>
            <div className="text-gray-600 text-sm">
              {barter.productOfferedId?.description}
            </div>
            <div className="text-xs text-gray-400 mt-1">
              Offered by: {barter.offeredBy?.username}
            </div>
          </div>
        </div>
      </div>

      {decision ? (
        <div className="mt-4 text-lg font-semibold text-center">
          Barter {decision === "approved" ? "approved ✅" : "declined ❌"}!
        </div>
      ) : (
        <div className="flex gap-2 mt-4 justify-center">
          <button
            className="bg-green-600 text-white px-4 py-2 rounded"
            onClick={() => handleDecision("approved")}
          >
            Approve
          </button>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded"
            onClick={() => handleDecision("declined")}
          >
            Decline
          </button>
        </div>
      )}
    </div>
  );
}
