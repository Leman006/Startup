import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <h2 className="header-title">Главная панель</h2>
      </div>
      <div className="header-right">
        <button className="header-icon-btn" title="Уведомления">
          🔔
        </button>
        <button className="header-icon-btn" title="Поиск">
          🔍
        </button>
        <div className="header-date">
          {new Date().toLocaleDateString('ru-RU', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>
    </header>
  );
}

export default Header;

