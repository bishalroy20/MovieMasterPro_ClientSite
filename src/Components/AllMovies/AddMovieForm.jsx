import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext"; // ✅ your Firebase Auth context

function AddMovieForm() {
  const { user } = useContext(AuthContext); // ✅ Get logged-in user from context

  const [form, setForm] = useState({
    title: "",
    genre: "",
    releaseYear: "",
    director: "",
    cast: "",
    rating: "",
    duration: "",
    plotSummary: "",
    posterUrl: "",
    language: "",
    country: "",
    addedBy: "", // 👈 start empty — will be filled later
  });

  const [message, setMessage] = useState("");

  // ✅ Set user email automatically when Firebase user is loaded
  useEffect(() => {
    if (user?.email) {
      setForm((prev) => ({ ...prev, addedBy: user.email }));
    }
  }, [user]);

  // ✅ Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      releaseYear: parseInt(form.releaseYear, 10),
      rating: parseFloat(form.rating),
      duration: parseInt(form.duration, 10),
    };

    if (
      Number.isNaN(payload.releaseYear) ||
      Number.isNaN(payload.rating) ||
      Number.isNaN(payload.duration)
    ) {
      setMessage("❌ releaseYear, rating, and duration must be valid numbers.");
      return;
    }

    try {
      console.log("Submitting movie:", payload);
      const res = await axios.post("http://localhost:3000/movies/add", payload);
      console.log("Response:", res.data);
      setMessage("✅ Movie added successfully!");

      // Reset the form, but keep the logged-in email
      setForm({
        title: "",
        genre: "",
        releaseYear: "",
        director: "",
        cast: "",
        rating: "",
        duration: "",
        plotSummary: "",
        posterUrl: "",
        language: "",
        country: "",
        addedBy: user?.email || "",
      });
    } catch (err) {
      console.error("Axios error:", err);
      const srvMsg = err.response
        ? `${err.response.status} ${err.response.statusText}: ${JSON.stringify(
            err.response.data
          )}`
        : err.message;
      setMessage(`❌ Failed to add movie. ${srvMsg}`);
    }
  };

  return (
    <div className="bg-gradient-to-r from-gray-900 via-black to-gray-800">
      <div className="max-w-3xl py-4  mx-auto p-6 bg-gray-700 text-white rounded shadow-lg">
      <h2 className="text-3xl font-bold mb-6">🎬 Submit a New Movie</h2>

      {!user ? (
        <p className="text-red-400 text-center mb-4">
          ⚠️ Please log in to add a movie.
        </p>
      ) : (
        <>
          <form onSubmit={handleSubmit} className="space-y-4">
            {Object.keys(form).map(
              (key) =>
                key !== "addedBy" && (
                  <div key={key}>
                    <label className="block mb-1 capitalize">
                      {key.replace(/([A-Z])/g, " $1")}
                    </label>
                    <input
                      type="text"
                      name={key}
                      value={form[key]}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded"
                      required
                    />
                  </div>
                )
            )}

            <button
              type="submit"
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded font-semibold"
            >
              Add Movie
            </button>

            {message && <p className="mt-4 text-yellow-400">{message}</p>}
          </form>

          <p className="mt-4 text-sm text-gray-400">
            👤 Logged in as:{" "}
            <span className="text-blue-400">{form.addedBy}</span>
          </p>
        </>
      )}
    </div>
    </div>
  );
}

export default AddMovieForm;
