import { useState } from 'react';

const TimerOne = () => {
  const [time, setTime] = useState(0);

  setInterval(() => {
    setTime(time + 1);
  }, 1000);

  return (
    <div>
      <h1>Timer One</h1>
      <h2>{time}</h2>
    </div>
  );
};

export default TimerOne;
