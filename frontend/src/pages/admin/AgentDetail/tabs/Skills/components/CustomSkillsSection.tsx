import React from 'react';
import { IconLightning } from '../../../../../../components/common/Icons';
import SkillCustomRow from './SkillCustomRow';
import type { SkillBaseResponse } from '../../../../../../types';

interface CustomSkillsSectionProps {
  loading: boolean;
  realCustomSkills: SkillBaseResponse[];
  onEditSkill: (skill: SkillBaseResponse) => void;
  onDeleteSkill: (skillId: string) => void;
  onCreateNew: () => void;
}

const CustomSkillsSection: React.FC<CustomSkillsSectionProps> = ({
  loading,
  realCustomSkills,
  onEditSkill,
  onDeleteSkill,
  onCreateNew
}) => {
  return (
    <div>
      <div className="mb-4">
        <h3 className="text-lg font-bold text-gray-900">Danh sách Skill custom</h3>
        <p className="text-sm text-gray-500">Các skill do bạn tự định nghĩa và cấu hình endpoint</p>
      </div>
      
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : realCustomSkills.length > 0 ? (
        <div className="space-y-3">
          {realCustomSkills.map(skill => (
            <SkillCustomRow 
              key={skill.id} 
              skill={skill} 
              onEdit={onEditSkill}
              onDelete={onDeleteSkill}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white border border-gray-200 border-dashed rounded-xl p-12 text-center">
          <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-3">
            <IconLightning className="w-6 h-6 text-gray-400" />
          </div>
          <h4 className="text-gray-900 font-semibold mb-1">Chưa có Skill custom nào</h4>
          <p className="text-gray-500 text-sm mb-4">Bạn có thể tạo skill mới bằng cách cấu hình API endpoint của riêng bạn.</p>
          <button 
            onClick={onCreateNew}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Tạo Skill đầu tiên
          </button>
        </div>
      )}
    </div>
  );
};

export default CustomSkillsSection;
