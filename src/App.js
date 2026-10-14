import { useState } from 'react';
import './App.css';
import { hasApiKey } from './config/tmdb';
import HomePage from './pages/HomePage';
import MovieDetailPage from './pages/MovieDetailPage';

function App() {
  const [keyword, setKeyword] = useState('');
  const [selectedId, setSelectedId] = useState(null); 

  const goHome = () => {
    setSelectedId(null);
    setKeyword('');
  };

  const renderPage = () => {
    if (!hasApiKey) {
      return (
        <p className="info info--error">
          API key belum diisi. Buat file <code>.env.local</code> berisi{' '}
          <code>REACT_APP_TMDB_API_KEY=xxxx</code> lalu jalankan ulang <code>npm start</code>.
        </p>
      );
    }
    if (selectedId) {
      return (
        <MovieDetailPage
          movieId={selectedId}
          onBack={() => setSelectedId(null)}
          onSelect={setSelectedId}
        />
      );
    }
    return <HomePage keyword={keyword} onSelect={setSelectedId} />;
  };

  return (
    <div className="App">
      <header className="header">
        <h1 onClick={goHome}>CINEMA</h1>
        {!selectedId && (
          <input
            type="search"
            placeholder="Cari film..."
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
          />
        )}
      </header>

      <main className="container">{renderPage()}</main>
    </div>
  );
}

export default App;
