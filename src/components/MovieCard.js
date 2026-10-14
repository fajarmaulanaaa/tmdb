import { IMG_URL } from '../config/tmdb';

function MovieCard({ movie, onSelect }) {
  // release_date formatnya "2024-05-17", kita hanya butuh tahunnya
  const year = movie.release_date ? movie.release_date.slice(0, 4) : '-';

  return (
    <button className="movie-card" onClick={() => onSelect(movie.id)}>
      {movie.poster_path ? (
        <img src={`${IMG_URL}${movie.poster_path}`} alt={movie.title} loading="lazy" />
      ) : (
        <div className="movie-card__no-poster">No Image</div>
      )}
      <h3>{movie.title}</h3>
      <p>{year}</p>
    </button>
  );
}

export default MovieCard;
