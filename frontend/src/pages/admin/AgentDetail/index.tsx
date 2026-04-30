import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import AgentLayout from '../../../layouts/admin/AgentLayout';
import GeneralConfig from './tabs/Đào tạo/GeneralConfig';
import ServiceTab from './tabs/Đào tạo/ServiceTab';
import NotificationModal from '../../../components/common/NotificationModal';
import { useAgentDetail } from '../../../hooks/admin/useAgentDetail';
import './AgentDetail.css';

const AgentDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('general');

  const {
    bot,
    brand,
    loading,
    notification,
    setNotification,
    handleSaveConfig,
  } = useAgentDetail(id);

  const renderTabContent = () => {
    if (!bot) return null;
    switch (activeTab) {
      case 'general':
        return <GeneralConfig bot={bot} brand={brand} onSave={handleSaveConfig} />;
      case 'services':
        return <ServiceTab botId={bot.id} brandId={brand?.id} />;
      default:
        return <div style={{ padding: 40, textAlign: 'center' }}>Tính năng đang phát triển</div>;
    }
  };

  return (
    <>
      <AgentLayout 
        bot={bot} 
        brand={brand} 
        loading={loading}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      >
        {loading ? (
          <div style={{ padding: 40, textAlign: 'center' }}>Đang tải dữ liệu Agent...</div>
        ) : bot ? (
          renderTabContent()
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
