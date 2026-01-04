import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // ✅ FIXED
import axios from "axios";
import Spinner from "../../Layout/Spinner";

export default function Featured_movies({theme}) {
  const [featured, setFeatured] = useState([]);
  const [current, setCurrent] = useState(0);
  const delay = 5000;

  useEffect(() => {
    async function fetchFeatured() {
      try {
        const res = await axios.get(
          "https://movie-master-pro-server-side.vercel.app/featured-movies"
        );
        setFeatured(res.data);
      } catch (err) {
        console.error("Failed to load featured movies:", err);
      }
    }
    fetchFeatured();
  }, []);

  useEffect(() => {
    if (featured.length === 0) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % featured.length);
    }, delay);

    return () => clearInterval(interval);
  }, [featured.length, delay]);

  if (featured.length === 0) {
    return (
      // <div className="h-[400px] flex items-center justify-center bg-gray-800 text-white">
        <Spinner />
      // </div>
    );
  }

  return (
    <div className="relative w-full h-[65vh] overflow-hidden rounded-xl shadow-2xl">
      {/* Slides wrapper */}
      <div
        className="flex h-full transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {featured.map((movie) => (
          <div
            key={movie._id}
            className="min-w-full h-full relative flex items-center"
            style={{
              backgroundImage: `url(${movie.poster})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60"></div>

            {/* Content */}
            <div className="relative z-10 max-w-2xl px-6 md:px-12 text-white">
              <h2 className="text-3xl md:text-5xl font-extrabold drop-shadow-lg">
                {movie.title}
              </h2>
              <p className="mt-2 text-gray-100 text-sm md:text-lg">
                🎭 {movie.genre} | 📅 {movie.year}
              </p>
              <p className="mt-4 text-gray-100 line-clamp-3">
                {movie.description ||
                  "Discover this featured movie from our collection."}
              </p>

              <Link to={`/movies/${movie.movie_id}`}>
              <a className="btn btn-outline"> View Details</a>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Arrows */}
      <button
        onClick={() =>
          setCurrent((prev) => (prev - 1 + featured.length) % featured.length)
        }
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70"
      >
        ❮
      </button>

      <button
        onClick={() => setCurrent((prev) => (prev + 1) % featured.length)}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70"
      >
        ❯
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 w-full flex justify-center gap-3">
        {featured.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              current === index ? "bg-yellow-400 scale-125" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
