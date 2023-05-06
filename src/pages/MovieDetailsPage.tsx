import { useParams } from 'react-router-dom';
import MovieDetails from '../components/MovieDetails';
import '../styles/MovieDetails.scss';

const MovieDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  return (
    id ? <MovieDetails id={parseInt(id)} /> : <>No ID</>
  );
};

export default MovieDetailsPage;
