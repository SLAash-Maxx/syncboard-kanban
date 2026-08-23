import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import FilterBar from './components/FilterBar';
import Column from './components/Column';
import TaskModal from './components/TaskModal';
import { useAuth } from './context/AuthContext';
import * as taskApi from './api/taskApi';
import './App.css';

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