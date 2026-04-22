import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import AgentLayout from '../../../layouts/admin/AgentLayout';
import GeneralConfig from './tabs/Đào tạo/GeneralConfig';
import NotificationModal from '../../../components/common/NotificationModal';
import { getBotById, updateBot } from '../../../services/admin/botService';
import { getBrandById } from '../../../services/admin/brandService';
import type { Bot, Brand } from '../../../types';
import './AgentDetail.css';

const AgentDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [bot, setBot] = useState<Bot | null>(null);
  const [brand, setBrand] = useState<Brand | null>(null);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState<{ title: string; message: string; type: 'success' | 'error' } | null>(null);

  const fetchBotData = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    try {
      const botData = await getBotById(id);
      setBot(botData.data);
      if (botData.data?.brand_id) {
        try {
          const brandData = await getBrandById(botData.data.brand_id);
          setBrand(brandData.data);
        } catch (err) {
          console.warn('Brand not found:', botData.data.brand_id);
        }
      }
    } catch (error) {
      console.error('Error fetching bot details:', error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchBotData();
  }, [fetchBotData]);

  const handleSaveConfig = async (payload: any) => {
    if (!id) return;
    try {
      await updateBot(id, payload);
      await fetchBotData(); // Refresh data after save
      setNotification({ title: 'Thành công', message: 'Đã lưu cấu hình thành công!', type: 'success' });
    } catch (error) {
      console.error('Error saving bot config:', error);
      setNotification({ title: 'Lỗi', message: 'Đã xảy ra lỗi khi lưu cấu hình.', type: 'error' });
    }
  };

  return (
    <>
      <AgentLayout bot={bot} brand={brand} loading={loading}>
        {loading ? (
          <div style={{ padding: 40, textAlign: 'center' }}>Đang tải dữ liệu Agent...</div>
        ) : bot ? (
          <GeneralConfig bot={bot} brand={brand} onSave={handleSaveConfig} />
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
