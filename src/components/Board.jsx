import Square from "./Square";

export default function Board({ squares, onPlay, isNextX }) {
  const winner = selectWinner(squares);
  let status;
  if (winner) {
    status = `Winner : ${winner}`;
  } else if (squares.every((square) => square)) {
    status = `It's a draw`;
  } else {
    status = `Next Player : ${isNextX ? "X" : "O"}`;
  }

  const handleClick = (i) => {
    if (squares[i] || winner) return;
    const newSquares = [...squares];
    newSquares[i] = isNextX ? "X" : "O";
    onPlay(newSquares);
  };

  return (
    <div>
      <h1 className="mb-4">{status}</h1>
      <div className="grid grid-cols-3 gap-2 w-64">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </div>
  );
}

function selectWinner(squares) {
  const match = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < match.length; i++) {
    const [a, b, c] = match[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
