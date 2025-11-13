import { Link } from 'react-router-dom';

function MovieCard({ movie }) {
  return (
    <div style={{ border: '1px solid #ccc', padding: 10, margin: 10 }}>
      <img src={movie.posterUrl} alt={movie.title} width="150" />
      <h3>{movie.title}</h3>
      <p>{movie.genre} | {movie.releaseYear}</p>
      <Link to={`/movies/${movie._id}`}>Details</Link>
    </div>
  );
}

export default MovieCard;