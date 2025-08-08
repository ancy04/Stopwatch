import React, { useState, useEffect, useRef } from 'react';

function App() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null); // To store the interval ID

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 10); // Update every 10ms
      }, 10);
    } else {
      clearInterval(intervalRef.current);
    }

    // Cleanup function to clear interval on unmount
    return () => clearInterval(intervalRef.current);
  }, [isRunning]); // Re-run effect when isRunning changes

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
  };

  // Function to format time for display
  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${String(minutes).padStart(1, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <div>
      <h1>Stopwatch</h1>
      <p>Time: {formatTime(time)}</p>
      {!isRunning? 
      <button onClick={handleStart}>Start</button>:
      <button onClick={handleStop}>Stop</button>}
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}

export default App;


