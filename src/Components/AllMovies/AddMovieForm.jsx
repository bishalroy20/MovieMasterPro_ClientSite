import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import { toast, ToastContainer } from "react-toastify";

const IMGBB_API_KEY = "aa7cc99fc48cd7b4535b604b6633af61"; // 👈 your key

// Helper function to upload image to ImgBB
async function uploadToImgBB(file) {
  const formData = new FormData();
  formData.append("image", file);

  try {
    const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      throw new Error(`ImgBB upload failed: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    if (!data.success) {
      throw new Error(`ImgBB error: ${JSON.stringify(data)}`);
    }

    return data.data.url;
  } catch (err) {
    console.error("ImgBB upload error:", err);
    throw err;
  }
}

function AddMovieForm({ theme }) {
  const { user } = useContext(AuthContext);
  const isDark = theme === "dark";

  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);

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
    addedBy: "",
  });

  useEffect(() => {
    if (user?.email) {
      setForm((prev) => ({ ...prev, addedBy: user.email }));
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageUploading(true);
    try {
      const url = await uploadToImgBB(file);
      setForm((prev) => ({ ...prev, posterUrl: url }));
      toast.success("Poster uploaded successfully!");
    } catch (err) {
      toast.error("Image upload failed");
    } finally {
      setImageUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      releaseYear: Number(form.releaseYear),
      rating: Number(form.rating),
      duration: Number(form.duration),
    };

    if (!user) {
      toast.error("Please login first");
      return;
    }

    setLoading(true);

    try {
      await axios.post(
        "https://movie-master-pro-server-side.vercel.app/movies/add",
        payload
      );

      toast.success("Movie added successfully!");

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
        addedBy: user.email,
      });
    } catch (err) {
      toast.error("Failed to add movie");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen py-10 px-4 ${
        isDark ? "bg-black text-white" : "bg-gray-100 text-black"
      }`}
    >
      <ToastContainer theme={isDark ? "dark" : "light"} />

      <div
        className={`max-w-3xl mx-auto rounded-xl shadow-lg p-6 md:p-8 ${
          isDark ? "bg-neutral-900" : "bg-white"
        }`}
      >
        <h2 className="text-3xl font-bold mb-6 text-center">🎬 Add New Movie</h2>

        {!user ? (
          <p className="text-red-500 text-center">Please login to add a movie.</p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {/* Text inputs */}
            {[
              "title",
              "genre",
              "releaseYear",
              "director",
              "cast",
              "rating",
              "duration",
              "language",
              "country",
            ].map((field) => (
              <div key={field}>
                <label className="block mb-1 capitalize">
                  {field.replace(/([A-Z])/g, " $1")}
                </label>
                <input
                  type={field === "releaseYear" || field === "rating" || field === "duration" ? "number" : "text"}
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-2 rounded border focus:outline-none ${
                    isDark
                      ? "bg-black border-gray-700 text-white"
                      : "bg-gray-100 border-gray-300 text-black"
                  }`}
                />
              </div>
            ))}

            {/* Plot Summary */}
            <div className="md:col-span-2">
              <label className="block mb-1">Plot Summary</label>
              <textarea
                name="plotSummary"
                value={form.plotSummary}
                onChange={handleChange}
                rows="4"
                required
                className={`w-full px-4 py-2 rounded border focus:outline-none ${
                  isDark
                    ? "bg-black border-gray-700 text-white"
                    : "bg-gray-100 border-gray-300 text-black"
                }`}
              />
            </div>

            {/* Image upload */}
            <div className="md:col-span-2">
              <label className="block mb-1">Poster Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full"
              />
              {imageUploading && (
                <p className="text-sm text-blue-500 mt-1">Uploading image...</p>
              )}
              {form.posterUrl && (
                <img
                  src={form.posterUrl}
                  alt="Poster Preview"
                  className="mt-3 w-32 rounded"
                />
              )}
            </div>

            {/* Submit */}
            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={loading || imageUploading}
                className="w-full py-3 rounded bg-blue-600 hover:bg-blue-700 font-semibold transition disabled:opacity-50 text-white"
              >
                {loading ? "Submitting..." : "Add Movie"}
              </button>
            </div>
          </form>
        )}

        {user && (
          <p className="mt-4 text-sm text-center opacity-60">
            Logged in as: <span className="font-medium">{form.addedBy}</span>
          </p>
        )}
      </div>
    </div>
  );
}

export default AddMovieForm;
