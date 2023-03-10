import { useState, useRef } from "react";
import { initialState } from "utils/store/initialState";

const useTimer = () => {

  const [count, setCount] = useState(initialState.timer);
  const [isCounting, setIsCounting] = useState(false);
  const timerRef = useRef();

  const resetTimer = () => setCount(initialState.timer);

  const stopTimer = () => {
    setIsCounting(false);
    clearInterval(timerRef.current);
  };

  const clearTimer = () => {
    stopTimer();
    setCount(0);
  };

  const startTimer = () => {
    setIsCounting(true);
    timerRef.current = setInterval(() => {
      if (count < 999) {
        setCount((prevTime) => prevTime + 1);
      }
    }, 1000);
  };

  return {
    count,
    isCounting,
    reset: resetTimer,
    start: startTimer,
    stop: stopTimer,
    clear: clearTimer,
  };
};

export default useTimer;
