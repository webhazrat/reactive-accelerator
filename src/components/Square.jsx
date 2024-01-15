export default function Square({ value, onSquareClick }) {
  const handleClick = () => {
    onSquareClick();
  };

  return (
    <button
      onClick={handleClick}
      className={`h-20 border text-3xl rounded-md ${
        value === "X"
          ? "border-red-500 bg-red-500 text-white"
          : value === "O"
          ? "border-green-500 bg-green-500 text-white"
          : "border-gray-400"
      }`}
    >
      {value}
    </button>
  );
}
