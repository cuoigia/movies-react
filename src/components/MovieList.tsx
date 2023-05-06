import React, { useEffect, useMemo, useState } from "react";
import MovieListItem from "./MovieListItem";
import MovieGridItem from "./MovieGridItem";
import MovieDetails from "./MovieDetails";
import { Movie } from "../services/movieService";
import "../styles/MovieList.scss";

interface MovieListProps {
  movies: Movie[];
  viewType: string;
}

function MovieList({ movies, viewType }: MovieListProps) {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const handleClickMovie = (movie: React.SetStateAction<Movie | null>) => {
    setSelectedMovie(movie);
  };

  const renderMovies = useMemo(() => {
    if (viewType === "list") {
      return movies.map((movie) => (
        <MovieListItem
          key={movie.id}
          movie={movie}
          onClick={() => handleClickMovie(movie)}
        />
      ));
    } else {
      return movies.map((movie) => (
        <MovieGridItem
          key={movie.id}
          movie={movie}
          onClick={() => handleClickMovie(movie)}
        />
      ));
    }
  }, [movies, viewType]);

  const handleModalClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (target.classList.contains("modal")) {
      setSelectedMovie(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleModalClick);
    return () => {
      document.removeEventListener("mousedown", handleModalClick);
    };
  }, []);

  return (
    <div className={`MovieList ${viewType}`}>
      {renderMovies}
      {!selectedMovie ? (
        <>!selectedMovie</>
      ) : (
        <div className="modal">
          <div className="modal-content">
            <button className="close" onClick={() => setSelectedMovie(null)}>
              &times;
            </button>
            <MovieDetails id={selectedMovie.id} />
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieList;
