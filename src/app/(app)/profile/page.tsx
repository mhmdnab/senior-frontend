"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

interface User {
  username: string;
  email: string;
  // Add other user information as needed
}

interface ReduxState {
  user: {
    userInfo: User | null;
  };
}

const ProfileScreen: React.FC = () => {
  // Use useSelector to get the userInfo from the Redux store
  const userInfo = useSelector((state: ReduxState) => state.user.userInfo);
  const dispatch = useDispatch();
  const router = useRouter();

  const [newUsername, setNewUsername] = useState<string>("");
  const [newEmail, setNewEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false); // No initial loading from direct fetch anymore
  const [error, setError] = useState<string | null>(null);

  // Replace with your actual backend API endpoint
  const updateUserProfileEndpoint = "/profile";

  useEffect(() => {
    // If userInfo exists in Redux, populate the local state for editing
    if (userInfo) {
      setNewUsername(userInfo.username);
      setNewEmail(userInfo.email);
    } else {
      // If userInfo is not in Redux, you might want to fetch it here
      // or handle the case where the user is not logged in.
      // For this example, we'll assume userInfo is loaded on login.
      // You might want to redirect to login if not present.
      // Example:
      // router.push('/login');
    }
  }, [userInfo, router]);

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewUsername(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewEmail(event.target.value);
  };

  const handleUpdateProfile = async () => {
    if (!userInfo) {
      console.error("User data not loaded yet.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await fetch(updateUserProfileEndpoint, {
        method: "PUT", // Or 'PATCH' depending on your API
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: newUsername, email: newEmail }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedUser: User = await response.json();
      // In a real application, you might want to dispatch an action here
      // to update the userInfo in the Redux store as well.
      // dispatch(loginSuccess(updatedUser));
      alert("Profile updated successfully!");
    } catch (e: any) {
      setError("Failed to update profile.");
      console.error("Error updating profile:", e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Updating profile information...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userInfo) {
    return <div>Please log in to view your profile.</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">Your Profile</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Username:
        </label>
        <input
          type="text"
          value={newUsername}
          onChange={handleUsernameChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email:
        </label>
        <input
          type="email"
          value={newEmail}
          onChange={handleEmailChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        onClick={handleUpdateProfile}
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
      >
        Update Profile
      </button>

      <h3 className="text-xl font-semibold mt-8 mb-2">Current Information:</h3>
      <p className="text-gray-700">
        Username: <span className="font-medium">{userInfo?.username}</span>
      </p>
      <p className="text-gray-700">
        Email: <span className="font-medium">{userInfo?.email}</span>
      </p>
    </div>
  );
};

export default ProfileScreen;
