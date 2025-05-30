"use client";
import { Box, LogOut, Activity, Users } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";

type Barter = {
  _id: string;
  offeredBy?: { username?: string };
  requestedFrom?: { username?: string };
  productOfferedId?: { title?: string };
  productRequestedId?: { title?: string };
  status: "pending" | "approved" | "declined" | string;
  createdAt: string;
};

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "https://dakesh-backend.onrender.com";

export default function Dashboard() {
  const router = useRouter();
  const { logout } = useAuth();
  const [adminName, setAdminName] = useState("Admin");
  const [stats, setStats] = useState({
    users: 0,
    products: 0,
    barters: 0,
  });
  const [barters, setBarters] = useState<Barter[]>([]);

  useEffect(() => {
    const nameFromCookie = Cookies.get("username");
    if (nameFromCookie) setAdminName(nameFromCookie);

    // Fetch stats
    async function fetchStats() {
      try {
        const token = Cookies.get("token");
        const res = await fetch(`${API_BASE}/api/admin/stats`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) return;
        const data = await res.json();
        setStats({
          users: data.users,
          products: data.products,
          barters: data.barters,
        });
      } catch (err) {
        console.error("Error fetching stats", err);
      }
    }

    // Fetch barters
    async function fetchBarters() {
      try {
        const token = Cookies.get("token");
        const res = await fetch(`${API_BASE}/api/admin/barters`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) return;
        const data = await res.json();
        setBarters(data);
      } catch (err) {
        console.error("Error fetching barters", err);
      }
    }

    fetchStats();
    fetchBarters();
  }, []);

  const handleLogout = () => {
    logout();
    Cookies.remove("username");
    Cookies.remove("role");
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#522c5d] via-[#232323] to-[#522c5d] flex">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-60 bg-[#29162e]/80 border-r border-gray-800 p-6 gap-8">
        <div className="flex items-center gap-3 mb-10">
          <div className="bg-purple-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold shadow-lg">
            {adminName?.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="text-lg font-semibold text-gray-200">Welcome,</div>
            <div className="text-purple-400 font-bold">{adminName}</div>
          </div>
        </div>
        <nav className="flex flex-col gap-2">
          <Link
            href="/admin/users"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-[#522c5d]/60 transition text-gray-200 font-medium"
          >
            <Users className="w-5 h-5 text-purple-400" /> Users
          </Link>
          <Link
            href="/admin/products"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-[#522c5d]/60 transition text-gray-200 font-medium"
          >
            <Box className="w-5 h-5 text-purple-400" /> Products
          </Link>
        </nav>
        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 transition rounded-lg px-6 py-2 text-white font-semibold text-sm shadow-lg"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        {/* Stats row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12 w-full max-w-4xl">
          <div className="bg-[#3e2246]/80 rounded-xl p-6 flex flex-col items-center shadow-2xl border border-purple-400 hover:scale-105 transition-all duration-200">
            <Users className="w-8 h-8 text-purple-400 mb-2" />
            <span className="text-2xl font-bold text-white">{stats.users}</span>
            <span className="text-gray-400 text-sm text-center">
              Total Users
            </span>
          </div>
          <div className="bg-[#3e2246]/80 rounded-xl p-6 flex flex-col items-center shadow-2xl border border-purple-400 hover:scale-105 transition-all duration-200">
            <Box className="w-8 h-8 text-purple-400 mb-2" />
            <span className="text-2xl font-bold text-white">
              {stats.products}
            </span>
            <span className="text-gray-400 text-sm text-center">Products</span>
          </div>
          <div className="bg-[#3e2246]/80 rounded-xl p-6 flex flex-col items-center shadow-2xl border border-purple-400 hover:scale-105 transition-all duration-200">
            <Activity className="w-8 h-8 text-purple-400 mb-2" />
            <span className="text-2xl font-bold text-white">
              {stats.barters}
            </span>
            <span className="text-gray-400 text-sm text-center">
              Active Barters
            </span>
          </div>
        </div>

        {/* Barters Table */}
        <section className="w-full max-w-5xl">
          <h2 className="text-2xl font-bold text-purple-300 mb-4 text-center sm:text-left">
            Recent Barters
          </h2>
          <div className="overflow-x-auto rounded-xl shadow-lg">
            <table className="min-w-full bg-[#29162e]/80 text-gray-100 rounded-xl text-sm sm:text-base">
              <thead>
                <tr>
                  <th className="px-3 py-2 text-left font-semibold text-sm sm:text-base text-purple-200">
                    Barter ID
                  </th>
                  <th className="px-3 py-2 text-left font-semibold text-sm sm:text-base text-purple-200">
                    Offered By
                  </th>
                  <th className="hidden sm:table-cell px-3 py-2 text-left font-semibold text-base text-purple-200">
                    Offered Product
                  </th>
                  <th className="hidden md:table-cell px-3 py-2 text-left font-semibold text-base text-purple-200">
                    Requested From
                  </th>
                  <th className="hidden lg:table-cell px-3 py-2 text-left font-semibold text-base text-purple-200">
                    Requested Product
                  </th>
                  <th className="px-3 py-2 text-left font-semibold text-sm sm:text-base text-purple-200">
                    Status
                  </th>
                  <th className="hidden sm:table-cell px-3 py-2 text-left font-semibold text-base text-purple-200">
                    Created At
                  </th>
                </tr>
              </thead>
              <tbody>
                {barters.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-3 py-4 text-center text-gray-400"
                    >
                      No barters found.
                    </td>
                  </tr>
                ) : (
                  barters.map((barter) => (
                    <tr
                      key={barter._id}
                      className="border-t border-gray-700 hover:bg-[#29162e]/60"
                    >
                      <td className="px-3 py-2 text-sm sm:text-base">
                        {barter._id}
                      </td>
                      <td className="px-3 py-2 text-sm sm:text-base">
                        {barter.offeredBy?.username || "-"}
                      </td>
                      <td className="hidden sm:table-cell px-3 py-2">
                        {barter.productOfferedId?.title || "-"}
                      </td>
                      <td className="hidden md:table-cell px-3 py-2">
                        {barter.requestedFrom?.username || "-"}
                      </td>
                      <td className="hidden lg:table-cell px-3 py-2">
                        {barter.productRequestedId?.title || "-"}
                      </td>
                      <td className="px-3 py-2 text-sm sm:text-base">
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                            barter.status === "pending"
                              ? "bg-yellow-700 text-yellow-200"
                              : barter.status === "approved"
                              ? "bg-green-700 text-green-200"
                              : "bg-red-700 text-red-200"
                          }`}
                        >
                          {barter.status}
                        </span>
                      </td>
                      <td className="hidden sm:table-cell px-3 py-2 text-sm sm:text-base">
                        {new Date(barter.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
