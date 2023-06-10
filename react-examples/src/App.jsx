import './App.css';
// import Counter from './components/Counter';
import { useState, useEffect } from 'react';
import MovieList from './components/MovieList';
import Spinner from './components/Spinner';
import Summary from './components/Summary';
import TimerOne from './components/TimerOne';
import TimerTwo from './components/TimerTwo';
import TimerThree from './components/TimerThree';

function App() {
  const [mode, setMode] = useState('light');
  const [showTimer, setShowTimer] = useState(true);
  const [appTime, setAppTime] = useState(0);

  const isLoading = true;

  useEffect(() => {
    console.log('useEffect: Mounting');
    const id = setInterval(() => {
      setAppTime(prevTime => prevTime + 1);
      console.log('still running');
    }, 1000);

    // cleanup function
    // stop the interval when we no longer need it
    return () => {
      console.log('Cleanup - Unmounting');
      clearInterval(id);
    };
  }, []);

  const switchMode = event => {
    // the whole event object
    // console.log(event);
    // the user selected value is inside event.target.value
    setMode(event.target.value);
  };

  // if (isLoading) {
  //   return <Spinner />;
  // }

  const handleToggle = () => {
    setShowTimer(prevState => !prevState);
  };

  return (
    <div>
      <div className={`App ${mode}`}>
        {/* <Counter /> */}
        {/* {isLoading && <Spinner />} */}
        {/* {isLoading ? <Spinner /> : <MovieList />} */}
        {/* <MovieList /> */}
        {/* <TimerOne /> */}
        {showTimer && <TimerTwo appTime={appTime} />}
        {/* <TimerThree /> */}
        <button onClick={handleToggle}>
          {showTimer ? 'Hide timer' : 'Show timer'}
        </button>
      </div>
      <footer>
        <p>Select your preferred mode:</p>
        <select onChange={switchMode}>
          <option value='light'>Light</option>
          <option value='dark'>Dark</option>
        </select>
      </footer>
    </div>
  );
}

export default App;
