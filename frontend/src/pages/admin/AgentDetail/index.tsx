import React from 'react';
import { useParams } from 'react-router-dom';
import AgentLayout from '../../../layouts/admin/AgentLayout';
import GeneralConfig from './tabs/Đào tạo/GeneralConfig';
import KnowledgeTab from './tabs/Tri thức';
import SkillsTab from './tabs/Skills';
import NotificationModal from '../../../components/common/NotificationModal';
import { useAgentDetail } from '../../../hooks/admin/useAgentDetail';
import './AgentDetail.css';

const AgentDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = React.useState('skills'); // default to skills to test
  
  const {
    bot,
    brand,
    loading,
    notification,
    setNotification,
    handleSaveConfig,
  } = useAgentDetail(id);

  return (
    <>
      <AgentLayout bot={bot} brand={brand} loading={loading} activeTab={activeTab} onTabChange={setActiveTab}>
        {loading ? (
          <div style={{ padding: 40, textAlign: 'center' }}>Đang tải dữ liệu Agent...</div>
        ) : bot ? (
          <>
            {activeTab === 'general' && <GeneralConfig bot={bot} brand={brand} onSave={handleSaveConfig} />}
            {activeTab === 'knowledge' && <KnowledgeTab bot={id} brandId={brand?.id} />}
            {activeTab === 'skills' && <SkillsTab brandId={brand?.id} />}
            {activeTab !== 'general' && activeTab !== 'knowledge' && activeTab !== 'skills' && (
               <div style={{ padding: 40, textAlign: 'center', color: '#666' }}>Tính năng đang phát triển...</div>
            )}
          </>
        ) : (
          <div style={{ padding: 40, textAlign: 'center', color: 'red' }}>Không tìm thấy Agent!</div>
        )}
      </AgentLayout>

      {notification && (
        <NotificationModal
          title={notification.title}
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </>
  );
};

export default AgentDetailPage;
