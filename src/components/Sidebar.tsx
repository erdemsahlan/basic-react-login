import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { useToast } from '../context/ToastContext';
import './Navbar.css';

const Sidebar: React.FC = () => {
  const { logout } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    showToast('info', 'Çıkış Yapıldı', 'Başarıyla çıkış yapıldı');
    navigate('/login');
  };

  const menuItems = [
    { path: '/', label: 'Ana Sayfa', icon: '🏠' },
    { path: '/customers', label: 'Müşteriler', icon: '��' },
    { path: '/products', label: 'Ürünler', icon: '📦' },
    { path: '/profile', label: 'Profil', icon: '👤' },
    { path: '/settings', label: 'Ayarlar', icon: '⚙️' },
    { path: '/reports', label: 'Raporlar', icon: '📋' },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="navbar">
      <div className="navbar-header">
        <h2> UYUM PAMUK</h2>
      </div>
      <nav className="navbar-menu">
        {menuItems.map((item) => (
          <div
            key={item.path}
            className={`navbar-item ${isActive(item.path) ? 'active' : ''}`}
            onClick={() => navigate(item.path)}
          >
            <span className="navbar-icon">{item.icon}</span>
            <span className="navbar-label">{item.label}</span>
          </div>
        ))}
      </nav>
      <div className="navbar-footer">
        <div className="navbar-item logout-item" onClick={handleLogout}>
          <span className="navbar-icon">🚪</span>
          <span className="navbar-label">Çıkış Yap</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar; 