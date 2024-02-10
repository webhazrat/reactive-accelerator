import { useState, useEffect } from "react";
import { createConnection } from "./utils/chat.js";

const serverUrl = "https://localhost:1234";

function ChatRoom({ roomId }) {
  console.log("start");
  useEffect(() => {
    console.log("Init");
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => {
      console.log("Cleanup");
      connection.disconnect();
    };
  }, [roomId]);
  return <h1>Welcome to the {roomId} room!</h1>;
}

export default function App() {
  const [roomId, setRoomId] = useState("general");
  const [show, setShow] = useState(false);
  return (
    <>
      <label>
        Choose the chat room:{" "}
        <select value={roomId} onChange={(e) => setRoomId(e.target.value)}>
          <option value="general">general</option>
          <option value="travel">travel</option>
          <option value="music">music</option>
        </select>
      </label>
      <button onClick={() => setShow(!show)}>
        {show ? "Close chat" : "Open chat"}
      </button>
      {show && <hr />}
      {show && <ChatRoom roomId={roomId} />}
    </>
  );
}
