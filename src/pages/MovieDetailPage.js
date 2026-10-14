import { useEffect, useState } from 'react';
import MovieList from '../components/MovieList';
import { IMG_URL } from '../config/tmdb';
import movieService from '../services/movieService';

function MovieDetailPage({ movieId, onBack, onSelect }) {
  const [movie, setMovie] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState('');

 
  useEffect(() => {
    let ignore = false; 

    setMovie(null);
    setError('');
    window.scrollTo(0, 0);

    Promise.all([movieService.getDetail(movieId), movieService.getRecommendations(movieId)])
      .then(([detail, recommendation]) => {
        if (ignore) return;
        setMovie(detail);
        setRecommendations(recommendation.results);
      })
      .catch((err) => {
        if (!ignore) setError(err.message);
      });

    return () => {
      ignore = true;
    };
  }, [movieId]);

  return (
    <div className="movie-detail">
      <button className="back-button" onClick={onBack}>
        &larr; Kembali
      </button>

      {error && <p className="info info--error">{error}</p>}
      {!error && !movie && <p className="info">Loading...</p>}

      {movie && (
        <>
          <div className="movie-detail__content">
            {movie.poster_path && (
              <img src={`${IMG_URL}${movie.poster_path}`} alt={movie.title} />
            )}
            <div>
              <h2>{movie.title}</h2>
              <p className="movie-detail__meta">
                {movie.release_date} &bull; {movie.runtime} menit &bull; &#9733;{' '}
                {movie.vote_average.toFixed(1)}
              </p>
              <p className="movie-detail__meta">
                {movie.genres.map((genre) => genre.name).join(', ')}
              </p>
              {movie.tagline && <p className="movie-detail__tagline">{movie.tagline}</p>}
              <h3>Overview</h3>
              <p>{movie.overview || 'Belum ada sinopsis.'}</p>
            </div>
          </div>

          <MovieList title="Recommendations" movies={recommendations} onSelect={onSelect} />
        </>
      )}
    </div>
  );
}

export default MovieDetailPage;
