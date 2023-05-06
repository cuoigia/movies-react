import React, { useState, useEffect } from 'react';
import { getMovieDetails } from '../services/movieService';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import '../styles/MovieDetails.scss';

const MovieDetails = ({id} : {id: number}) => {
  const [movie, setMovie] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (id) {
        setLoading(true);
        setError(false);
        try {
          const movieDetails = await getMovieDetails(id);
          setMovie(movieDetails);
        } catch (error) {
          setError(true);
        }
        setLoading(false);
      }
    };
    fetchMovieDetails();
  }, [id]);

  return (
    <div className="MovieDetails">
      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={''} />}
      {!loading && !error && (
        <>
          <div className="MovieDetails__header">
            <img
              className="MovieDetails__poster"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <div className="MovieDetails__header__info">
              <h1 className="MovieDetails__title">{movie.title}</h1>
              <p className="MovieDetails__release-date">
                Release Date: {movie.release_date}
              </p>
              <p className="MovieDetails__rating">
                Rating: {movie.vote_average}
              </p>
            </div>
          </div>
          <div className="MovieDetails__overview">
            <h2 className="MovieDetails__overview__title">Overview</h2>
            <p className="MovieDetails__overview__text">{movie.overview}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default MovieDetails;
