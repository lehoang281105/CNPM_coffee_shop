import React from 'react';
import { IconDatabase, IconSearch } from '../../../../../../components/common/Icons';
import SkillTemplateCard from './SkillTemplateCard';
import { SkillTemplate } from '../mockData';
import type { SkillBaseResponse } from '../../../../../../types';

interface SystemTemplatesSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredTemplates: SkillTemplate[];
  customSkills: SkillBaseResponse[];
  activatingTemplateId: string | null;
  onActivateTemplate: (template: SkillTemplate) => void;
  onDeactivateTemplate: (template: SkillTemplate) => void;
}

const SystemTemplatesSection: React.FC<SystemTemplatesSectionProps> = ({
  searchQuery,
  setSearchQuery,
  filteredTemplates,
  customSkills,
  activatingTemplateId,
  onActivateTemplate,
  onDeactivateTemplate
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
      <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
            <IconDatabase className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900">Skill template hệ thống</h3>
            <p className="text-[13px] text-gray-500">Skill có sẵn tích hợp MASS_chatbot — kích hoạt để dùng ngay</p>
          </div>
        </div>
        <div className="relative w-full sm:w-64">
          <IconSearch className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Tìm skill..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
          />
        </div>
      </div>

      <div className="p-5 bg-gray-50/50">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredTemplates.map((template: SkillTemplate) => {
            const isActivated = customSkills.some(skill => skill.name === template.name);
            return (
              <SkillTemplateCard 
                key={template.id} 
                template={template} 
                isActivated={isActivated}
                isActivating={activatingTemplateId === template.id}
                onActivate={onActivateTemplate}
                onDeactivate={onDeactivateTemplate}
              />
            );
          })}
          {filteredTemplates.length === 0 && (
            <div className="col-span-full py-8 text-center text-gray-500 text-sm">
              Không tìm thấy template nào phù hợp.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SystemTemplatesSection;
