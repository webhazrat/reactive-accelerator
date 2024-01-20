import "./App.css";
import Game from "./components/Game";

function App() {
  return (
    <>
      <div className="max-w-4xl m-auto flex flex-col items-center justify-center h-screen">
        <h1 className="underline text-lg font-bold mb-6">
          React Tic Tac Toe Application
        </h1>
        <Game />
      </div>
    </>
  );
}

export default App;
