import React from 'react';

function Header({ onOpenCreateModal }) {
  return (
    <header className="header">
      <div className="logo-container">
        <h1 className="logo-text">SyncBoard</h1>
      </div>
      <div className="header-actions">
        <button className="add-task-btn" onClick={onOpenCreateModal}>
          + Add New Task
        </button>
      </div>
    </header>
  );
}

export default Header;
