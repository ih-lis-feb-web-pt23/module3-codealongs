import './App.css';
// import Counter from './components/Counter';
import { useState } from 'react';
import MovieList from './components/MovieList';
import Spinner from './components/Spinner';

function App() {
  const [mode, setMode] = useState('light');
  const isLoading = true;

  const switchMode = event => {
    // the whole event object
    // console.log(event);
    // the user selected value is inside event.target.value
    setMode(event.target.value);
  };

  // if (isLoading) {
  //   return <Spinner />;
  // }

  return (
    <div>
      <div className={`App ${mode}`}>
        {/* <Counter /> */}
        {/* {isLoading && <Spinner />} */}
        {/* {isLoading ? <Spinner /> : <MovieList />} */}
        <MovieList />
      </div>
      <footer>
        <p>Select your preferred mode:</p>
        <select onChange={switchMode}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </footer>
    </div>
  );
}

export default App;
