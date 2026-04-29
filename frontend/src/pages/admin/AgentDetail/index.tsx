import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import AgentLayout from '../../../layouts/admin/AgentLayout';
import GeneralConfig from './tabs/Đào tạo/GeneralConfig';
import Branches from './tabs/Đào tạo/Branches';
import ChatSimulator from './tabs/Kiểm thử/ChatSimulator';
import NotificationModal from '../../../components/common/NotificationModal';
import { useAgentDetail } from '../../../hooks/admin/useAgentDetail';
import './AgentDetail.css';

const AgentDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<'general' | 'branches' | 'simulator'>('general');

  const {
    bot,
    brand,
    loading,
    notification,
    setNotification,
    handleSaveConfig,
  } = useAgentDetail(id);

  const handleMenuSelect = (menuId: string) => {
    if (menuId === 'general' || menuId === 'branches' || menuId === 'simulator') {
      setActiveTab(menuId);
    }
  };

  return (
    <>
      <AgentLayout
        bot={bot}
        brand={brand}
        loading={loading}
        activeMenuId={activeTab}
        onMenuSelect={handleMenuSelect}
      >
        {loading ? (
          <div style={{ padding: 40, textAlign: 'center' }}>Đang tải dữ liệu Agent...</div>
        ) : bot ? (
          <>
            {activeTab === 'simulator' ? (
              <ChatSimulator botId={bot.id} botName={bot.name} brandId={brand?.id || bot.brand_id} />
            ) : activeTab === 'general' ? (
              <GeneralConfig bot={bot} brand={brand} onSave={handleSaveConfig} />
            ) : (
              <Branches brandId={bot.brand_id} />
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
