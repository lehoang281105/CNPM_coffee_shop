import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useKnowledge } from '../../../../../hooks/admin/useKnowledge';
import StatCard from '../../../../../components/knowledge/StatCard';
import AddKnowledgeModal from '../../../../../components/knowledge/AddKnowledgeModal';
import { IconBrand, IconAgent, IconChatbot, IconTotal, IconSync } from '../../../../../components/common/Icons';

import BrandSection from '../../../../../components/tri thức/BrandSection';
import AgentSection from '../../../../../components/tri thức/AgentSection';
import MassChatbotSection from '../../../../../components/tri thức/MassChatbotSection';

interface KnowledgeTabProps {
  bot?: string;
  brandId?: string;
}

const KnowledgeTab: React.FC<KnowledgeTabProps> = ({ bot, brandId }) => {
  const { id: agentId } = useParams<{ id: string }>();
  const {
    documents,
    faqs,
    massModules,
    loading,
    error,
    isToggling,
    toggleMassModule
  } = useKnowledge(agentId);

  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  
  const [expandedSections, setExpandedSections] = useState({
    brand: true,
    agent: true,
    chatbot: true
  });

  const toggleSection = (section: 'brand' | 'agent' | 'chatbot') => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // Derived Stats
  const statBrandCount = documents.length; 
  const statAgentCount = faqs.length;
  const activeModulesCount = massModules.filter(m => m.is_enabled).length;
  const statMassChatbotCount = massModules.filter(m => m.is_enabled).reduce((acc, m) => acc + m.record_count, 0);
  const totalKnowledge = statBrandCount + statAgentCount + statMassChatbotCount;

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8 bg-gray-50 min-h-screen">
      
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Tri thức</h2>
        <div className="flex items-center justify-between">
          <p className="text-gray-500">Quản lý nguồn tri thức phân cấp cho AI Agent</p>
          <button className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 shadow-sm transition-colors">
            <IconSync className="w-4 h-4 mr-2" />
            Đồng bộ tất cả
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard icon={<IconBrand />} value={statBrandCount} label="Tri thức Brand" iconBgColor="bg-blue-50" iconColor="text-blue-500" />
        <StatCard icon={<IconAgent />} value={statAgentCount} label="Tri thức Agent" iconBgColor="bg-green-50" iconColor="text-green-500" />
        <StatCard icon={<IconChatbot />} value={statMassChatbotCount.toLocaleString('vi-VN')} label="Học từ Mass_chatbot" iconBgColor="bg-yellow-50" iconColor="text-yellow-600" />
        <StatCard icon={<IconTotal />} value={totalKnowledge.toLocaleString('vi-VN')} label="Tổng tri thức" iconBgColor="bg-gray-100" iconColor="text-gray-600" />
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          {error}
        </div>
      )}

      {loading ? (
        <div className="animate-pulse space-y-6">
          <div className="h-48 bg-gray-200 rounded-xl w-full"></div>
          <div className="h-48 bg-gray-200 rounded-xl w-full"></div>
        </div>
      ) : (
        <div className="space-y-6">
          <BrandSection 
            documents={documents}
            statBrandCount={statBrandCount}
            isExpanded={expandedSections.brand}
            onToggle={() => toggleSection('brand')}
            onAddSource={() => setIsAddModalOpen(true)}
          />

          <AgentSection 
            faqs={faqs}
            statAgentCount={statAgentCount}
            isExpanded={expandedSections.agent}
            onToggle={() => toggleSection('agent')}
            onAddSource={() => setIsAddModalOpen(true)}
          />

          <MassChatbotSection 
            massModules={massModules}
            activeModulesCount={activeModulesCount}
            isExpanded={expandedSections.chatbot}
            onToggle={() => toggleSection('chatbot')}
            isToggling={isToggling}
            onToggleModule={toggleMassModule}
          />
        </div>
      )}

      {/* Upload Modal */}
      <AddKnowledgeModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onSave={() => setIsAddModalOpen(false)}
      />
    </div>
  );
};

export default KnowledgeTab;
