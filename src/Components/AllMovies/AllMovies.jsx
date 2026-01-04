import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useOutletContext } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AllMovies() {
  const { theme } = useOutletContext();
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [error, setError] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [minRating, setMinRating] = useState("");
  const [maxRating, setMaxRating] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const MOVIES_PER_PAGE = 10;

  // Fetch all movies once
  useEffect(() => {
    async function fetchMovies() {
      try {
        const res = await axios.get(
          "https://movie-master-pro-server-side.vercel.app/movies"
        );
        setMovies(res.data);
        setFilteredMovies(res.data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("❌ Failed to fetch movies.");
      }
    }
    fetchMovies();
  }, []);

  // Real-time filtering
  useEffect(() => {
    let filtered = [...movies];

    if (selectedGenres.length > 0) {
      filtered = filtered.filter((movie) =>
        selectedGenres.some((genre) =>
          movie.genre?.toLowerCase().includes(genre.toLowerCase())
        )
      );
    }

    if (minRating) {
      filtered = filtered.filter((movie) => movie.rating >= parseFloat(minRating));
    }
    if (maxRating) {
      filtered = filtered.filter((movie) => movie.rating <= parseFloat(maxRating));
    }

    setFilteredMovies(filtered);
    setCurrentPage(1); // reset to first page when filters change
  }, [selectedGenres, minRating, maxRating, movies]);

  const handleGenreChange = (genre) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  // Pagination logic
  const indexOfLastMovie = currentPage * MOVIES_PER_PAGE;
  const indexOfFirstMovie = indexOfLastMovie - MOVIES_PER_PAGE;
  const currentMovies = filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie);
  const totalPages = Math.ceil(filteredMovies.length / MOVIES_PER_PAGE);


  return (
    
    <div
      className={`min-h-screen w-full p-6 ${
        theme === "dark"
          ? "bg-black text-white"
          : "bg-gray-100 text-black"
      }`}
    >
      <ToastContainer position="top-right" autoClose={3000} />

      <h2 className="text-3xl font-bold mb-6 text-center">
        🎥 All Movies
      </h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6 justify-center">
        {[
          "Action","Comedy","Drama","Horror","Musical","Sport",
          "Thriller","Romance","Sci-Fi","Fantasy","Adventure","Mystery",
        ].map((genre) => (
          <label
            key={genre}
            className="flex items-center gap-2 text-sm font-medium"
          >
            <input
              type="checkbox"
              checked={selectedGenres.includes(genre)}
              onChange={() => handleGenreChange(genre)}
              className="accent-blue-600"
            />
            {genre}
          </label>
        ))}

        <input
          type="number"
          placeholder="Min Rating"
          value={minRating}
          onChange={(e) => setMinRating(e.target.value)}
          className={`w-24 px-2 py-1 rounded border ${
            theme === "dark"
              ? "bg-black border-gray-600 text-white"
              : "bg-white border-gray-300 text-black"
          }`}
        />

        <input
          type="number"
          placeholder="Max Rating"
          value={maxRating}
          onChange={(e) => setMaxRating(e.target.value)}
          className={`w-24 px-2 py-1 rounded border ${
            theme === "dark"
              ? "bg-black border-gray-600 text-white"
              : "bg-white border-gray-300 text-black"
          }`}
        />
      </div>

      {/* Movies Grid */}
      {error ? (
        <p className="text-center text-red-500 mt-10">{error}</p>
      ) : filteredMovies.length === 0 ? (
        <p className="text-center text-gray-400">No movies found.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {currentMovies.map((movie) => (
            <div
              key={movie._id}
              className={`p-4 rounded-lg shadow-md transition hover:shadow-xl ${
                theme === "dark"
                  ? "bg-black text-white border border-gray-700"
                  : "bg-white text-black border border-gray-200"
              }`}
            >
              <img
                src={
                  movie.posterUrl ||
                  "https://via.placeholder.com/300x400?text=No+Image"
                }
                alt={movie.title}
                className="w-full h-64 object-cover rounded mb-3"
              />

              <h3 className="text-lg font-semibold mb-1">
                {movie.title}
              </h3>

              <p className="text-sm mb-2">
                🎭 {movie.genre} | 📅 {movie.releaseYear}
              </p>

              <Link
                to={`/movies/${movie._id}`}
                className="inline-block mt-2 px-4 py-2
                  bg-blue-600 hover:bg-blue-700
                  text-white rounded font-semibold"
              >
                Details
              </Link>
            </div>
          ))}
        </div>
      )}

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
                  : theme === "dark"
                  ? "bg-gray-800 text-white hover:bg-gray-700"
                  : "bg-gray-300 text-black hover:bg-gray-400"
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
    </div>
  );
}


export default AllMovies;
