import React, { useState } from 'react';
import ChatInterface from './components/ChatInterface';

function App() {
  const [hasStarted, setHasStarted] = useState(false);

  return (
    <>
      {!hasStarted ? (
        <div className="glass-panel animate-pop-in" style={{ padding: '3rem', textAlign: 'center', maxWidth: '500px', width: '90%' }}>
          <div style={{ marginBottom: '2rem' }}>
            <span style={{ fontSize: '4rem', display: 'block', marginBottom: '1rem' }}>🗳️</span>
            <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '0.5rem', background: 'linear-gradient(to right, #60a5fa, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              ElectionEdu
            </h1>
            <p style={{ color: '#cbd5e1', fontSize: '1.1rem', lineHeight: '1.6' }}>
              Master the democratic election process step-by-step with your personal AI tutor.
            </p>
          </div>
          <button 
            onClick={() => setHasStarted(true)}
            style={{
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
              color: 'white',
              border: 'none',
              padding: '1rem 2rem',
              fontSize: '1.2rem',
              fontWeight: '600',
              borderRadius: '999px',
              cursor: 'pointer',
              boxShadow: '0 10px 25px rgba(59, 130, 246, 0.5)',
              transition: 'transform 0.2s, box-shadow 0.2s',
              width: '100%'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            onMouseDown={(e) => e.currentTarget.style.transform = 'translateY(1px)'}
          >
            Start Learning
          </button>
        </div>
      ) : (
        <ChatInterface />
      )}
    </>
  );
}

export default App;
