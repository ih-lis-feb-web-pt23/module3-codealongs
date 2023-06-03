import movieData from '../movies-data.json';
import { useState } from 'react';
import MovieCard from './MovieCard';

const MovieList = () => {
  const [movies, setMovies] = useState(movieData);

  const deleteMovie = movieId => {
    // console.log(movieId);
    const filteredMovies = movies.filter(movie => {
      return movieId !== movie._id;
    });

    setMovies(filteredMovies);
  };

  return (
    <div>
      <h1>Movie List</h1>
      {movies.map(movie => {
        return (
          <MovieCard
            key={movie._id}
            movie={movie}
            deleteHandler={deleteMovie}
          />
        );
      })}
    </div>
  );
};

export default MovieList;
