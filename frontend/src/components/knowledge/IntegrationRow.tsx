import React from 'react';
import type { IntegrationRowProps } from '../../types';

const IntegrationRow: React.FC<IntegrationRowProps> = ({
  module,
  icon,
  isLoading = false,
  disabledText = 'Chưa bật',
  onToggle,
  iconBgColor = 'bg-blue-100',
  iconColor = 'text-blue-600'
}) => {
  const { id, title, description, is_enabled, record_count } = module;

  const containerClasses = is_enabled
    ? "border-blue-200 bg-blue-50/50"
    : "border-gray-200 bg-white hover:bg-gray-50/50";

  const handleToggle = () => {
    if (!isLoading) {
      onToggle(id, is_enabled);
    }
  };

  return (
    <div 
      className={`flex items-center p-4 border rounded-xl mb-2 transition-colors cursor-pointer ${containerClasses} ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}
      onClick={handleToggle}
    >
      {/* Checkbox */}
      <div className="flex items-center mr-4">
        <input
          type="checkbox"
          checked={is_enabled}
          readOnly
          className="w-5 h-5 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 cursor-pointer pointer-events-none"
        />
      </div>

      {/* Icon Area */}
      <div className={`flex items-center justify-center flex-shrink-0 w-10 h-10 mr-4 rounded-xl ${is_enabled ? iconBgColor : 'bg-gray-100'} ${is_enabled ? iconColor : 'text-gray-400'}`}>
        {icon}
      </div>

      {/* Content Area */}
      <div className="flex-1 min-w-0 mr-4">
        <div className={`font-medium ${is_enabled ? 'text-gray-900' : 'text-gray-500'}`}>{title}</div>
        <div className="text-sm text-gray-500 truncate">{description}</div>
      </div>

      {/* Action / Count Area */}
      <div className="flex-shrink-0 text-sm font-semibold">
        {is_enabled ? (
          <span className="text-blue-700">
            {record_count ? record_count.toLocaleString('vi-VN') : 0} bản ghi
          </span>
        ) : (
          <span className="text-gray-400 font-normal">{disabledText}</span>
        )}
      </div>
    </div>
  );
};

export default IntegrationRow;
