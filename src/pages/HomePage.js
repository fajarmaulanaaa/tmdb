import { useEffect, useState } from 'react';
import MovieList from '../components/MovieList';
import movieService from '../services/movieService';

function HomePage({ keyword, onSelect }) {
  const [nowPlaying, setNowPlaying] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Ambil data home sekali saja saat halaman pertama kali tampil
  useEffect(() => {
    Promise.all([movieService.getNowPlaying(), movieService.getTopRated()])
      .then(([playing, rated]) => {
        setNowPlaying(playing.results);
        setTopRated(rated.results);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // Cari film setiap keyword berubah, ditunda 500ms (debounce)
  // supaya tidak memanggil API di setiap ketikan
  useEffect(() => {
    if (keyword.trim() === '') {
      setSearchResult([]);
      return;
    }

    let ignore = false;
    const timer = setTimeout(() => {
      movieService
        .search(keyword)
        .then((data) => {
          if (!ignore) setSearchResult(data.results);
        })
        .catch((err) => {
          if (!ignore) setError(err.message);
        });
    }, 500);

    return () => {
      ignore = true;
      clearTimeout(timer);
    };
  }, [keyword]);

  if (error) return <p className="info info--error">{error}</p>;
  if (loading) return <p className="info">Loading...</p>;

  if (keyword.trim() !== '') {
    return (
      <MovieList
        title={`Hasil pencarian "${keyword}"`}
        movies={searchResult}
        onSelect={onSelect}
      />
    );
  }

  return (
    <>
      <MovieList title="Now Playing" movies={nowPlaying} onSelect={onSelect} />
      <MovieList title="Top Rated" movies={topRated} onSelect={onSelect} />
    </>
  );
}

export default HomePage;
