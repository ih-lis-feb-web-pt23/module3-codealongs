import { useState, useEffect } from 'react';

const TimerTwo = ({ appTime }) => {
  const [time, setTime] = useState(0);

  // brand new hook to control the lifecycle
  // useEffect(() => {}, [])

  // useEffect
  // first argument is a function with the code we want to run
  // second argument is the array of dependencies
  // dependencies array empty means the effect will only run once
  useEffect(() => {
    console.log('useEffect: Mounting');
    const id = setInterval(() => {
      setTime(prevTime => prevTime + 1);
      console.log('still running');
    }, 1000);

    // cleanup function
    // stop the interval when we no longer need it
    return () => {
      console.log('Cleanup - Unmounting');
      clearInterval(id);
    };
  }, []); // <-- empty array means this only runs once, when mounting

  return (
    <div>
      <h1>Timer Two</h1>
      <h2>{time}</h2>
      <h3>{appTime}</h3>
    </div>
  );
};

export default TimerTwo;
