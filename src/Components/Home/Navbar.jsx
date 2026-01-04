import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { toast, ToastContainer } from "react-toastify";

const Navbar = ({ theme, setTheme }) => {
  const { user, signOutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isDark = theme === "dark";

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [sidebarOpen]);

  const handleToggleTheme = (e) => {
    setTheme(e.target.checked ? "dark" : "light");
  };

  const handleSignOut = async () => {
    try {
      await signOutUser();
      toast.success("Signed out successfully!");
      navigate("/login");
    } catch (err) {
      toast.error("Sign out failed. Please try again.");
      console.error(err);
    }
  };

  // Common styles for links to avoid layout shift on hover
  const linkBase =
    "block px-3 py-2 rounded-md transition-colors duration-200";
  const linkHover = "hover:bg-yellow-200 hover:text-black";

  const guestLinks = [
    { to: "/", label: "Home" },
    { to: "/movies", label: "All Movies" },
    // { to: "/movies/my-collection", label: "My Collection" },
    { to: "/login", label: "Login" },
    { to: "/register", label: "Register" },
  ];

  const authLinks = [
    { to: "/", label: "Home" },
    { to: "/movies", label: "All Movies" },
    { to: "/movies/my-collection", label: "My Collection" },
    { to: "/movies/add", label: "Add Movies" },
    { to: "/movies/watchList", label: "My Playlist" },
    { to: "/profile", label: "Profile" },
  ];

  const renderLinks = (links) =>
    links.map((l) => (
      <li key={l.to}>
        <NavLink
          to={l.to}
          className={({ isActive }) =>
            `${linkBase} ${linkHover} ${
              isActive
                ? isDark
                  ? "bg-gray-700 text-white"
                  : "bg-gray-200 text-black"
                : ""
            }`
          }
          onClick={() => setSidebarOpen(false)}
        >
          {l.label}
        </NavLink>
      </li>
    ));

  return (
    <header
      className={`w-full shadow-sm ${
        isDark
          ? "bg-gradient-to-r from-gray-900 via-black to-gray-800 text-white"
          : "bg-gray-100 text-black"
      }`}
    >
      <ToastContainer theme={isDark ? "dark" : "light"} />

      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left: Logo + Mobile menu */}
        <div className="flex items-center gap-3">
          <button
            className="lg:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <Link to="/" className="text-xl font-bold">
            Movie<span className="text-blue-500">Master</span>
          </Link>
        </div>

        {/* Center: Desktop nav */}
        <nav className="hidden lg:block">
          <ul className="flex items-center gap-2">
            {user ? renderLinks(authLinks) : renderLinks(guestLinks)}
            {user && (
              <li>
                <button
                  onClick={handleSignOut}
                  className={`${linkBase} ${linkHover}`}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </nav>

        {/* Right: Theme toggle + Avatar */}
        <div className="flex items-center gap-4">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={isDark}
              onChange={handleToggleTheme}
              className="sr-only peer"
            />
            <div className="w-14 h-8 bg-gray-300 rounded-full peer-checked:bg-blue-600 transition-colors duration-300"></div>
            <div className="absolute left-1 top-1 w-6 h-6 bg-white rounded-full border border-gray-300 peer-checked:translate-x-6 peer-checked:border-blue-600 transition-transform duration-300"></div>
          </label>

          {user && (
            <Link to="/profile" className="rounded-full overflow-hidden">
              <img
                src={user.photoURL || "/default-avatar.png"}
                alt="profile"
                className="w-9 h-9 rounded-full border border-gray-300"
              />
            </Link>
          )}
        </div>
      </div>

      {/* Mobile sidebar + backdrop */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <button
            className="flex-1 bg-black/50"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close menu"
          />
          {/* Drawer */}
          <div
            className={`w-72 h-full p-6 overflow-y-auto ${
              isDark ? "bg-black text-white" : "bg-white text-black"
            }`}
          >
            <div className="flex items-center justify-between mb-6">
              <span className="text-lg font-semibold">Menu</span>
              <button
                className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={() => setSidebarOpen(false)}
              >
                ✖
              </button>
            </div>

            <ul className="space-y-1">
              {user ? renderLinks(authLinks) : renderLinks(guestLinks)}
              {user && (
                <li>
                  <button
                    onClick={() => {
                      setSidebarOpen(false);
                      handleSignOut();
                    }}
                    className={`${linkBase} ${linkHover} w-full text-left`}
                  >
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
