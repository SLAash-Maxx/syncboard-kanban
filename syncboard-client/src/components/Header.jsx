import React from 'react';
import { useAuth } from '../context/AuthContext';

function Header({ onOpenCreateModal }) {
  const { user, logout } = useAuth();

  return (
    <header className="header">
      <div className="logo-container">
        <h1 className="logo-text">SyncBoard</h1>
      </div>
      <div className="header-actions">
        {user && <span className="text-muted">Hi, {user.name}</span>}
        <button className="add-task-btn" onClick={onOpenCreateModal}>
          + Add New Task
        </button>
        <button className="logout-btn" onClick={logout}>
          Log Out
        </button>
      </div>
    </header>
  );
}

export default Header;
