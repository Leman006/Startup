import React from 'react';
import './Card.css';

function Card({ title, value, subtitle, icon }) {
  return (
    <div className="card">
      <div className="card-header">
        {icon && <span className="card-icon">{icon}</span>}
        <h3 className="card-title">{title}</h3>
      </div>
      <div className="card-body">
        <p className="card-value">{value}</p>
        <p className="card-subtitle">{subtitle}</p>
      </div>
    </div>
  );
}

export default Card;

