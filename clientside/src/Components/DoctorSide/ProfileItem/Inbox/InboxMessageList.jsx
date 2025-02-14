import React, { useEffect, useRef } from 'react';
import './InboxMessageList.css';

const MessageList = ({ messages }) => {
  const userId = sessionStorage.getItem('userId');
  
  // Create a reference for the message list container
  const messageListRef = useRef(null);

  // Use useEffect to scroll to the bottom of the message list whenever the messages change
  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="message-list-container" ref={messageListRef}>
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`message-item ${msg.senderId === userId ? 'user-message' : 'doctor-message'}`}
        >
          <div
            className={`message-bubble ${msg.senderId === userId ? 'user-bubble' : 'doctor-bubble'}`}
          >
            {msg.text}
            {msg.file && <img src={URL.createObjectURL(msg.file)} alt="attachment" />}
          </div>
          <div className="message-timestamp">
            {new Date(msg.timestamp).toLocaleTimeString()}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;