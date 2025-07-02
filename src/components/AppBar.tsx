import React from 'react';
import './Navbar.css';

const AppBar: React.FC = () => {
  return (
    <header className="appbar">
      <div className="appbar-left">
        <h3>Dashboard</h3>
      </div>
      <div className="appbar-right">
        <span className="appbar-icon">🔍</span>
        <span className="appbar-icon">⚙️</span>
        <span className="appbar-icon">👤</span>
      </div>
    </header>
  );
};

export default AppBar; 