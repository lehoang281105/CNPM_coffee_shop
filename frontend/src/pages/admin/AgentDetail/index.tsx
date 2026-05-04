import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import AgentLayout from '../../../layouts/admin/AgentLayout';
import GeneralConfig from './tabs/Đào tạo/GeneralConfig';
import DeployOverview from './tabs/Triển khai/DeployOverview';
import DeploymentChannels from './tabs/Triển khai/DeploymentChannels';
import AudienceTargets from './tabs/Triển khai/AudienceTargets';
import BehaviorControl from './tabs/Triển khai/BehaviorControl';
import ForwardingControl from './tabs/Triển khai/ForwardingControl';
import UiUxConfig from './tabs/Triển khai/UiUxConfig';
import NotificationModal from '../../../components/common/NotificationModal';
import { useAgentDetail } from '../../../hooks/admin/useAgentDetail';
import './AgentDetail.css';

const AgentDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'general';
  const {
    bot,
    brand,
    loading,
    notification,
    setNotification,
    handleSaveConfig,
  } = useAgentDetail(id);

  const renderTabContent = () => {
    if (loading) {
      return <div style={{ padding: 40, textAlign: 'center' }}>Đang tải dữ liệu Agent...</div>;
    }

    if (!bot) {
      return <div style={{ padding: 40, textAlign: 'center', color: 'red' }}>Không tìm thấy Agent!</div>;
    }

    if (activeTab === 'general') {
      return <GeneralConfig bot={bot} brand={brand} onSave={handleSaveConfig} />;
    }

    if (activeTab === 'deploy-overview') {
      return <DeployOverview />;
    }
    if (activeTab === 'channels') {
      return <DeploymentChannels />;
    }
    if (activeTab === 'audience') {
      return <AudienceTargets />;
    }
    if (activeTab === 'behavior') {
      return <BehaviorControl />;
    }
    if (activeTab === 'forwarding') {
      return <ForwardingControl />;
    }
    if (activeTab === 'ui-ux') {
      return <UiUxConfig />;
    }

    return (
      <div style={{ padding: 40, textAlign: 'center' }}>
        <h3 style={{ marginBottom: 8 }}>Tab "{activeTab}"</h3>
        <p style={{ color: '#666' }}>Mục này đang được phát triển.</p>
      </div>
    );
  };

  return (
    <>
      <AgentLayout bot={bot} brand={brand} loading={loading} activeTab={activeTab}>
        {renderTabContent()}
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
