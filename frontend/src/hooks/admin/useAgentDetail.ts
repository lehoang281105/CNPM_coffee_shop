import { useState, useEffect, useCallback } from 'react';
import { getBotById, updateBot } from '../../services/admin/botService';
import { getBrandById } from '../../services/admin/brandService';
import type { Bot, Brand } from '../../types';

export const useAgentDetail = (id: string | undefined) => {
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

  return {
    bot,
    brand,
    loading,
    notification,
    setNotification,
    fetchBotData,
    handleSaveConfig,
  };
};
