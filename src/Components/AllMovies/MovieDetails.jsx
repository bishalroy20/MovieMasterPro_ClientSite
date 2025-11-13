import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/movies/${id}`)
      .then(res => setMovie(res.data));
  }, [id]);

  if (!movie) return <p>Loading...</p>;

  return (
    <div>
      <h1>{movie.title}</h1>
      <img src={movie.posterUrl} alt={movie.title} width="200" />
      <p>{movie.plotSummary}</p>
      <p><strong>Director:</strong> {movie.director}</p>
      <p><strong>Cast:</strong> {movie.cast}</p>
      <p><strong>Rating:</strong> {movie.rating}</p>
    </div>
  );
}

export default MovieDetails;