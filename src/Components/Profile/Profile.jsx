import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const Profile = ({theme}) => {
  const { user } = useContext(AuthContext);

  // LOG FOR DEBUGGING: Check your console to see if theme is actually changing
  console.log("Current Theme Prop:", theme);

  const isDark = theme === "dark";
  
  // Strict Theme Definitions
  const bgMain = isDark ? "bg-black text-white" : "bg-white text-black";
  const bgCard = isDark ? "bg-neutral-900 border-neutral-800" : "bg-gray-50 border-gray-200";
  const bgButton = isDark ? "bg-white text-black hover:bg-gray-200" : "bg-black text-white hover:bg-gray-800";

  if (!user) {
    return (
      <div className={`min-h-screen flex items-center justify-center p-6 ${bgMain}`}>
        <div className={`p-10 rounded-2xl shadow-2xl w-full max-w-md border ${bgCard}`}>
          <h2 className="text-3xl font-extrabold mb-4 text-center">Access Denied</h2>
          <Link to="/login" className={`block w-full text-center py-3 rounded-lg font-bold ${bgButton}`}>
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-all duration-500 ${bgMain}`}>
      <ToastContainer theme={isDark ? "dark" : "light"} />

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header Section */}
        <div className={`p-8 md:p-12 rounded-3xl border shadow-sm mb-8 ${bgCard}`}>
          <div className="flex flex-col md:flex-row items-center gap-10">
            <img
              src={user.photoURL || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-blue-500"
            />
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl font-black mb-2">{user.displayName || "User"}</h1>
              <p className="opacity-60">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Dashboard Grid - NEW LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Action Cards */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <DashboardCard to="/movies/add" icon="➕" label="Add Movie" sub="Add to database" isDark={isDark} />
            <DashboardCard to="/movies/my-collection" icon="🎬" label="Collection" sub="View your library" isDark={isDark} />
            <DashboardCard to="/movies/watchList" icon="⭐" label="Watchlist" sub="Saved for later" isDark={isDark} />
          </div>

          {/* THE NEW IDEA: Activity Insights Card */}
          <div className={`p-6 rounded-3xl border ${bgCard}`}>
            <h4 className="font-bold mb-6 flex items-center gap-2 tracking-widest text-xs uppercase opacity-70">
              Live Insights
            </h4>
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-sm">Movies Rated</span>
                <span className="text-xl font-black text-blue-500">128</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Member Since</span>
                <span className="text-xl font-black text-green-500">2024</span>
              </div>
              <div className="pt-4 border-t border-gray-700/30">
                <p className="text-[10px] uppercase font-bold opacity-40 mb-2">Engagement Rank</p>
                <div className="w-full h-2 bg-gray-800 rounded-full">
                  <div className="w-[75%] h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

const DashboardCard = ({ to, icon, label, sub, isDark }) => (
  <Link
    to={to}
    className={`group p-6 rounded-2xl border transition-all duration-300 ${
      isDark 
        ? "bg-neutral-900 border-neutral-800 hover:border-blue-500 hover:bg-black" 
        : "bg-white border-gray-200 hover:border-blue-500 hover:bg-gray-50"
    }`}
  >
    <div className="text-2xl mb-2">{icon}</div>
    <p className="font-bold">{label}</p>
    <p className="text-xs opacity-50">{sub}</p>
  </Link>
);

export default Profile;