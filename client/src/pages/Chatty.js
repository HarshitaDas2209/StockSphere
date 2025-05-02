// src/components/Chatbot.jsx
import React, { useState } from 'react';
// import '../style.css'; // import your CSS

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [query, setQuery] = useState('');

  const sendQuery = async () => {
    if (!query.trim()) return;

    // Add user's query to the chat
    setMessages((prev) => [...prev, { sender: '🧑‍💻', text: query }]);
    setQuery('');

    try {
      const res = await fetch('http://localhost:5050/chat', {
      // const res = await fetch('https://chatbot-2khn.onrender.com//chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { sender: '🤖', text: data.response }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: '🤖', text: '❌ Unable to reach the server.' },
      ]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') sendQuery();
  };

  return (
    <div className="chat-container">
      <h2>🧠 Inventory Assistant</h2>
      <div id="chat-box">
        {messages.map((msg, idx) => (
          <div key={idx} className="message">
            <strong>{msg.sender}</strong>: {msg.text}
          </div>
        ))}
      </div>
      <div className="input-group">
        <input
          type="text"
          id="user-query"
          placeholder="Ask something..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={sendQuery}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
