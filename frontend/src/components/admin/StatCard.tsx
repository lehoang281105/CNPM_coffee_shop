import React from 'react';

export interface StatCardProps {
  iconClass: string;
  label: string;
  value: number | null;
  colorMod: 'blue' | 'green' | 'orange' | 'purple';
}

const StatCard: React.FC<StatCardProps> = ({ iconClass, label, value, colorMod }) => (
  <div className="stat-card">
    <div className={`stat-icon stat-icon--${colorMod}`}><i className={iconClass}></i></div>
    <div className="stat-info">
      <span className="stat-label">{label}</span>
      {value === null
        ? <span className="stat-value stat-value--skeleton" aria-label="Đang tải" />
        : <span className="stat-value">{value.toLocaleString()}</span>
      }
    </div>
  </div>
);

export default StatCard;
