import { useState } from 'react';

const AddMovie = ({ addMovieHandler }) => {
  const [title, setTitle] = useState('');
  const [director, setDirector] = useState('');
  const [IMDBRating, setIMDBRating] = useState(0);
  const [hasOscars, setHasOscars] = useState(false);

  const handleTitle = (event) => {
    // console.log(event)
    setTitle(event.target.value);
  };

  // expanded, traditional form
  const handleDirector = (event) => {
    setDirector(event.target.value);
  };

  // inline, just a short form
  const handleIMDBRating = (event) => setIMDBRating(event.target.value);

  // deconstructing the event object
  const handleHasOscars = ({ target }) => {
    // checkbox has checked property instead of value
    setHasOscars(target.checked);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const id = `${title}${Math.floor(Math.random() * 10000)}`;

    const newMovie = {
      title,
      director,
      IMDBRating,
      hasOscars,
      _id: id
    };

    // console.log(newMovie);

    // lifting the state up
    // sending the movie info to the parent component
    // using a method that comes from props
    addMovieHandler(newMovie);

    // clearing the form inputs
    setTitle('');
    setDirector('');
    setIMDBRating(0);
    setHasOscars(false);
  };

  return (
    <div>
      <h2>Add a new movie!</h2>

      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input type='text' name='title' value={title} onChange={handleTitle} />

        <label>Director:</label>
        <input
          type='text'
          name='director'
          value={director}
          onChange={handleDirector}
        />

        <label>IMDB Rating:</label>
        <input
          type='number'
          name='IMDBRating'
          value={IMDBRating}
          onChange={handleIMDBRating}
        />

        <label>Won Oscars:</label>
        <input
          type='checkbox'
          name='hasOscars'
          checked={hasOscars}
          onChange={handleHasOscars}
        />

        <button type='submit'>Add a movie!</button>
      </form>
    </div>
  );
};

export default AddMovie;
