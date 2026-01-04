import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function MyCollection() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteMovieId, setDeleteMovieId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const MOVIES_PER_PAGE = 10;

  // Fetch user's movies
  useEffect(() => {
    if (!user?.email) {
      setError("❌ Please add movie to view your collection.");
      setLoading(false);
      return;
    }

    async function fetchMovies() {
      try {
        const res = await axios.get(
          `https://movie-master-pro-server-side.vercel.app/movies/my/${user.email}`
        );
        setMovies(res.data);
      } catch (err) {
        console.error(err);
        setError("❌ Failed to load your movie collection.");
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, [user]);

  // Delete movie
  const handleDelete = async () => {
    if (!deleteMovieId) return;
    try {
      await axios.delete(
        `https://movie-master-pro-server-side.vercel.app/movies/delete/${deleteMovieId}`
      );
      setMovies(movies.filter((m) => m._id !== deleteMovieId));
      setShowModal(false);
    } catch (err) {
      console.error(err);
      alert("❌ Failed to delete movie.");
    }
  };

  if (loading)
    return <p className="text-center text-white mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  // Pagination logic
  const indexOfLastMovie = currentPage * MOVIES_PER_PAGE;
  const indexOfFirstMovie = indexOfLastMovie - MOVIES_PER_PAGE;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);
  const totalPages = Math.ceil(movies.length / MOVIES_PER_PAGE);

  return (
    <div className="max-w-full mx-auto p-6 bg-gradient-to-r from-gray-900 via-black to-gray-800 text-white rounded shadow-lg">
      <ToastContainer position="top-right" autoClose={3000} />

      <h2 className="text-3xl font-bold mb-6 text-center">
        🎞️ My Movie Collection
      </h2>

      {movies.length === 0 ? (
        <p className="text-gray-400 text-center">
          You haven’t added any movies yet.
        </p>
      ) : (
        <>
          {/* Grid with 5 cards per row on large screens */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {currentMovies.map((movie) => (
              <div
                key={movie._id}
                className="bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-200"
              >
                <img
                  src={
                    movie.posterUrl ||
                    "https://via.placeholder.com/300x400?text=No+Image"
                  }
                  alt={movie.title}
                  className="w-full h-64 object-cover rounded mb-3"
                />
                <h3 className="text-lg font-semibold mb-1">{movie.title}</h3>
                <p className="text-gray-400 text-sm mb-1">
                  🎭 {movie.genre} | 📅 {movie.releaseYear}
                </p>
                <p className="text-gray-300 text-sm mb-1">
                  ⭐ {movie.rating} | ⏱ {movie.duration} mins
                </p>
                <p className="text-gray-400 text-sm mb-2">
                  🎬 {movie.director}
                </p>
                <p className="text-gray-300 text-sm line-clamp-3">
                  {movie.plotSummary}
                </p>

                {/* Buttons */}
                <div className="flex justify-between mt-3">
                  <button
                    className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded text-black font-semibold"
                    onClick={() => navigate(`/movies/update/${movie._id}`)}
                  >
                    Edit
                  </button>
                  <Link
                    to={`/movies/${movie._id}`}
                    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-white font-semibold"
                  >
                    Details
                  </Link>
                  <button
                    className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded font-semibold"
                    onClick={() => {
                      setDeleteMovieId(movie._id);
                      setShowModal(true);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded bg-gray-500 text-white disabled:opacity-50"
              >
                Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 rounded ${
                    currentPage === i + 1
                      ? "bg-blue-600 text-white"
                      : "bg-gray-700 text-white hover:bg-gray-600"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded bg-gray-500 text-white disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

      {/* Delete Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gray-800 p-6 rounded shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4">Confirm Delete</h3>
            <p className="mb-4">Are you sure you want to delete this movie?</p>
            <div className="flex justify-end gap-4">
              <button
                className="bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyCollection;
