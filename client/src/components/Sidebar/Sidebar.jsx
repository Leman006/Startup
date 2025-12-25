import React from 'react';
import './Sidebar.css';

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1 className="sidebar-logo">Dashboard</h1>
      </div>
      <nav className="sidebar-nav">
        <a href="#dashboard" className="nav-item active">
          <span className="nav-icon">📊</span>
          <span className="nav-text">Главная</span>
        </a>
        <a href="#analytics" className="nav-item">
          <span className="nav-icon">📈</span>
          <span className="nav-text">Аналитика</span>
        </a>
        <a href="#users" className="nav-item">
          <span className="nav-icon">👥</span>
          <span className="nav-text">Пользователи</span>
        </a>
        <a href="#settings" className="nav-item">
          <span className="nav-icon">⚙️</span>
          <span className="nav-text">Настройки</span>
        </a>
        <a href="#reports" className="nav-item">
          <span className="nav-icon">📄</span>
          <span className="nav-text">Отчеты</span>
        </a>
      </nav>
      <div className="sidebar-footer">
        <div className="user-profile">
          <div className="user-avatar">👤</div>
          <div className="user-info">
            <p className="user-name">Администратор</p>
            <p className="user-role">admin@example.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;

