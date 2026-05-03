import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import AgentLayout from '../../../layouts/admin/AgentLayout';
import GeneralConfig from './tabs/Đào tạo/GeneralConfig';
import KnowledgeTab from './tabs/Tri thức';
import SkillsTab from './tabs/Skills';
import Branches from './tabs/Đào tạo/Branch/Branches';
import Intents from './tabs/Đào tạo/Intent/Intents';
import Goals from './tabs/Đào tạo/Goal/Goals';
import FAQ from './tabs/Đào tạo/FAQ/FAQ';
import Feedback from './tabs/Kiểm thử/Feedback/Feedback';
import ChatSimulator from './tabs/Kiểm thử/Chat simulator/ChatSimulator';
import NotificationModal from '../../../components/common/NotificationModal';
import { useAgentDetail } from '../../../hooks/admin/useAgentDetail';
import './AgentDetail.css';

const AgentDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<'general' | 'intent' | 'goals' | 'branches' | 'simulator' | 'faq' | 'feedback' | 'skills'>('general');

  const {
    bot,
    brand,
    loading,
    notification,
    setNotification,
    handleSaveConfig,
  } = useAgentDetail(id);

  const handleMenuSelect = (menuId: string) => {
    if (menuId === 'general' || menuId === 'intent' || menuId === 'goals' || menuId === 'branches' || menuId === 'simulator' || menuId === 'faq' || menuId === 'feedback') {
      setActiveTab(menuId as any);
    }
  };

  return (
    <>
      <AgentLayout
        bot={bot}
        brand={brand}
        loading={loading}
        activeTab={activeTab}
        onTabChange={(tabId) => setActiveTab(tabId as any)}
        activeMenuId={activeTab}
        onMenuSelect={handleMenuSelect}
      >
        {loading ? (
          <div style={{ padding: 40, textAlign: 'center' }}>Đang tải dữ liệu Agent...</div>
        ) : bot ? (
          <>
            {activeTab === 'simulator' ? (
              <ChatSimulator botId={bot.id} botName={bot.name} brandId={bot.brand_id} />
            ) : activeTab === 'intent' ? (
              <Intents botId={bot.id} />
            ) : activeTab === 'goals' ? (
              <Goals botId={bot.id} />
            ) : activeTab === 'skills' ? (
              <SkillsTab brandId={brand?.id} />
            ) : activeTab === 'faq' ? (
              <FAQ botId={bot.id} />
            ) : activeTab === 'feedback' ? (
              <Feedback botId={bot.id} />
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
