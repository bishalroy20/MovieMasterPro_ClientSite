import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from '../../Layout/Spinner';

function AllMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [minRating, setMinRating] = useState('');
  const [maxRating, setMaxRating] = useState('');

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:3000/movies', {
        params: {
          genres: selectedGenres.join(','), // comma-separated genres
          minRating,
          maxRating,
        },
      });
      setMovies(res.data);
    } catch (err) {
      console.error('Fetch error:', err);
      setError('❌ Failed to fetch movies.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [selectedGenres, minRating, maxRating]);

  const handleGenreChange = (genre) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  if (loading) return <p className="text-center text-white mt-10"><Spinner /></p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="max-w-full mx-auto p-6 bg-gradient-to-r from-gray-900 via-black to-gray-800 text-white rounded shadow-lg">
      <ToastContainer position="top-right" autoClose={3000} />

      <h2 className="text-3xl font-bold mb-6 text-center">🎥 All Movies</h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6 justify-center">
        {/* Genre checkboxes */}
        {[
          'Action',
          'Comedy',
          'Drama',
          'Horror',
          'Musical',
          'Sport',
          'Thriller',
          'Romance',
          'Sci-Fi',
          'Fantasy',
          'Adventure',
          'Mystery'
        ].map((genre) => (
          <label key={genre} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selectedGenres.includes(genre)}
              onChange={() => handleGenreChange(genre)}
            />
            {genre}
          </label>
        ))}

        {/* Rating range */}
        <input
          type="number"
          placeholder="Min Rating"
          value={minRating}
          onChange={(e) => setMinRating(e.target.value)}
          className="input input-bordered w-24 text-black"
        />
        <input
          type="number"
          placeholder="Max Rating"
          value={maxRating}
          onChange={(e) => setMaxRating(e.target.value)}
          className="input input-bordered w-24 text-black"
        />
      </div>

      {movies.length === 0 ? (
        <p className="text-gray-400 text-center">No movies found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {movies.map((movie) => (
            <div key={movie._id} className="bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-200">
              <img
                src={movie.posterUrl || 'https://via.placeholder.com/300x400?text=No+Image'}
                alt={movie.title}
                className="w-full h-64 object-cover rounded mb-3"
              />
              <h3 className="text-xl font-semibold mb-1">{movie.title}</h3>
              <p className="text-gray-400 text-sm mb-1">
                🎭 {movie.genre} | 📅 {movie.releaseYear}
              </p>
              <p className="text-gray-300 text-sm mb-1">
                ⭐ Rating: {movie.rating} | ⏱ {movie.duration || 'N/A'} mins
              </p>
              <p className="text-gray-400 text-sm mb-2">
                🎬 Directed by {movie.director}
              </p>
              <p className="text-gray-300 text-sm mb-2 line-clamp-3">
                {movie.plotSummary}
              </p>
              <Link
                to={`/movies/${movie._id}`}
                className="inline-block mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-semibold"
              >
                Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AllMovies;
