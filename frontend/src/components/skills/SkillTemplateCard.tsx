import React from 'react';
import { SkillTemplate } from '../../pages/admin/AgentDetail/tabs/Skills/mockData';
import { IconCheckCircle } from '../common/Icons';

interface SkillTemplateCardProps {
  template: SkillTemplate;
  isActivated?: boolean;
  isActivating?: boolean;
  onActivate?: (template: SkillTemplate) => void;
  onDeactivate?: (template: SkillTemplate) => void;
}

const SkillTemplateCard: React.FC<SkillTemplateCardProps> = ({
  template,
  isActivated = false,
  isActivating = false,
  onActivate,
  onDeactivate
}) => {
  // Mapping color cho category badge
  const colorMap: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    orange: 'bg-orange-50 text-orange-600',
    red: 'bg-red-50 text-red-600',
    purple: 'bg-purple-50 text-purple-600',
  };

  const badgeColorClass = colorMap[template.categoryColor] || colorMap.blue;

  return (
    <div className={`border rounded-xl p-5 flex flex-col transition-colors shadow-sm ${isActivated ? 'border-green-400 bg-green-50/30' : 'border-gray-200 bg-white hover:border-blue-300'
      }`}>
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${isActivated ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'
          }`}>
          {template.icon}
        </div>
        <div className="flex items-center gap-2 flex-wrap flex-1 min-w-0">
          <h4 className="font-semibold text-gray-900 truncate">{template.name}</h4>
          <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold whitespace-nowrap ${badgeColorClass}`}>
            {template.category}
          </span>
        </div>
      </div>

      <p className="text-sm text-gray-500 mb-5 flex-1 line-clamp-2">
        {template.description}
      </p>

      <button
        onClick={() => isActivated ? (onDeactivate && onDeactivate(template)) : (onActivate && onActivate(template))}
        disabled={isActivating}
        className={`w-full py-2.5 rounded-lg text-sm font-medium flex justify-center items-center gap-1.5 transition-colors disabled:opacity-70 ${isActivated
            ? 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
            : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
      >
        {isActivating ? (
          <svg className={`animate-spin -ml-1 mr-2 h-4 w-4 ${isActivated ? 'text-gray-500' : 'text-white'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : isActivated ? (
          <IconCheckCircle className="w-4 h-4 text-green-500" />
        ) : null}
        {isActivated ? 'Đã kích hoạt' : '+ Kích hoạt'}
      </button>
    </div>
  );
};

export default SkillTemplateCard;
