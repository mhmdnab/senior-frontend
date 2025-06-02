"use client";
import { User, Box, LogOut, Activity, Users } from "lucide-react";
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
    <div className="min-h-screen bg-gradient-to-br from-[#522c5d] via-[#232323] to-[#522c5d] flex flex-col md:flex-row">
      {/** Mobile header (only visible <md) **/}
      <header className="w-full flex md:hidden items-center justify-between px-4 py-3 bg-[#29162e]/80 border-b border-gray-800">
        {/* avatar + logout icon */}
        <div className="flex items-center gap-2">
          <div className="bg-purple-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold shadow-lg">
            {adminName.charAt(0).toUpperCase()}
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-200">Welcome,</span>
            <span className="text-purple-400 font-semibold">{adminName}</span>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1 text-red-500 hover:text-red-400"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </header>

      {/** Sidebar (hidden on mobile) **/}
      <aside className="hidden md:flex flex-col w-60 bg-[#29162e]/80 border-r border-gray-800 p-6 gap-8">
        {/* … your existing sidebar content … */}
      </aside>

      {/** Main content (always full width) **/}
      <main className="w-full flex-1 flex flex-col items-center justify-start p-4 md:p-6">
        {/** If you want to center‐limit the cards/table, wrap them further inside a max-w: **/}
        <div className="w-full max-w-4xl">
          {/** Action buttons **/}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Link href="/admin/users" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto rounded-2xl bg-[#cb6ce6] px-6 py-3 text-white font-semibold shadow-xl hover:bg-purple-700 transition transform hover:scale-105">
                <div className="flex items-center gap-2">
                  <Users className="w-6 h-6" /> Manage Users
                </div>
              </button>
            </Link>
            <Link href="/admin/products" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto rounded-2xl bg-[#cb6ce6] px-6 py-3 text-white font-semibold shadow-xl hover:bg-purple-700 transition transform hover:scale-105">
                <div className="flex items-center gap-2">
                  <Box className="w-6 h-6" /> Manage Products
                </div>
              </button>
            </Link>
          </div>

          {/** Stats row **/}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            <div className="bg-[#3e2246]/80 rounded-xl p-6 flex flex-col items-center shadow-2xl border border-purple-400 hover:scale-105 transition-all duration-200">
              <Users className="w-8 h-8 text-purple-400 mb-2" />
              <span className="text-2xl font-bold text-white">
                {stats.users}
              </span>
              <span className="text-gray-400">Total Users</span>
            </div>
            <div className="bg-[#3e2246]/80 rounded-xl p-6 flex flex-col items-center shadow-2xl border border-purple-400 hover:scale-105 transition-all duration-200">
              <Box className="w-8 h-8 text-purple-400 mb-2" />
              <span className="text-2xl font-bold text-white">
                {stats.products}
              </span>
              <span className="text-gray-400">Products</span>
            </div>
            <div className="bg-[#3e2246]/80 rounded-xl p-6 flex flex-col items-center shadow-2xl border border-purple-400 hover:scale-105 transition-all duration-200">
              <Activity className="w-8 h-8 text-purple-400 mb-2" />
              <span className="text-2xl font-bold text-white">
                {stats.barters}
              </span>
              <span className="text-gray-400">Active Barters</span>
            </div>
          </div>

          {/** Recent Barters table **/}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-purple-300 mb-4">
              Recent Barters
            </h2>
            <div className="overflow-x-auto rounded-xl shadow-lg bg-[#29162e]/80">
              <table className="min-w-full text-left text-gray-100 text-base">
                <thead className="bg-[#2f1a3b]">
                  <tr>
                    <th className="px-3 py-2 text-sm font-semibold text-purple-200">
                      Barter ID
                    </th>
                    <th className="px-3 py-2 text-sm font-semibold text-purple-200">
                      Offered By
                    </th>
                    <th className="px-3 py-2 text-sm font-semibold text-purple-200">
                      Offered Product
                    </th>
                    <th className="px-3 py-2 text-sm font-semibold text-purple-200">
                      Requested From
                    </th>
                    <th className="px-3 py-2 text-sm font-semibold text-purple-200">
                      Requested Product
                    </th>
                    <th className="px-3 py-2 text-sm font-semibold text-purple-200">
                      Status
                    </th>
                    <th className="px-3 py-2 text-sm font-semibold text-purple-200">
                      Created At
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {barters.length === 0 ? (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-3 py-4 text-center text-gray-400 text-base"
                      >
                        No barters found.
                      </td>
                    </tr>
                  ) : (
                    barters.map((barter) => (
                      <tr key={barter._id} className="border-t border-gray-700">
                        <td className="px-3 py-2">{barter._id}</td>
                        <td className="px-3 py-2">
                          {barter.offeredBy?.username || "-"}
                        </td>
                        <td className="px-3 py-2">
                          {barter.productOfferedId?.title || "-"}
                        </td>
                        <td className="px-3 py-2">
                          {barter.requestedFrom?.username || "-"}
                        </td>
                        <td className="px-3 py-2">
                          {barter.productRequestedId?.title || "-"}
                        </td>
                        <td className="px-3 py-2">
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
                        <td className="px-3 py-2">
                          {new Date(barter.createdAt).toLocaleString()}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
