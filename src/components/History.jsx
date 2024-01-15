export default function History({ history, onJump }) {
  const moves = history.map((_, move) => {
    let description = move > 0 ? `Go to the move #${move}` : "Start the game";
    return (
      <li key={move}>
        <button onClick={() => onJump(move)}>{description}</button>
      </li>
    );
  });
  return <ul className="bg-gray-100 p-4 rounded-md">{moves}</ul>;
}
