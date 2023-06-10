import movieData from '../movies-data.json';
import { useState } from 'react';
import MovieCard from './MovieCard';
import Summary from './Summary';
import AddMovie from './AddMovie';

const mapMovieData = movies => {
  return movies.map(movie => {
    return {
      // using the spread to keep all the previous properties
      ...movie,
      seen: false
    };
  });
};

const MovieList = () => {
  const [movies, setMovies] = useState(mapMovieData(movieData));
  const [nrSeenMovies, setNrSeenMovies] = useState(0);

  const deleteMovie = movieId => {
    // console.log(movieId);
    const filteredMovies = movies.filter(movie => {
      return movieId !== movie._id;
    });

    setMovies(filteredMovies);
  };

  const toggleSeen = movieId => {
    // create a copy of the movies array
    const updatedMovies = [...movies];

    updatedMovies.forEach(movie => {
      if (movieId === movie._id) {
        movie.seen = !movie.seen;
      }
    });

    setMovies(updatedMovies);

    const seenMovies = updatedMovies.reduce((acc, curr) => {
      if (curr.seen) {
        acc++;
      }
      return acc;
    }, 0);

    setNrSeenMovies(seenMovies);
  };

  const addNewMovie = movieObject => {
    const updatedMovies = [...movies, movieObject];

    setMovies(updatedMovies);
  };

  return (
    <div>
      <h1>Movie List</h1>
      <AddMovie addMovieHandler={addNewMovie} />
      <Summary seenMovies={nrSeenMovies} />
      {movies.map(movie => {
        return (
          <MovieCard
            key={movie._id}
            movie={movie}
            deleteHandler={deleteMovie}
            seenHandler={toggleSeen}
          />
        );
      })}
    </div>
  );
};

export default MovieList;
