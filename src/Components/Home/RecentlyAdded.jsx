import { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Spinner from "../../Layout/Spinner";

export default function RecentlyAddedSlider() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecentMovies() {
      try {
        const res = await axios.get(
          "https://movie-master-pro-server-side.vercel.app/movies/recent"
        );
        setMovies(res.data);
      } catch (err) {
        console.error("Failed to load recent movies:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchRecentMovies();
  }, []);

  if (loading) return <Spinner />;

  if (!movies.length)
    return (
      <p className="text-center text-red-400 mt-6 text-xl">No movies found.</p>
    );

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: true,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 6 } },
      { breakpoint: 1024, settings: { slidesToShow: 4 } },
      { breakpoint: 768, settings: { slidesToShow: 3 } },
      { breakpoint: 640, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="max-w-full mx-auto pt-10 px-4 bg-gray-800 py-6 rounded-xl">
      <h2 className="text-3xl font-bold pb-6 text-white text-center">
        🎬 Recently Added
      </h2>

      <Slider {...settings}>
        {movies.map((movie) => (
          <div key={movie._id} className="px-2">
            <div className="bg-gray-900 rounded-xl shadow-lg overflow-hidden hover:scale-105 transition transform duration-300 w-full">
              <img
                src={
                  movie.posterUrl ||
                  "https://via.placeholder.com/300x400?text=No+Image"
                }
                alt={movie.title}
                className="w-full h-60 object-cover"
              />
              <div className="p-3">
                <h3 className="text-sm font-semibold text-white truncate">
                  {movie.title}
                </h3>
                <p className="text-gray-400 text-xs truncate">
                  🎭 {movie.genre} | 📅 {movie.releaseYear}
                </p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
