import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import { toast, ToastContainer } from "react-toastify";

const IMGBB_API_KEY = "aa7cc99fc48cd7b4535b604b6633af61"; // 👈 replace with your key

// Helper function for ImgBB upload
async function uploadToImgBB(file) {
  const formData = new FormData();
  formData.append("image", file);

  try {
    const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) throw new Error(`ImgBB upload failed: ${res.status} ${res.statusText}`);
    const data = await res.json();
    if (!data.success) throw new Error(`ImgBB error: ${JSON.stringify(data)}`);

    return data.data.url;
  } catch (err) {
    console.error("ImgBB upload error:", err);
    throw err;
  }
}

function UpdateMovie({ theme }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const isDark = theme === "dark";

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

  const [loading, setLoading] = useState(true);
  const [imageUploading, setImageUploading] = useState(false);

  useEffect(() => {
    if (!user?.email) return;

    async function fetchMovie() {
      try {
        const res = await axios.get(
          `https://movie-master-pro-server-side.vercel.app/movies/${id}`
        );
        const movie = res.data;

        if (movie.addedBy !== user.email) {
          toast.error("❌ You are not authorized to edit this movie.");
          navigate("/movies/my-collection");
          return;
        }

        setForm(movie);
      } catch (err) {
        console.error("Fetch movie error:", err);
        toast.error("Failed to load movie.");
        navigate("/movies/my-collection");
      } finally {
        setLoading(false);
      }
    }

    fetchMovie();
  }, [id, user, navigate]);

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
    try {
      await axios.put(
        `https://movie-master-pro-server-side.vercel.app/movies/update/${id}`,
        form
      );
      toast.success("Movie updated successfully!");
      navigate("/movies/my-collection");
    } catch (err) {
      console.error("Update error:", err);
      toast.error("Failed to update movie.");
    }
  };

  if (loading)
    return (
      <p className={`text-center mt-10 ${isDark ? "text-white" : "text-black"}`}>
        Loading movie...
      </p>
    );

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
        <h2 className="text-3xl font-bold mb-6 text-center">✏️ Update Movie</h2>

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
                type={
                  field === "releaseYear" ||
                  field === "rating" ||
                  field === "duration"
                    ? "number"
                    : "text"
                }
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
              disabled={imageUploading}
              className="w-full py-3 rounded bg-yellow-500 hover:bg-yellow-600 font-semibold transition disabled:opacity-50 text-black"
            >
              Update Movie
            </button>
          </div>
        </form>

        {user && (
          <p className="mt-4 text-sm text-center opacity-60">
            Logged in as: <span className="font-medium">{form.addedBy}</span>
          </p>
        )}
      </div>
    </div>
  );
}

export default UpdateMovie;
