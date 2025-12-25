import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import Card from '../Card/Card';
import './Dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-main">
        <Header />
        <div className="dashboard-content">
          <div className="dashboard-grid">
            <Card title="Общая статистика" value="1,234" subtitle="Всего записей" />
            <Card title="Активные пользователи" value="567" subtitle="Онлайн сейчас" />
            <Card title="Доходы" value="$12,345" subtitle="За этот месяц" />
            <Card title="Задачи" value="89" subtitle="В работе" />
          </div>
          <div className="dashboard-section">
            <h2>Последняя активность</h2>
            <div className="activity-list">
              <div className="activity-item">
                <div className="activity-icon">📊</div>
                <div className="activity-content">
                  <p className="activity-title">Новый отчет создан</p>
                  <p className="activity-time">2 минуты назад</p>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-icon">👤</div>
                <div className="activity-content">
                  <p className="activity-title">Пользователь зарегистрирован</p>
                  <p className="activity-time">15 минут назад</p>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-icon">✅</div>
                <div className="activity-content">
                  <p className="activity-title">Задача выполнена</p>
                  <p className="activity-time">1 час назад</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

