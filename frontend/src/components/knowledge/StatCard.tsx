import React from 'react';

interface StatCardProps {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  iconBgColor?: string;
  iconColor?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  icon,
  value,
  label,
  iconBgColor = 'bg-blue-50',
  iconColor = 'text-blue-500'
}) => {
  return (
    <div className="flex items-center p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow transition-shadow">
      <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${iconBgColor} ${iconColor} mr-4`}>
        {icon}
      </div>
      <div>
        <div className="text-2xl font-bold text-gray-800 leading-tight">{value}</div>
        <div className="text-sm text-gray-500 font-medium">{label}</div>
      </div>
    </div>
  );
};

export default StatCard;
