import { useState } from 'react';

const Counter = () => {
  // declaring a new state variable called count,
  // where we'll store the count information
  // the setCount is a function to update the value of the state
  // we pass 0 in the useState because that's our initial value
  const [count, setCount] = useState(0);

  const handleMinus = () => {
    if (count > 0) {
      setCount(previousState => previousState - 1);
    }
  };

  const handlePlus = () => {
    setCount(previousState => previousState + 1);
  };

  return (
    <div>
      <h2>Counter</h2>

      <p>The counter is {count}!</p>

      <button onClick={handleMinus}>-</button>
      <button onClick={handlePlus}>+</button>
    </div>
  );
};

export default Counter;
