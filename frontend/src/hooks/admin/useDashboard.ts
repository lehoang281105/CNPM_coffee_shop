import { useState, useEffect, useCallback, useMemo } from 'react';
import { getAllBots } from '../../services/admin/botService';
import { getAllBrands } from '../../services/admin/brandService';
import type { Bot, Brand } from '../../types';

export const useDashboard = () => {
  const [bots, setBots] = useState<Bot[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const [botsRes, brandsRes] = await Promise.all([
        getAllBots(),
        getAllBrands(),
      ]);
      setBots(botsRes.data ?? []);
      setBrands(brandsRes.data ?? []);
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
        err.message ||
        'Không thể kết nối tới API. Vui lòng thử lại.'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const totalBots = loading ? null : bots.length;
  const activeBots = loading ? null : bots.filter((b) => b.status === 'active').length;
  const totalBrands = loading ? null : brands.length;
  const totalLangs = loading ? null : new Set(bots.flatMap((b) => b.language || [])).size;

  const brandMap = useMemo(
    () => Object.fromEntries(brands.map((b) => [b.id, b])),
    [brands]
  );

  const filteredBots = useMemo(() => {
    const q = search.toLowerCase();
    return bots.filter(
      (b) =>
        b.name.toLowerCase().includes(q) ||
        (b.role_prompt ?? '').toLowerCase().includes(q) ||
        (b.language || []).some((l) => l.toLowerCase().includes(q)) ||
        (brandMap[b.brand_id]?.name ?? '').toLowerCase().includes(q)
    );
  }, [bots, search, brandMap]);

  return {
    bots,
    brands,
    loading,
    error,
    search,
    setSearch,
    filteredBots,
    fetchData,
    totalBots,
    activeBots,
    totalBrands,
    totalLangs,
    brandMap,
  };
};
