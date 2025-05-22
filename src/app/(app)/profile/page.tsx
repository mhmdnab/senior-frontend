"use client";
import type React from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { LogOut, Plus } from "lucide-react"; // <-- Added Plus icon
import axios from "axios";
import Link from "next/link";
type Product = {
  _id: string;
  title: string;
  description: string;
  images: string[];
  owner: {
    _id: string;
    username: string;
  };
  category: string;
};
export default function ProfilePage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        // Assuming you need to send auth token with your request
        const token = Cookies.get("token");

        const response = await axios.get<Product[]>(
          "http://localhost:5001/api/products/my-products",
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
            },
          }
        );

        setProducts(response.data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  const [formData, setFormData] = useState({
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const token = Cookies.get("token");

      const response = await axios.put(
        "http://localhost:5001/api/users/update-password",
        {
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        },
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );

      if (response.status === 200) {
        alert("Password updated successfully.");
        setFormData((prev) => ({
          ...prev,
          password: "",
          confirmPassword: "",
        }));
      }
    } catch (err: any) {
      console.error("Error updating password:", err);
      alert(err.response?.data?.message || "Failed to update password.");
    }
  };

  const handleLogout = () => {
    // Remove the auth token cookie
    Cookies.remove("token");
    Cookies.remove("username");
    Cookies.remove("role");
    console.log("Logged out.");
    router.push("/");
  };

  const handleAddProduct = () => {
    router.push("/add-product");
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#522c5d] to-[#232323] text-gray-100">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-12 gap-6">
          <h1 className="text-4xl font-bold tracking-wide">My Profile</h1>
          <div className="flex gap-4">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 border border-gray-700 text-gray-300 hover:bg-gray-800 px-5 py-2 rounded-md transition"
            >
              <LogOut className="h-5 w-5" />
              Log Out
            </button>
            <Link href="/admin/dashboard">
              <button className="px-8 py-3 bg-[#cb6ce6] text-white rounded-lg text-lg font-semibold hover:bg-[#89499b] transition duration-300">
                Admin?
              </button>
            </Link>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Form Section */}
          <div className="lg:col-span-1 bg-gray-900 bg-opacity-30 rounded-lg p-6 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-gray-600 text-gray-100 placeholder-gray-400 focus:border-purple-400 focus:outline-none py-3 px-0"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Change Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-gray-600 text-gray-100 placeholder-gray-400 focus:border-purple-400 focus:outline-none py-3 px-0"
                  placeholder="New password"
                />
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-gray-600 text-gray-100 placeholder-gray-400 focus:border-purple-400 focus:outline-none py-3 px-0"
                  placeholder="Confirm new password"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-purple-700 hover:bg-purple-600 text-white py-3 rounded-md font-semibold transition"
              >
                Save Changes
              </button>
            </form>
          </div>

          {/* Products Section */}
          <div className="lg:col-span-2 bg-gray-900 bg-opacity-30 rounded-lg p-6 shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={handleAddProduct}
                className="flex items-center gap-2 bg-purple-700 hover:bg-purple-600 text-white py-2 px-5 rounded-md font-semibold transition"
              >
                <Plus className="h-6 w-6" />
                Add Product
              </button>
            </div>

            {loading && <p>Loading products...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {products.length === 0 && !loading && (
              <p className="text-gray-400">You don't have any products yet.</p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {products.map((product) => (
                <Link
                  key={product._id}
                  href={`/products/${product._id}`}
                  className="bg-gray-800 p-3 rounded-md shadow hover:shadow-lg transition max-w-xs mx-auto block"
                >
                  {product.images && product.images.length > 0 && (
                    <div className="mb-3 w-full h-32 relative rounded-md overflow-hidden">
                      <Image
                        src={product.images[0]}
                        alt={product.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <h3
                    className="text-lg font-semibold mb-1 truncate"
                    title={product.title}
                  >
                    {product.title}
                  </h3>
                  {product.description && (
                    <p className="text-gray-400 text-sm line-clamp-3">
                      {product.description}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
