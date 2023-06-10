import { useState } from 'react';

const MovieCard = ({ movie, deleteHandler, seenHandler }) => {
  // const [seenMovie, setSeenMovie] = useState(false);

  // const toggleMovie = () => {
  //   // setSeenMovie(!seenMovie) -> WRONG!
  //   setSeenMovie(previousValue => !previousValue);
  // };

  return (
    <div>
      <h2>{movie.title}</h2>
      <p>Director: {movie.director}</p>
      <p>Rating: {movie.IMDBRating}</p>

      {/* Conditional Rendering */}
      {movie.hasOscars && <p>This movie has an Oscar! 🏆</p>}
      {!movie.hasOscars && <p>This movie does not have an Oscar 😔</p>}
      {movie.hasOscars ? <p>Won the Award</p> : <p>Great movie but no Oscar</p>}

      <button onClick={() => deleteHandler(movie._id)}>
        Delete this movie!
      </button>
      <button onClick={() => seenHandler(movie._id)}>
        {movie.seen ? 'Mark as not seen' : 'Mark as seen'}
      </button>
    </div>
  );
};

export default MovieCard;
