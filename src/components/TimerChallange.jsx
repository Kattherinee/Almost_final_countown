import { useRef, useState } from "react";
import ResultModal from "./ResultModal";

export default function TimerChallange({ title, targetTime }) {
  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);

  const timerRef = useRef();
  const dialogRef = useRef();

  const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

  if (timeRemaining <= 0) {
    clearInterval(timerRef.current);

    dialogRef.current.open();
  }

  function handleReset() {
    setTimeRemaining(targetTime * 1000);
  }

  function handleStart() {
    timerRef.current = setInterval(() => {
      setTimeRemaining((prev) => prev - 10);
    }, 10);
    setTimerStarted(true);
  }
  function handleStop() {
    dialogRef.current.open();
    clearInterval(timerRef.current);
  }

  return (
    <>
      <ResultModal
        ref={dialogRef}
        remainingTime={timeRemaining}
        onClose={handleStop}
        targetTime={targetTime}
        onReset={handleReset}
      />

      <section className="challenge">
        <h2>{title}</h2>
        <p className="challemge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerIsActive ? handleStop : handleStart}>
            {timerIsActive ? "Stop" : "Start"} Challenge
          </button>
        </p>
        <p className={timerIsActive ? "active" : undefined}>
          {" "}
          {timerIsActive ? "Timer is running..." : "Timer inactive"}
        </p>
      </section>
    </>
  );
}
