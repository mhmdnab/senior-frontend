"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/admin/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Users</h2>
      <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-200">
            <th className="text-left p-3">Username</th>
            <th className="text-left p-3">Email</th>
            <th className="text-left p-3">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: any) => (
            <tr key={user._id} className="border-t">
              <td className="p-3">{user.username}</td>
              <td className="p-3">{user.email}</td>
              <td className="p-3">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
