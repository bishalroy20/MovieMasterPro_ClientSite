import { useEffect, useState, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';
import { toast, ToastContainer } from 'react-toastify';

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); 
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [deleteMovieId, setDeleteMovieId] = useState(null);
  const [isAdded, setIsAdded] = useState(false);


  useEffect(() => {
    async function fetchMovie() {
      try {
        const res = await axios.get(`http://localhost:3000/movies/${id}`);
        setMovie(res.data);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(' Failed to fetch movie details.');
      } finally {
        setLoading(false);
      }
    }
    fetchMovie();
  }, [id]);

  useEffect(() => {
    if (user && movie) {
      axios.get(`http://localhost:3000/watchlist/check`, {
        params: { email: user.email, movieId: movie._id }
      })
      .then(res => setIsAdded(res.data.exists))
      .catch(err => console.log(err));
    }
  }, [user, movie]);


  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/movies/delete/${deleteMovieId}`);
      toast.success(' Movie deleted successfully!');
      navigate('/movies');
    } catch (err) {
      console.error('Delete error:', err);
      toast.error(' Failed to delete movie.');
    }
    setShowModal(false);
  };


  const handleAddWatchlist = async () => {
      if (!user) {
        toast.error("Please login to add watchlist");
        return navigate("/login");
      }

      try {
        const res = await axios.post("http://localhost:3000/watchlist/add", {
          email: user.email,
          movieId: movie._id,
          movie // store full movie
        });

        toast.success("Added to Watchlist!");
        setIsAdded(true);
      } catch (err) {
        toast.error("Already in Watchlist");
      }
    };


  if (loading) return <p className="text-center text-white mt-10">Loading movie details...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;
  if (!movie) return <p className="text-center text-gray-300 mt-10">Movie not found.</p>;

  const isAdder = user && user.email === movie.addedBy; 

  return (
    <div className="max-w-11/12 mx-auto mt-10 p-6 bg-gray-900 text-white rounded shadow-lg">
      <ToastContainer 
        position="top-right"
        autoClose={3000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick
        rtl={false} 
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Link to="/movies" className="btn btn-outline mb-6">← Back to All Movies</Link>

      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={movie.posterUrl || 'https://via.placeholder.com/300x400?text=No+Image'}
          alt={movie.title}
          className="w-full md:w-1/3 h-auto rounded shadow-lg"
        />

        <div className="md:flex-1">
          <h2 className="text-3xl font-bold mb-2">{movie.title}</h2>
          <p className="text-gray-400 mb-1">🎭 Genre: {movie.genre}</p>
          <p className="text-gray-400 mb-1">📅 Release Year: {movie.releaseYear}</p>
          <p className="text-gray-400 mb-1">🎬 Director: {movie.director}</p>
          <p className="text-gray-400 mb-1">👨‍🎤 Cast: {movie.cast}</p>
          <p className="text-yellow-400 mb-1 font-semibold">⭐ Rating: {movie.rating}</p>
          <p className="text-gray-400 mb-1">⏱ Duration: {movie.duration} mins</p>
          <p className="text-gray-400 mb-1">🌐 Language: {movie.language}</p>
          <p className="text-gray-400 mb-1">🏳️ Country: {movie.country}</p>
          <p className="text-gray-300 mt-4">{movie.plotSummary}</p>

          {isAdder && (
            <div className="mt-4 flex gap-3">
              <button
                className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded text-black font-semibold"
                onClick={() => navigate(`/movies/update/${movie._id}`)}
              >
                Edit
              </button>

              <button
                className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded font-semibold"
                onClick={() => { setDeleteMovieId(movie._id); setShowModal(true); }}
              >
                Delete
              </button>


              
            </div>
          )}


          <button
                onClick={handleAddWatchlist}
                disabled={isAdded}
                className={`mt-4 px-4 py-2 rounded font-semibold 
                  ${isAdded ? "bg-gray-600 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}
                `}
              >
                {isAdded ? "✓ Added to Watchlist" : " Add to Watchlist"}
              </button>

        </div>
      </div>


      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded shadow-lg text-white max-w-sm w-full">
            <h3 className="text-xl font-bold mb-4">Confirm Delete</h3>
            <p className="mb-4">Are you sure you want to delete <strong>{movie.title}</strong>?</p>
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-500 hover:bg-gray-600 rounded"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
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

export default MovieDetails;
