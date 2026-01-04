import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function WatchList() {
  const { user } = useContext(AuthContext);
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    if (user) {
      axios
        .get("https://movie-master-pro-server-side.vercel.app/watchlist", {
          params: { email: user.email },
        })
        .then((res) => setWatchlist(res.data))
        .catch(() => toast.error("Failed to load watchlist"));
    }
  }, [user]);

  const handleRemove = async (id) => {
    try {
      await axios.delete(
        `https://movie-master-pro-server-side.vercel.app/watchlist/remove/${id}`
      );
      setWatchlist(watchlist.filter((item) => item._id !== id));
      toast.success("Removed from watchlist");
    } catch {
      toast.error("Failed to remove");
    }
  };

  if (!user)
    return (
      <p className="text-center mt-10 text-white">
        Please login to view your watchlist.
      </p>
    );

  return (
    <div className="max-w-7xl mx-auto mt-10 px-4 text-white">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-500">🎬 My Watchlist</h1>

      {watchlist.length === 0 ? (
        <p className="text-center text-gray-400">No movies added yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {watchlist.map((item) => (
            <div
              key={item._id}
              className="bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 flex flex-col"
            >
              <img
                src={
                  item.movie.posterUrl ||
                  "https://via.placeholder.com/300x400?text=No+Image"
                }
                alt={item.movie.title}
                className="w-full h-64 object-cover"
              />

              <div className="p-4 flex flex-col flex-grow">
                <h2 className="text-lg font-bold mb-2 line-clamp-1">
                  {item.movie.title}
                </h2>
                <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                  {item.movie.plotSummary || "No description available."}
                </p>

                <div className="mt-auto space-y-2">
                  <Link
                    to={`/movies/${item.movie._id}`}
                    className="block w-full text-center px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-semibold transition"
                  >
                    Details
                  </Link>

                  <button
                    className="block w-full px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md text-white font-semibold transition"
                    onClick={() => handleRemove(item._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
