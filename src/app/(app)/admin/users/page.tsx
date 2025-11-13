"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

type User = {
  _id: string;
  username: string;
  email: string;
  password: string;
  role: string;
};

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "https://dakesh-backend.onrender.com";

export default function Users() {
  const [users, setUsers] = useState<User[]>([]); // Specify the type of users

  const handleDelete = async (userId: string) => {
    try {
      const token = Cookies.get("token");
      await axios.delete(`${API_BASE}/api/admin/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(users.filter((user) => user._id !== userId)); // Update the state to remove the deleted user
      alert("User deleted successfully!");
    } catch (err) {
      console.error("Error deleting user:", err);
      alert("Failed to delete user.");
    }
  };

  useEffect(() => {
    const token = Cookies.get("token");
    axios
      .get(`${API_BASE}/api/admin/users`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the headers
        },
      })
      .then((res: any) => setUsers(res.data))
      .catch((err: any) => console.error(err));
  }, []);

  return (
    <div className="bg-gradient-to-br from-[#522c5d] via-[#232323] to-[#1c101f] p-6 shadow-2xl border border-white/10 backdrop-blur-xl">
      {/* Go Back */}
      <button
        onClick={() => window.history.back()}
        className="mb-6 inline-flex items-center gap-2 text-purple-200 hover:text-purple-100 font-semibold text-sm transition"
      >
        ← Go Back
      </button>

      {/* Title */}
      <h2 className="text-3xl font-bold text-[#cb6ce6] mb-8 drop-shadow-sm">
        Users
      </h2>

      {/* Table Wrapper */}
      <div className="overflow-x-auto rounded-xl shadow-lg bg-white/5 backdrop-blur-md border border-white/10">
        <table className="min-w-full text-left text-gray-100 text-sm">
          <thead className="bg-white/10 border-b border-white/10">
            <tr>
              <th className="px-6 py-3 uppercase text-xs font-semibold tracking-wide text-purple-200">
                Username
              </th>
              <th className="px-6 py-3 uppercase text-xs font-semibold tracking-wide text-purple-200">
                Email
              </th>
              <th className="px-6 py-3 uppercase text-xs font-semibold tracking-wide text-purple-200">
                Role
              </th>
              <th className="px-6 py-3 uppercase text-xs font-semibold tracking-wide text-purple-200">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {users.map((user: User, i: number) => (
              <tr
                key={user._id}
                className={`
              border-t border-white/10 transition
              ${i % 2 === 0 ? "bg-white/5" : "bg-white/0"}
              hover:bg-white/10
            `}
              >
                <td className="px-6 py-4 text-white">{user.username}</td>
                <td className="px-6 py-4 text-purple-200">{user.email}</td>

                {/* Role Badge */}
                <td className="px-6 py-4">
                  <span
                    className={`
                  px-3 py-1 rounded-full text-xs font-bold 
                  ${
                    user.role === "admin"
                      ? "bg-red-600/30 text-red-200 border border-red-400/20"
                      : "bg-purple-600/30 text-purple-200 border border-purple-400/20"
                  }
                `}
                  >
                    {user.role}
                  </span>
                </td>

                {/* Delete Button */}
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="
                  bg-red-600/80 hover:bg-red-500 text-white text-sm
                  px-4 py-1.5 rounded-lg transition shadow-md
                  hover:shadow-red-900/40
                "
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
