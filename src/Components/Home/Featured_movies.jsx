import { useEffect, useState } from "react";
import axios from "axios";

export default function Featured_movies() {
 
  const [featured, setFeatured] = useState([]);
  const [current, setCurrent] = useState(0);
  const delay = 2500; // 2.5 seconds

  useEffect(() => {
    async function fetchFeatured() {
      try {
        const res = await axios.get("http://localhost:3000/featured-movies");
        setFeatured(res.data);
      } catch (err) {
        console.error("Failed to load featured movies:", err);
      }
    }
    fetchFeatured();
  }, []);

  // Auto-slide effect
  useEffect(() => {
    if (featured.length === 0) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % featured.length);
    }, delay);

    return () => clearInterval(interval);
  }, [featured]);

  if (featured.length === 0) {
    return (
      <div className="h-[400px] flex items-center justify-center bg-gray-800 text-white">
        Loading Featured Movies...
      </div>
    );
  }

  return (
    <div className="relative w-full h-[400px] pt-6 bg-gray-800 overflow-hidden rounded-xl shadow-xl">
      {/* Slides wrapper */}
      <div
        className="flex transition-transform duration-[900ms] ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {featured.map((movie) => (
          <div
            key={movie._id}
            className="min-w-full h-[600px] relative"
          >
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full h-full object-cover opacity-90"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>

            {/* Text Content */}
            <div className="absolute bottom-8 left-8 text-white drop-shadow-xl">
              <h2 className="text-3xl md:text-4xl font-bold">
                {movie.title}
              </h2>
              <p className="text-gray-200 mt-2 max-w-md line-clamp-2">
                {movie.description || "A featured movie from our collection."}
              </p>

                
            </div>
          </div>
        ))}
      </div>

      {/* Dot Indicators */}
      <div className="absolute bottom-4 w-full flex justify-center gap-2">
        {featured.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              current === index ? "bg-white scale-125" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}