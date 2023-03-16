import React, { useState } from 'react';
import Chatbox from './Chatbox';

const API_KEY = import.meta.env.VITE_API_KEY;

const ChatboxToggle = () => {
  const [showChatbox, setShowChatbox] = useState(false);

  const toggleChatbox = () => {
    setShowChatbox(!showChatbox);
  };

  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
      <button onClick={toggleChatbox}>Ask about Ridwan</button>
      {showChatbox && <Chatbox apiKey={API_KEY} />}
    </div>
  );
};

export default ChatboxToggle;
