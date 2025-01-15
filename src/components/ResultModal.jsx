import { useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

export default function ResultModal({
  ref,
  targetTime,
  remainingTime,
  onReset,
}) {
  const dialog = useRef();

  const userLost = remainingTime <= 0;
  const formattedRamainingTime = (remainingTime / 1000).toFixed(2);
  const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });

  return createPortal(
    <dialog ref={dialog} className="result-modal" open onClose={onReset}>
      {userLost ? <h2>You Lost</h2> : <h2>Your score: {score}</h2>}
      <p>
        The target time was
        <strong> {targetTime} seconds</strong>
      </p>
      <p>
        You stopped timer with
        <strong> {formattedRamainingTime} seconds left</strong>
      </p>
      <form onSubmit={onReset} method="dialog">
        <button>Close</button>
      </form>
    </dialog>,
    document.getElementById("modal")
  );
}
