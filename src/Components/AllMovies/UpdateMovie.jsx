import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import { toast, ToastContainer } from "react-toastify";

function UpdateMovie() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

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

  useEffect(() => {
    if (!user?.email) return;

    async function fetchMovie() {
      try {
        const res = await axios.get(
          `https://movie-master-pro-server-side.vercel.app/movies/${id}`
        );
        const movie = res.data;

        // Authorization check
        if (movie.addedBy !== user.email) {
          alert("❌ You are not authorized to edit this movie.");
          navigate("/movies/my-collection");
          return;
        }

        setForm(movie);
      } catch (err) {
        console.error("Fetch movie error:", err);
        alert("Failed to load movie.");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://movie-master-pro-server-side.vercel.app/movies/update/${id}`,
        form
      );
      toast.success(" Movie updated successfully!");
      navigate("/movies/my-collection");
    } catch (err) {
      console.error("Update error:", err);
      toast.error(" Failed to update movie.");
    }
  };

  if (loading)
    return <p className="text-center text-white mt-10">Loading movie...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-900 text-white rounded shadow-lg">
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
      <h2 className="text-3xl font-bold mb-6">✏️ Update Movie</h2>
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
          className="w-full py-2 bg-yellow-500 hover:bg-yellow-600 rounded font-semibold text-black"
        >
          Update Movie
        </button>
      </form>
    </div>
  );
}

export default UpdateMovie;
