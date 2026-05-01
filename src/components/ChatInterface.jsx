import React, { useState, useEffect, useRef } from 'react';
import './ChatInterface.css';
import { getInitialMessage, getNextStepMessage, handleUserMessage } from '../utils/tutorLogic';

// Simple markdown formatter for bold and headers
const formatMessage = (text) => {
  const parts = text.split('\n');
  return parts.map((part, index) => {
    let formattedPart = part;
    
    // Bold
    const boldRegex = /\*\*(.*?)\*\*/g;
    if (boldRegex.test(formattedPart)) {
      const segments = [];
      let lastIndex = 0;
      formattedPart.replace(boldRegex, (match, p1, offset) => {
        segments.push(formattedPart.slice(lastIndex, offset));
        segments.push(<strong key={offset}>{p1}</strong>);
        lastIndex = offset + match.length;
      });
      segments.push(formattedPart.slice(lastIndex));
      
      formattedPart = <span key={index}>{segments}</span>;
    } else {
      formattedPart = <span key={index}>{formattedPart}</span>;
    }

    if (typeof part === 'string' && part.startsWith('### ')) {
      return <h3 key={index}>{part.replace('### ', '')}</h3>;
    }
    
    return <p key={index} style={{minHeight: part === '' ? '1rem' : 'auto'}}>{formattedPart}</p>;
  });
};

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    // Initial greeting
    setTimeout(() => {
      setMessages([{ sender: 'tutor', text: getInitialMessage() }]);
    }, 500);
  }, []);

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userText = inputText;
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setInputText('');
    setIsTyping(true);

    try {
      const response = await fetch('http://localhost:3000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: userText })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setMessages(prev => [...prev, { sender: 'tutor', text: data.reply || "No reply from AI." }]);
      
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { sender: 'tutor', text: "Something went wrong. Please make sure the backend server is running on http://localhost:3000." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="glass-panel chat-container animate-pop-in">
      <div className="chat-header">
        <h1>ElectionEdu AI</h1>
      </div>
      
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message-wrapper ${msg.sender} animate-pop-in`}>
            <div className="message-bubble">
              {formatMessage(msg.text)}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="message-wrapper tutor animate-pop-in">
            <div className="message-bubble">
              <div className="typing-indicator">
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-area">
        <input 
          type="text" 
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask in Hindi / Marathi / English..."
          disabled={isTyping}
        />
        <button onClick={handleSend} disabled={isTyping || !inputText.trim()}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ChatInterface;
