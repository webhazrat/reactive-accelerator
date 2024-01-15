import { useState } from "react";
import Board from "./Board";
import History from "./History";

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [isNextX, setIsNextX] = useState(true);
  const [currentMove, setCurrentMove] = useState(0);

  const currentSquares = history[currentMove];

  const handlePlay = (newSquares) => {
    setIsNextX(!isNextX);
    const nextHistory = [...history.slice(0, currentMove + 1), newSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  };

  const handleJump = (move) => {
    setCurrentMove(move);
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-6">
        <Board isNextX={isNextX} squares={currentSquares} onPlay={handlePlay} />
        <History history={history} onJump={handleJump} />
      </div>
    </>
  );
}
