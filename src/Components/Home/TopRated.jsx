import { useEffect, useState } from "react";
import axios from "axios";

export default function TopRated() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMovies() {
      try {
        const res = await axios.get("http://localhost:3000/movies/top-rated");
        setMovies(res.data);
      } catch (err) {
        console.error("Failed to load top movies:", err);
      } finally {
        setLoading(false);
      }
    }

    loadMovies();
  }, []);

  if (loading)
    return <p className="text-center text-gray-300 mt-6 text-xl">Loading top movies...</p>;

  if (!movies.length)
    return <p className="text-center text-red-400 mt-6 text-xl">No movies found</p>;

  return (
    <div className="max-w-full mx-auto py-10 px-4 bg-gray-900 text-white">
      <h2 className="text-3xl font-bold mb-6 text-white text-center">🔥 Top Rated Movies</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {movies.map((m) => (
          <div
            key={m._id}
            className="bg-gray-900 rounded-xl shadow-lg overflow-hidden hover:scale-105 transition transform duration-300"
          >
            <img
              src={m.posterUrl || "https://via.placeholder.com/300x400?text=No+Image"}
              alt={m.title}
              className="w-full h-60 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-white">{m.title}</h3>
              <p className="text-yellow-400 font-bold mt-2">⭐ Rating: {m.rating}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
