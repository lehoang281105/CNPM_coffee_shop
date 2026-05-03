import React, { useState, useRef, useEffect } from 'react';
import type { SourceType, SourceCardProps } from '../../types';
import { 
  IconWebsite, 
  IconPDF, 
  IconAgent, 
  IconDots, 
  IconSync, 
  IconEdit, 
  IconTrash 
} from '../common/Icons';

const getIconForType = (type: SourceType) => {
  switch (type) {
    case 'Website': return <IconWebsite />;
    case 'PDF': return <IconPDF />;
    case 'FAQ': return <IconAgent />;
    default: return null;
  }
};

const getColorsForType = (type: SourceType, hasError: boolean) => {
  if (hasError) return 'bg-red-50 text-red-500';
  switch (type) {
    case 'Website': return 'bg-green-50 text-green-600';
    case 'PDF': return 'bg-green-50 text-green-600';
    case 'FAQ': return 'bg-green-50 text-green-600';
    default: return 'bg-gray-50 text-gray-500';
  }
};

const SourceCard: React.FC<SourceCardProps> = ({
  title,
  type,
  recordCount,
  timeText,
  hasError = false,
  errorMessage = 'Lỗi đọc file',
  onFixError,
  onActionClick
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const containerClasses = hasError
    ? "border-red-200 bg-red-50/50"
    : "border-gray-200 bg-white hover:border-blue-300 hover:shadow-md transition-all";

  return (
    <div className={`flex items-start p-4 border rounded-xl relative ${containerClasses} ${isMenuOpen ? 'z-50' : 'z-10'}`}>
      {/* Icon Area */}
      <div className={`flex items-center justify-center flex-shrink-0 w-10 h-10 mr-3 rounded-xl ${getColorsForType(type, hasError)}`}>
        {getIconForType(type)}
      </div>

      {/* Content Area */}
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-gray-900 truncate mb-1">{title}</h4>
        
        <div className="flex items-center mb-1">
          <span className="inline-block px-2 py-0.5 text-xs font-medium text-gray-600 bg-gray-100 rounded-full mr-2">
            {type}
          </span>
        </div>

        <div className="text-xs text-gray-500 flex items-center">
          {recordCount} bài <span className="mx-1">•</span> {hasError ? <span className="text-red-500 font-medium">{errorMessage}</span> : timeText}
        </div>
      </div>

      {/* Actions Area */}
      <div className="flex items-center ml-2 relative" ref={menuRef}>
        {hasError ? (
          <button 
            onClick={onFixError}
            className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 mr-2"
          >
            Sửa lỗi
          </button>
        ) : null}
        
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setIsMenuOpen(!isMenuOpen);
            onActionClick?.();
          }}
          className={`p-1 rounded focus:outline-none transition-colors ${isMenuOpen ? 'bg-gray-200 text-gray-700' : 'text-gray-400 hover:bg-gray-100 hover:text-gray-600'}`}
        >
          <IconDots />
        </button>

        {/* Dropdown Menu */}
        {isMenuOpen && (
          <div className="absolute right-0 top-full mt-1 w-32 bg-white rounded-lg shadow-xl border border-gray-100 py-1 z-[100]">
            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center">
              <IconSync className="w-4 h-4 mr-2" />
              Đồng bộ
            </button>
            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center">
              <IconEdit className="w-4 h-4 mr-2" />
              Sửa
            </button>
            <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center border-t border-gray-100 mt-1 pt-1">
              <IconTrash className="w-4 h-4 mr-2" />
              Xóa
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SourceCard;
