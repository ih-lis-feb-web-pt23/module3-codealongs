import { useState, useEffect } from 'react';

const TimerThree = () => {
  const [time, setTime] = useState(0);

  // useEffect
  // first argument is a function with the code we want to run
  // second argument is the array of dependencies
  // dependencies array empty means the effect will only run once
  useEffect(() => {
    console.log('useEffect: Mounting');
    const id = setInterval(() => {
      setTime(prevTime => prevTime + 1);
    }, 1000);

    // cleanup function
    // stop the interval when we no longer need it
    return () => {
      console.log('Cleanup - Unmounting');
      clearInterval(id);
    };
  }, []); // <-- empty array means this only runs once, when mounting

  // we'll use a new useEffect to update the title of the page
  useEffect(() => {
    console.log('Updating!');
    document.title = time;
  }, [time]); // dependency array: we want to run this every time the state changes

  return (
    <div>
      <h1>Timer Three</h1>
      <h2>{time}</h2>
    </div>
  );
};

export default TimerThree;
