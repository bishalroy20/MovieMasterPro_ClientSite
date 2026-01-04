import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = ({ theme }) => {
  const { signInUser, signInWithGoogle } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const isDark = theme === "dark";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    signInUser(formData.email, formData.password)
      .then(() => {
        toast.success("Login successful!");
        setLoading(false);
        navigate("/profile");
      })
      .catch(() => {
        toast.error("Invalid Email and Password. Please try again.");
        setLoading(false);
      });
  };

  const handleGoogleLogin = () => {
    setLoading(true);
    signInWithGoogle()
      .then(() => {
        toast.success("Logged in with Google!");
        setLoading(false);
        navigate("/profile");
      })
      .catch(() => {
        toast.error("Google login failed.");
        setLoading(false);
      });
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center ${
        isDark
          ? "bg-gradient-to-r from-gray-900 via-black to-gray-800 text-white"
          : "bg-gray-300 text-black"
      }`}
    >
      <div
        className={`w-full max-w-sm rounded-xl shadow-2xl p-6 ${
          isDark
            ? "bg-neutral-900 border border-gray-700"
            : "bg-white border border-gray-200"
        }`}
      >
        <ToastContainer theme={isDark ? "dark" : "light"} />
        <h1 className="text-4xl font-bold text-center mb-6">Login</h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            name="email"
            type="email"
            placeholder="Email"
            className={`w-full px-4 py-2 rounded border focus:outline-none ${
              isDark
                ? "bg-black border-gray-700 text-white"
                : "bg-gray-50 border-gray-300 text-black"
            }`}
            onChange={handleChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            className={`w-full px-4 py-2 rounded border focus:outline-none ${
              isDark
                ? "bg-black border-gray-700 text-white"
                : "bg-gray-50 border-gray-300 text-black"
            }`}
            onChange={handleChange}
            required
          />

          <div className="flex justify-between text-sm">
            <Link
              to="/forgot-password"
              className="text-blue-500 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded font-semibold bg-blue-600 hover:bg-blue-700 text-white"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="divider my-4">OR</div>

        <button
          onClick={handleGoogleLogin}
          className={`w-full py-2 rounded border font-semibold ${
            isDark
              ? "border-gray-600 hover:bg-gray-800 text-white"
              : "border-gray-300 hover:bg-gray-200 text-black"
          }`}
          disabled={loading}
        >
          Login with Google
        </button>

        <p className="text-sm text-center mt-4">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
