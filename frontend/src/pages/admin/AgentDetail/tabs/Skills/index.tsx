import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSkills } from '../../../../../hooks/admin/useSkills';
import SkillStats from './components/SkillStats';
import CreateSkillModal from './components/CreateSkillModal';
import SystemTemplatesSection from './components/SystemTemplatesSection';
import CustomSkillsSection from './components/CustomSkillsSection';
import { mockTemplates, SkillTemplate } from './mockData';
import { IconPlus } from '../../../../../components/common/Icons';
import type { SkillBaseResponse } from '../../../../../types';

interface SkillsTabProps {
  brandId?: string;
}

const SkillsTab: React.FC<SkillsTabProps> = ({ brandId }) => {
  const { id: agentId } = useParams<{ id: string }>();
  const { 
    customSkills, 
    loading, 
    error, 
    refetch,
    activatingTemplateId,
    activateTemplate,
    deactivateTemplate,
    deleteCustomSkill
  } = useSkills(agentId, brandId);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editSkillData, setEditSkillData] = useState<SkillBaseResponse | null>(null);

  const handleEdit = (skill: SkillBaseResponse) => {
    setEditSkillData(skill);
    setIsCreateModalOpen(true);
  };

  // Lọc template giả định
  const filteredTemplates = mockTemplates.filter((t: SkillTemplate) => 
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    t.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activatedTemplateCount = mockTemplates.filter(t => 
    customSkills.some(skill => skill.name === t.name)
  ).length;

  // Tách biệt những Skill thực sự do user tạo (không trùng tên với template)
  const realCustomSkills = customSkills.filter(skill => 
    !mockTemplates.some(t => t.name === skill.name)
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[22px] font-bold text-gray-900 mb-1">Skills</h2>
          <p className="text-sm text-gray-500">Công cụ AI gọi trong hội thoại để thực hiện thao tác</p>
        </div>
        <button 
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-sm transition-colors"
        >
          <IconPlus className="w-4 h-4 mr-1.5" />
          Tạo Skill custom
        </button>
      </div>

      {/* Stats Cards */}
      <SkillStats 
        customCount={realCustomSkills.length} 
        activatedTemplateCount={activatedTemplateCount}
        totalTemplateCount={mockTemplates.length}
      />

      {/* Error Banner */}
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 flex items-center gap-2">
          <span>{error}</span>
          <button onClick={() => refetch()} className="text-sm font-semibold underline hover:text-red-700 ml-auto">
            Thử lại
          </button>
        </div>
      )}

      {/* Section 1: Template */}
      <SystemTemplatesSection 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filteredTemplates={filteredTemplates}
        customSkills={customSkills}
        activatingTemplateId={activatingTemplateId}
        onActivateTemplate={activateTemplate}
        onDeactivateTemplate={deactivateTemplate}
      />

      {/* Section 2: Custom Skills */}
      <CustomSkillsSection 
        loading={loading}
        realCustomSkills={realCustomSkills}
        onEditSkill={handleEdit}
        onDeleteSkill={deleteCustomSkill}
        onCreateNew={() => setIsCreateModalOpen(true)}
      />

      {/* Modals */}
      <CreateSkillModal 
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          setEditSkillData(null);
        }}
        onSuccess={refetch}
        agentId={agentId}
        brandId={brandId}
        editData={editSkillData}
      />
    </div>
  );
};

export default SkillsTab;
