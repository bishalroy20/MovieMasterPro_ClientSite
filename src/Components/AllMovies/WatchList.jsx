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
        .get("http://localhost:3000/watchlist", {
          params: { email: user.email }
        })
        .then((res) => setWatchlist(res.data))
        .catch(() => toast.error("Failed to load watchlist"));
    }
  }, [user]);

  const handleRemove = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/watchlist/remove/${id}`);
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
    <div className="max-w-5xl mx-auto mt-10 text-white">
      <h1 className="text-3xl font-bold mb-6">My Watchlist</h1>

      {watchlist.length === 0 ? (
        <p>No movies added yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {watchlist.map((item) => (
            <div key={item._id} className="bg-gray-800 p-4 rounded shadow">
              <img
                src={item.movie.posterUrl}
                className="w-full h-60 object-cover rounded"
              />

              <h2 className="text-lg font-bold mt-2">{item.movie.title}</h2>

              <Link
                to={`/movies/${item.movie._id}`}
                className="inline-block mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-semibold"
              >
                Details
              </Link>

              <button
                className="bg-red-600 w-full mt-3 py-1 rounded"
                onClick={() => handleRemove(item._id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
