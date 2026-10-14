import MovieCard from './MovieCard';

function MovieList({ title, movies, onSelect }) {
  return (
    <section className="movie-list">
      <h2>{title}</h2>

      {movies.length === 0 ? (
        <p className="info">Tidak ada film.</p>
      ) : (
        <div className="movie-list__grid">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} onSelect={onSelect} />
          ))}
        </div>
      )}
    </section>
  );
}

export default MovieList;
