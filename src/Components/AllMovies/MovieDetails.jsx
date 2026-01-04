import { useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate , useOutletContext } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MovieDetails() {
  const { theme } = useOutletContext();
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [deleteMovieId, setDeleteMovieId] = useState(null);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    async function fetchMovie() {
      try {
        const res = await axios.get(
          `https://movie-master-pro-server-side.vercel.app/movies/${id}`
        );
        setMovie(res.data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to fetch movie details.");
      } finally {
        setLoading(false);
      }
    }
    fetchMovie();
  }, [id]);

  useEffect(() => {
    if (user && movie) {
      axios
        .get(
          `https://movie-master-pro-server-side.vercel.app/watchlist/check`,
          {
            params: { email: user.email, movieId: movie._id },
          }
        )
        .then((res) => setIsAdded(res.data.exists))
        .catch((err) => console.log(err));
    }
  }, [user, movie]);

  const handleDelete = async () => {
    try {
      await axios.delete(
        `https://movie-master-pro-server-side.vercel.app/movies/delete/${deleteMovieId}`
      );
      toast.success("Movie deleted successfully!");
      navigate("/movies");
    } catch (err) {
      toast.error("Failed to delete movie.");
    }
    setShowModal(false);
  };

  const handleAddWatchlist = async () => {
    if (!user) {
      toast.error("Please login to add watchlist");
      return navigate("/login");
    }

    try {
      await axios.post(
        "https://movie-master-pro-server-side.vercel.app/watchlist/add",
        {
          email: user.email,
          movieId: movie._id,
          movie,
        }
      );
      toast.success("Added to Watchlist!");
      setIsAdded(true);
    } catch (err) {
      toast.error("Already in Watchlist");
    }
  };

  if (loading)
    return (
      <p
        className={`text-center mt-10 ${
          theme === "dark" ? "text-black" : "text-white"
        }`}
      >
        Loading movie details...
      </p>
    );
  if (error)
    return <p className="text-center text-red-500 mt-10">{error}</p>;
  if (!movie)
    return (
      <p
        className={`text-center mt-10 ${
          theme === "dark" ? "text-black" : "text-white"
        }`}
      >
        Movie not found.
      </p>
    );

  const isAdder = user && user.email === movie.addedBy;

  return (
    <div
  className={`max-w-6xl mx-auto mt-10 p-6 rounded shadow-lg ${
    theme === "dark" ? "bg-black text-white" : "bg-white text-black"
  }`}
>
  <ToastContainer position="top-right" autoClose={3000} />

  <div>
    {/* Back Button */}
    <Link
      to="/movies"
      className={`inline-block mb-6 px-4 py-2 border rounded ${
        theme === "dark"
          ? "border-gray-600 text-white hover:bg-gray-800"
          : "border-gray-400 text-black hover:bg-gray-200"
      }`}
    >
      ← Back to All Movies
    </Link>

    <div className="flex flex-col md:flex-row gap-6">
      <img
        src={movie.posterUrl || "https://via.placeholder.com/300x400?text=No+Image"}
        alt={movie.title}
        className="w-full md:w-1/3 rounded shadow-lg"
      />

      <div className="md:flex-1">
        <h2 className="text-3xl font-bold mb-3">{movie.title}</h2>

        {/* Genre Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {movie.genre?.split(",").map((g) => (
            <span
              key={g}
              className={`px-2 py-1 rounded text-xs font-semibold ${
                theme === "dark"
                  ? "bg-gray-700 text-white"
                  : "bg-red-600 text-white"
              }`}
            >
              {g.trim()}
            </span>
          ))}
        </div>

        {/* Details */}
        <p className={theme === "dark" ? "text-white mb-1" : "text-black mb-1"}>
          📅 Release Year: {movie.releaseYear}
        </p>
        <p className={theme === "dark" ? "text-white mb-1" : "text-black mb-1"}>
          🎬 Director: {movie.director}
        </p>
        <p className={theme === "dark" ? "text-white mb-1" : "text-black mb-1"}>
          👨‍🎤 Cast: {movie.cast}
        </p>
        <p
          className={`mb-1 font-semibold ${
            theme === "dark" ? "text-yellow-400" : "text-yellow-600"
          }`}
        >
          ⭐ Rating: {movie.rating}
        </p>
        <p className={theme === "dark" ? "text-white mb-1" : "text-black mb-1"}>
          ⏱ Duration: {movie.duration} mins
        </p>
        <p className={theme === "dark" ? "text-white mb-1" : "text-black mb-1"}>
          🌐 Language: {movie.language}
        </p>
        <p className={theme === "dark" ? "text-white mb-1" : "text-black mb-1"}>
          🏳️ Country: {movie.country}
        </p>

        <p className={theme === "dark" ? "text-white mt-4" : "text-black mt-4"}>
          {movie.plotSummary}
        </p>

        {/* Buttons */}
        {isAdder && (
          <div className="mt-4 flex gap-3">
            <button
              onClick={() => navigate(`/movies/update/${movie._id}`)}
              className="px-4 py-2 rounded font-semibold bg-yellow-500 hover:bg-yellow-600 text-black"
            >
              Edit
            </button>

            <button
              onClick={() => {
                setDeleteMovieId(movie._id);
                setShowModal(true);
              }}
              className="px-4 py-2 rounded font-semibold bg-red-600 hover:bg-red-700 text-white"
            >
              Delete
            </button>
          </div>
        )}

        <button
          onClick={handleAddWatchlist}
          disabled={isAdded}
          className={`mt-4 px-4 py-2 rounded font-semibold ${
            isAdded
              ? theme === "dark"
                ? "bg-gray-600 cursor-not-allowed text-white"
                : "bg-gray-400 cursor-not-allowed text-black"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {isAdded ? "✓ Added to Watchlist" : "Add to Watchlist"}
        </button>
      </div>
    </div>

    {/* Modal */}
    {showModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div
          className={`p-6 rounded shadow-lg max-w-sm w-full ${
            theme === "dark" ? "bg-black text-white" : "bg-white text-black"
          }`}
        >
          <h3 className="text-xl font-bold mb-4">Confirm Delete</h3>
          <p className="mb-4">
            Are you sure you want to delete <strong>{movie.title}</strong>?
          </p>
          <div className="flex justify-end gap-3">
            <button
              className={`px-4 py-2 rounded ${
                theme === "dark"
                  ? "bg-gray-700 hover:bg-gray-600 text-white"
                  : "bg-gray-300 hover:bg-gray-400 text-black"
              }`}
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-white"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
</div>

  );
}

export default MovieDetails;
