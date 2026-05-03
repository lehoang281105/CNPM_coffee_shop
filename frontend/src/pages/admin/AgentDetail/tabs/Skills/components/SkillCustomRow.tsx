import React, { useState, useRef, useEffect } from 'react';
import { IconLightning, IconDots, IconEdit, IconTrash } from '../../../../../../components/common/Icons';
import type { SkillBaseResponse } from '../../../../../../types';

interface SkillCustomRowProps {
  skill: SkillBaseResponse;
  executionCount?: string;
  successRate?: string;
  onEdit?: (skill: SkillBaseResponse) => void;
  onDelete?: (skillId: string) => void;
}

const SkillCustomRow: React.FC<SkillCustomRowProps> = ({ 
  skill, 
  executionCount = '0', 
  successRate = '0%',
  onEdit,
  onDelete
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
      <div className="flex items-start gap-4 flex-1 min-w-0">
        <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0 mt-0.5">
          <IconLightning className="w-5 h-5 text-blue-500" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h4 className="font-semibold text-gray-900 truncate">{skill.name}</h4>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-600 border border-blue-100 whitespace-nowrap">
              Custom
            </span>
          </div>
          <p className="text-sm text-gray-500 truncate">
            {skill.description || 'Chưa có mô tả'}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-6 ml-4 flex-shrink-0">
        <div className="text-right">
          <div className="text-sm font-bold text-gray-900">{executionCount}</div>
          <div className="text-[11px] text-gray-500 font-medium">lần • {successRate}</div>
        </div>
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={`text-gray-400 hover:text-gray-600 p-1.5 rounded-lg transition-colors ${isDropdownOpen ? 'bg-gray-100 text-gray-600' : 'hover:bg-gray-100'}`}
          >
            <IconDots className="w-5 h-5" />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-1 w-36 bg-white border border-gray-100 rounded-lg shadow-lg z-10 overflow-hidden py-1">
              <button 
                onClick={() => {
                  setIsDropdownOpen(false);
                  if (onEdit) onEdit(skill);
                }}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
              >
                <IconEdit className="w-4 h-4 text-gray-400" />
                Chỉnh sửa
              </button>
              <button 
                onClick={() => {
                  setIsDropdownOpen(false);
                  if (onDelete) onDelete(skill.id);
                }}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
              >
                <IconTrash className="w-4 h-4 text-red-500" />
                Xóa
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SkillCustomRow;
