





import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io(); 

const Contact = () => {
 const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    socket.on("admin-message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });
    return () => socket.off("admin-message");
  }, []);

  const sendMessage = () => {
    if (input.trim()) {
      socket.emit("user-message", input);
      setInput("");
    }
  };

  return (
    <div>
      <h2>WebSocket Chat</h2>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Type message..."
      />
      <button onClick={sendMessage}>Send</button>
      <ul>
        {messages.map((msg, i) => <li key={i}>{msg}</li>)}
      </ul>
    </div>
  );
}

export default Contact
