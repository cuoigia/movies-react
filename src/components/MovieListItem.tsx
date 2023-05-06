import React, { MouseEventHandler, useEffect, useRef } from "react";
import { Movie } from "../services/movieService";
import "../styles/MovieListItem.scss";

interface Props {
  movie: Movie;
  onClick: MouseEventHandler<HTMLDivElement>;
}

const MovieListItem: React.FC<Props> = ({ movie, onClick }) => {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            img.src = img.dataset.src!;
            observer.unobserve(img);
          }
        });
      },
      { rootMargin: "0px 0px 100px 0px" }
    );
    if(imgRef.current) {
      observer.observe(imgRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [imgRef]);

  return <div className="MovieListItem" onClick={onClick}>
    <img
      ref={imgRef}
      className="poster"
      data-src={process.env.REACT_APP_POSTER_URL + movie.poster_path}
      alt={movie.title} />
    <div className="details">
      <h2 className="title">{movie.title}</h2>
      <p className="overview">{movie.overview}</p>
      <p className="release-date">{`Release Date: ${movie.release_date}`}</p>
    </div>
  </div>;
};

export default MovieListItem;
