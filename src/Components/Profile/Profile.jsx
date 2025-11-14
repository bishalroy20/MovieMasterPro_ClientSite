import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const Profile = () => {
  const { user } = useContext(AuthContext);

  // Not logged in
  if (!user) {
    return (
      <div className="flex justify-center items-center h-[70vh] text-center">
        <div className="bg-gray-900 text-white p-10 rounded-2xl shadow-xl w-full max-w-md border border-gray-700">
          <h2 className="text-2xl font-bold mb-3">You are not logged in</h2>
          <p className="opacity-70 mb-6">Please sign in to view your profile.</p>
          <Link to="/login" className="btn btn-warning w-full text-black">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  // Handle Google email issue
  const userEmail = user.email || user.providerData?.[0]?.email || "Email not available";

  return (
    <div className="flex justify-center py-10 bg-gradient-to-r from-gray-900 via-black to-gray-800">
      <ToastContainer 
        position="top-right"
        autoClose={3000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick
        rtl={false} 
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="bg-gray-900 text-white p-8 rounded-3xl shadow-xl w-full max-w-lg border border-gray-700">
        {/* Profile Header */}
        <div className="flex flex-col items-center">
          <img
            src={user.photoURL || "/default-avatar.png"}
            alt="Profile"
            className="w-28 h-28 rounded-full border-4 border-yellow-500 shadow-xl mb-4"
          />
          <h2 className="text-3xl font-bold tracking-wide">{user.displayName || "Unnamed User"}</h2>
          <p className="text-gray-400 mt-1">{userEmail}</p>
        </div>

        {/* Divider */}
        <div className="my-6 w-full border-t border-gray-700"></div>

        {/* Account Details */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Account Details</h3>
          <div className="space-y-2 text-sm">
            <p><span className="font-semibold text-yellow-400">UID:</span> {user.uid}</p>
            <p><span className="font-semibold text-yellow-400">Email:</span> {userEmail}</p>
            <p><span className="font-semibold text-yellow-400">Email Verified:</span> {user.emailVerified ? "Yes" : "No"}</p>
            <p><span className="font-semibold text-yellow-400">Provider:</span> {user.providerData?.[0]?.providerId}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col gap-3">
          <Link to="/movies/add" className="btn btn-outline border-gray-500 text-gray-300 hover:text-black w-full">
            Add New Movie
          </Link>
          <Link to="/movies/my-collection" className="btn btn-outline border-gray-500 text-gray-300 hover:text-black w-full">
             My Movie Collection
          </Link>
          <Link to="/movies/watchList" className="btn btn-outline border-gray-500 text-gray-300 hover:text-black w-full">
            My Watchlist
          </Link>
        </div>

        
      </div>
    </div>
  );
};

export default Profile;
