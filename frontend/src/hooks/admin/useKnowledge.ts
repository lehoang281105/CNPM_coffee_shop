import { useState, useEffect, useCallback } from 'react';
import { getDocuments, getFaqs, getMassModules, toggleMassModuleStatus } from '../../services/admin/knowledgeService';
import type { KnowledgeDocument, KnowledgeFAQ, MassModule } from '../../types';
import { mockIntegrations } from '../../pages/admin/AgentDetail/tabs/Tri thức/mockData';

export const useKnowledge = (botId?: string) => {
  const [documents, setDocuments] = useState<KnowledgeDocument[]>([]);
  const [faqs, setFaqs] = useState<KnowledgeFAQ[]>([]);
  const [massModules, setMassModules] = useState<MassModule[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isToggling, setIsToggling] = useState<string | null>(null);

  const fetchKnowledgeData = useCallback(async () => {
    if (!botId) return;
    try {
      setDocuments([]);
      setFaqs([]);
      setMassModules([]);
      setLoading(true);
      setError(null);
      
      const [docsRes, faqsRes] = await Promise.all([
        getDocuments({ bot_id: botId, page: 1, page_size: 100 }),
        getFaqs({ bot_id: botId, page: 1, page_size: 100 })
      ]);

      const fetchedDocs = docsRes.data || [];
      const fetchedFaqs = faqsRes.data || [];

      let fetchedMassModules: MassModule[] = [];
      try {
        const massRes = await getMassModules({ bot_id: botId });
        fetchedMassModules = massRes.data || [];
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
  }, [botId]);

  useEffect(() => {
    fetchKnowledgeData();
  }, [fetchKnowledgeData]);

  const toggleMassModule = async (moduleId: string, currentStatus: boolean) => {
    setIsToggling(moduleId);
    
    // Optimistic Update: Update UI instantly
    setMassModules(prev => prev.map(m => 
      m.id === moduleId ? { ...m, is_enabled: !currentStatus } : m
    ));

    try {
      // TẠM THỜI MOCK API ĐỂ TEST UI
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Khi nào Backend code xong, mở comment dòng dưới này ra:
      /*
      await toggleMassModuleStatus(moduleId, { 
        is_enabled: !currentStatus, 
        bot_id: botId 
      });
      */
    } catch (err) {
      console.error("Error toggling module:", err);
      // Rollback on error
      setMassModules(prev => prev.map(m => 
        m.id === moduleId ? { ...m, is_enabled: currentStatus } : m
      ));
    } finally {
      setIsToggling(null);
    }
  };

  return {
    documents,
    faqs,
    massModules,
    loading,
    error,
    isToggling,
    refetch: fetchKnowledgeData,
    toggleMassModule
  };
};
