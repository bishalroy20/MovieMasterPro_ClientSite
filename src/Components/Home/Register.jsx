import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { updateProfile } from "firebase/auth";
import "react-toastify/dist/ReactToastify.css";

const Register = ({ theme }) => {
  const { createUser, signInWithGoogle } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: "",
    photoURL: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const isDark = theme === "dark";

  const validate = () => {
    const { password } = formData;
    const newErrors = {};

    if (!/[A-Z]/.test(password)) {
      newErrors.password = "Must include an uppercase letter";
    }
    if (!/[a-z]/.test(password)) {
      newErrors.password = "Must include a lowercase letter";
    }
    if (password.length < 6) {
      newErrors.password = "Must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const result = await createUser(formData.email, formData.password);

      await updateProfile(result.user, {
        displayName: formData.username,
        photoURL: formData.photoURL,
      });

      toast.success("Profile created successfully!");
      setFormData({ username: "", photoURL: "", email: "", password: "" });
      setLoading(false);

      navigate("/profile");
    } catch (err) {
      toast.error(err.message);
      setErrors({ firebase: err.message });
      setLoading(false);
    }
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
      <ToastContainer theme={isDark ? "dark" : "light"} />

      <div
        className={`w-full max-w-sm rounded-xl shadow-2xl p-6 ${
          isDark ? "bg-neutral-900 border border-gray-700" : "bg-white border border-gray-200"
        }`}
      >
        <h1 className="text-4xl font-bold text-center mb-6">Register</h1>

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            name="username"
            type="text"
            placeholder="Username"
            className={`w-full px-4 py-2 rounded border focus:outline-none ${
              isDark
                ? "bg-black border-gray-700 text-white"
                : "bg-gray-50 border-gray-300 text-black"
            }`}
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            name="photoURL"
            type="text"
            placeholder="Photo URL"
            className={`w-full px-4 py-2 rounded border focus:outline-none ${
              isDark
                ? "bg-black border-gray-700 text-white"
                : "bg-gray-50 border-gray-300 text-black"
            }`}
            value={formData.photoURL}
            onChange={handleChange}
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            className={`w-full px-4 py-2 rounded border focus:outline-none ${
              isDark
                ? "bg-black border-gray-700 text-white"
                : "bg-gray-50 border-gray-300 text-black"
            }`}
            value={formData.email}
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
            value={formData.password}
            onChange={handleChange}
            required
          />

          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
          {errors.firebase && (
            <p className="text-red-500 text-sm">{errors.firebase}</p>
          )}

          <button
            type="submit"
            className="w-full py-2 rounded font-semibold bg-blue-600 hover:bg-blue-700 text-white"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
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
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
