import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import MovieList from "./components/MovieList";
import SearchBar from "./components/SearchBar";
import SegmentedControl from "./components/SegmentedControl";
import {
  getNowPlayingMovies,
  getTopRatedMovies,
  getMovies,
  Movie,
} from "./services/movieService";
import "./styles/App.scss";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorMessage from "./components/ErrorMessage";
import MovieDetailsPage from "./pages/MovieDetailsPage";

const App = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [viewType, setViewType] = useState("list");
  const [movieTag, setMovieTag] = useState("now_playing");

  const handleSearch = async (e: string | undefined) => {
    setLoading(true);
    setError(false);
    setErrorMessage("");
    try {
      const movies = await getMovies(e);
      setMovies(movies);
      setMovieTag("");
    } catch (error) {
      setError(true);
      setErrorMessage(error as string);
    }
    setLoading(false);
  };

  const handleSegmentedControlChange = async (option: string) => {
    setLoading(true);
    setError(false);
    setErrorMessage("");
    try {
      let movies = [];
      if (option === "now_playing") {
        movies = await getNowPlayingMovies(option);
      } else {
        movies = await getTopRatedMovies(option);
      }
      setMovieTag(option);
      setMovies(movies);
    } catch (error) {
      setError(true);
      setErrorMessage(error as string);
    }
    setLoading(false);
  };

  useEffect(() => {
    handleSegmentedControlChange("now_playing");
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <header>
          <SearchBar onSearch={handleSearch} />
          <SegmentedControl
            options={[
              { label: "Now Playing", value: "now_playing" },
              { label: "Top Rated", value: "top_rated" },
            ]}
            className={movieTag}
            onChange={handleSegmentedControlChange}
          />
          <div className="viewtype-control">
            <button
              className={viewType === "list" ? "active" : ""}
              onClick={() => setViewType("list")}
            >
              ⋮
            </button>
            <button
              className={viewType === "grid" ? "active" : ""}
              onClick={() => setViewType("grid")}
            >
              ∷
            </button>
          </div>
        </header>

        {loading && <LoadingSpinner />}
        {error && <ErrorMessage message={errorMessage} />}
        {!loading && !error && (
          <div style={{ marginTop: "60px" }}>
            <Routes>
              <Route path="/about" element={<div>This is about page</div>} />
              <Route
                path="/"
                element={<MovieList movies={movies} viewType={viewType} />}
              />
              <Route path="/movie/:id" element={<MovieDetailsPage />} />
            </Routes>
          </div>
        )}
        <footer>
          <ul role="navigation">
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/">Movie</Link>
            </li>
          </ul>
        </footer>
      </div>
    </BrowserRouter>
  );
};

export default App;
