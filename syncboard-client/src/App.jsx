import React from 'react';
import Header from './components/Header';

function App() {
  return (
    <div>
      <Header />
      <main style={{ padding: '2rem' }}>
        <h2>Welcome to SyncBoard</h2>
        <p style={{ color: '#94a3b8', marginTop: '0.5rem' }}>
          Select or manage your tasks dynamically.
        </p>
      </main>
    </div>
  );
}

export default App;