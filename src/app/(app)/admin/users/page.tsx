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
    <div className="bg-gray-50 p-6 rounded-xl shadow-lg">
      {/* Go Back Button */}
      <button
        onClick={() => window.history.back()}
        className="mb-6 inline-flex items-center gap-2 text-gray-700 hover:text-gray-900 font-semibold text-sm"
      >
        ← Go Back
      </button>

      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Users</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-sm uppercase tracking-wider">
              <th className="text-left px-6 py-3">Username</th>
              <th className="text-left px-6 py-3">Email</th>
              <th className="text-left px-6 py-3">Role</th>
              <th className="text-left px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: User) => (
              <tr
                key={user._id}
                className="border-t hover:bg-gray-50 transition duration-200"
              >
                <td className="px-6 py-4 text-gray-800">{user.username}</td>
                <td className="px-6 py-4 text-gray-600">{user.email}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${
                      user.role === "admin"
                        ? "bg-red-100 text-red-600"
                        : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 flex gap-2">
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md text-sm"
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
