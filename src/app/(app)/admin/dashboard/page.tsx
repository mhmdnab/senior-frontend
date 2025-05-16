"use client";
import { User, Box, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function Dashboard() {
  const router = useRouter();

  const handleLogout = () => {
    // Remove the auth token cookie
    Cookies.remove("token");
    Cookies.remove("username");
    Cookies.remove("role");
    console.log("Logged out.");
    router.push("/");
  };
  return (
    <div className="h-screen bg-gradient-to-br from-[#522c5d] via-[#232323] to-[#522c5d] flex items-center justify-center px-4">
      <div className="bg-[#3e2246] backdrop-blur-md rounded-2xl p-12 max-w-lg w-full text-center shadow-2xl border border-gray-700">
        <h1 className="text-4xl font-semibold text-purple-400 mb-4 tracking-wide">
          Welcome, Admin
        </h1>
        <p className="text-gray-300 text-lg mb-10 leading-relaxed">
          Manage users, products, and site settings from this dashboard.
        </p>

        <div className="flex justify-center gap-8 mb-8">
          <Link href="/admin/users" passHref>
            <button className="flex items-center gap-2.5 bg-[#cb6ce6] hover:bg-purple-700 transition rounded-lg px-6 py-3 text-white font-semibold text-base shadow-lg transform hover:scale-105 hover:shadow-xl">
              <User className="w-5 h-5" />
              Manage Users
            </button>
          </Link>
          <Link href="/admin/products" passHref>
            <button className="flex items-center gap-2.5 bg-[#cb6ce6] hover:bg-purple-700 transition rounded-lg px-6 py-3 text-white font-semibold text-base shadow-lg transform hover:scale-105 hover:shadow-xl">
              <Box className="w-5 h-5" />
              Manage Products
            </button>
          </Link>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 mx-auto bg-red-600 hover:bg-red-700 transition rounded-lg px-4 py-2 text-white font-semibold text-sm shadow-lg transform hover:scale-105 hover:shadow-xl"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </div>
  );
}
