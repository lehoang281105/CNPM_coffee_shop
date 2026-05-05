import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import AgentLayout from '../../../layouts/admin/AgentLayout';
import GeneralConfig from './tabs/Đào tạo/General/GeneralConfig';
import ServiceTab from './tabs/Đào tạo/ServiceTab';
import KnowledgeTab from './tabs/Tri thức';
import SkillsTab from './tabs/Skills';
import Branches from './tabs/Đào tạo/Branch/Branches';
import Intents from './tabs/Đào tạo/Intent/Intents';
import Goals from './tabs/Đào tạo/Goal/Goals';
import FAQ from './tabs/Đào tạo/FAQ/FAQ';
import Feedback from './tabs/Kiểm thử/Feedback/Feedback';
import ChatSimulator from './tabs/Kiểm thử/Chat simulator/ChatSimulator';
import LiveChatTab from './tabs/Kiểm thử/LiveChat/LiveChatTab';
import NotificationModal from '../../../components/common/NotificationModal';
import { useAgentDetail } from '../../../hooks/admin/useAgentDetail';
import './AgentDetail.css';

const AgentDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<'general' | 'intent' | 'goals' | 'knowledge' | 'branches' | 'simulator' | 'faq' | 'feedback' | 'skills' | 'services' | 'live_chat'>('general');

  const {
    bot,
    brand,
    loading,
    notification,
    setNotification,
    handleSaveConfig,
  } = useAgentDetail(id);




  const handleMenuSelect = (menuId: string) => {
    if (['general', 'intent', 'goals', 'branches', 'simulator', 'faq', 'feedback', 'skills', 'services', 'knowledge', 'live_chat'].includes(menuId)) {
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
            ) : activeTab === 'services' ? (
              <ServiceTab botId={bot.id} brandId={bot.brand_id} />
            ) : activeTab === 'general' ? (
              <GeneralConfig bot={bot} brand={brand} onSave={handleSaveConfig} />
            ) : activeTab === 'knowledge' ? (
              <KnowledgeTab bot={bot.id} />
            ) : activeTab === 'live_chat' ? (
              <LiveChatTab botId={bot.id} brandId={bot.brand_id} />
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
