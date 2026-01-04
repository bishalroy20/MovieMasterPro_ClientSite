import { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import { Link } from "react-router";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Spinner from "../../Layout/Spinner";

export default function TopRatedSlider({ theme }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTopRated() {
      try {
        const res = await axios.get(
          "https://movie-master-pro-server-side.vercel.app/movies/top-rated"
        );
        setMovies(res.data);
      } catch (err) {
        console.error("Failed to load top rated movies:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchTopRated();
  }, []);

  if (loading) return <Spinner />;

  if (!movies.length)
    return (
      <p
        className={`text-center mt-6 text-xl ${
          theme === "dark" ? "text-red-300" : "text-red-600"
        }`}
      >
        No movies found.
      </p>
    );

  const settings = {
    dots: true,
    infinite: true,
    speed: 900,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: true,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 4 } },
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div
      className={`max-w-full mx-auto pt-10 px-4 py-6 rounded-xl shadow-xl ${
        theme === "dark" ? "bg-gray-800" : "bg-gray-100"
      }`}
    >
      <h2
        className={`text-3xl font-bold pb-6 text-center ${
          theme === "dark" ? "text-white" : "text-black"
        }`}
      >
        ⭐ Top Rated Movies
      </h2>

      <Slider {...settings}>
        {movies.map((movie) => (
          <div key={movie._id} className="p-2">
            <Link to={`/movies/${movie._id}`}>
              <div
                className={`rounded-xl overflow-hidden transition transform duration-300 cursor-pointer hover:scale-105 hover:shadow-2xl border ${
                  theme === "dark"
                    ? "bg-gray-900 border-gray-700"
                    : "bg-white border-gray-300"
                }`}
              >
                {/* Full image */}
                <img
                  src={
                    movie.posterUrl ||
                    "https://via.placeholder.com/300x400?text=No+Image"
                  }
                  alt={movie.title}
                  className="w-full h-72 object-cover"
                />

                {/* Content */}
                <div className="p-4">
                  <h3
                    className={`text-base font-semibold truncate ${
                      theme === "dark" ? "text-white" : "text-black"
                    }`}
                  >
                    {movie.title}
                  </h3>
                  <p
                    className={`mt-1 font-bold ${
                      theme === "dark" ? "text-yellow-300" : "text-yellow-600"
                    }`}
                  >
                    ⭐ {movie.rating}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
}
