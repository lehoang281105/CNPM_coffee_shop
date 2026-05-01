import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../../../../services/axiosInstance';
import type { KnowledgeDocument, KnowledgeFAQ, MassModule } from '../../../../../types';
import StatCard from '../../../../../components/knowledge/StatCard';
import AddKnowledgeModal from '../../../../../components/knowledge/AddKnowledgeModal';
import { mockIntegrations } from './mockData';
import { IconBrand, IconAgent, IconChatbot, IconTotal, IconSync } from '../../../../../components/common/Icons';

import BrandSection from './components/BrandSection';
import AgentSection from './components/AgentSection';
import MassChatbotSection from './components/MassChatbotSection';

interface KnowledgeTabProps {
  bot?: string;
  brandId?: string;
}

const KnowledgeTab: React.FC<KnowledgeTabProps> = ({ bot, brandId }) => {
  const { id: agentId } = useParams<{ id: string }>();
  
  const [documents, setDocuments] = useState<KnowledgeDocument[]>([]);
  const [faqs, setFaqs] = useState<KnowledgeFAQ[]>([]);
  const [massModules, setMassModules] = useState<MassModule[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isToggling, setIsToggling] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const [expandedSections, setExpandedSections] = useState({
    brand: true,
    agent: true,
    chatbot: true
  });

  const toggleSection = (section: 'brand' | 'agent' | 'chatbot') => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  useEffect(() => {
    const fetchKnowledgeData = async () => {
      if (!agentId) return;
      try {
        setLoading(true);
        setError(null);
        
        const [docsRes, faqsRes] = await Promise.all([
          axiosInstance.get('/documents', { params: { page: 1, page_size: 100 } }),
          axiosInstance.get('/faqs', { params: { bot_id: agentId, page: 1, page_size: 100 } })
        ]);

        const fetchedDocs = docsRes.data?.data || [];
        const fetchedFaqs = faqsRes.data?.data || [];

        let fetchedMassModules: MassModule[] = [];
        try {
          const massRes = await axiosInstance.get('/mass-modules', { params: { bot_id: agentId } });
          fetchedMassModules = massRes.data?.data || [];
        } catch (err) {
          console.warn("API /mass-modules chưa khả dụng, sử dụng fallback mock data.");
          fetchedMassModules = mockIntegrations.map(m => ({
            id: m.id,
            code: m.id,
            title: m.title,
            description: m.subtext,
            is_enabled: m.checked,
            record_count: m.count
          }));
        }

        setDocuments(fetchedDocs);
        setFaqs(fetchedFaqs);
        setMassModules(fetchedMassModules);

      } catch (err) {
        console.error("Error fetching knowledge:", err);
        setError("Không thể tải dữ liệu tri thức. Vui lòng kiểm tra lại kết nối.");
      } finally {
        setLoading(false);
      }
    };

    fetchKnowledgeData();
  }, [agentId]);

  const handleToggleMassModule = async (moduleId: string, currentStatus: boolean) => {
    setIsToggling(moduleId);
    
    // Optimistic Update: Update UI instantly
    setMassModules(prev => prev.map(m => 
      m.id === moduleId ? { ...m, is_enabled: !currentStatus } : m
    ));

    try {
      // TẠM THỜI MOCK API ĐỂ TEST UI (Do Backend chưa có API này)
      // Chờ 500ms để mô phỏng thời gian gọi mạng
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Khi nào Backend code xong, bạn mở comment dòng dưới này ra:
      /*
      await axiosInstance.patch(`/mass-modules/${moduleId}/toggle`, { 
        is_enabled: !currentStatus, 
        bot_id: agentId 
      });
      */
    } catch (err) {
      console.error("Error toggling module:", err);
      // Rollback on error
      setMassModules(prev => prev.map(m => 
        m.id === moduleId ? { ...m, is_enabled: currentStatus } : m
      ));
      // Tạm tắt alert để bạn test UI không bị phiền
      // alert("Đã xảy ra lỗi khi thay đổi trạng thái module. Vui lòng thử lại.");
    } finally {
      setIsToggling(null);
    }
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
            onToggleModule={handleToggleMassModule}
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
