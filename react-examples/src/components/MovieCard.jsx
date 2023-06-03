const MovieCard = ({ movie, deleteHandler }) => {
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
    </div>
  );
};

export default MovieCard;
