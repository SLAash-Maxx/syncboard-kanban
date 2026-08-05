import React from 'react';

const Header = () => {
  return (
    <header style={styles.header}>
      <div style={styles.logoContainer}>
        <h1 style={styles.title}>SyncBoard</h1>
        <span style={styles.badge}>Kanban</span>
      </div>
      <div style={styles.userSection}>
        <span style={styles.teamBadge}>Team Sync</span>
      </div>
    </header>
  );
};

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: '#1e293b',
    borderBottom: '1px solid #334155',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#38bdf8',
  },
  badge: {
    backgroundColor: '#0284c7',
    color: '#ffffff',
    padding: '0.2rem 0.5rem',
    borderRadius: '4px',
    fontSize: '0.75rem',
    fontWeight: '600',
  },
  userSection: {
    display: 'flex',
    alignItems: 'center',
  },
  teamBadge: {
    color: '#94a3b8',
    fontSize: '0.9rem',
  }
};

export default Header;