import { useState, useEffect, useCallback, useMemo } from 'react';
import { getAllFAQs, createFAQ, updateFAQ, deleteFAQ } from '../../services/admin/faqService';
import { getAllBots } from '../../services/admin/botService';
import type { FAQ, FAQCreatePayload, FAQUpdatePayload, Bot } from '../../types';

export function useFAQ(botId?: string) {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [bots, setBots] = useState<Bot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [faqRes, botRes] = await Promise.all([getAllFAQs(), getAllBots()]);
      setFaqs(faqRes.data ?? []);
      setBots(botRes.data ?? []);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Không thể tải dữ liệu FAQ';
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Bot lookup map
  const botMap = useMemo(() => {
    const m: Record<string, Bot> = {};
    bots.forEach((b) => (m[b.id] = b));
    return m;
  }, [bots]);

  // Filtered FAQs
  const filteredFAQs = useMemo(() => {
    let result = faqs;
    if (botId) {
      result = result.filter(f => f.bot_id === botId);
    }
    if (!search.trim()) return result;
    const q = search.toLowerCase();
    return result.filter(
      (f) =>
        f.question.toLowerCase().includes(q) ||
        f.answer.toLowerCase().includes(q)
    );
  }, [faqs, search, botId]);

  // CRUD
  const handleCreate = useCallback(async (payload: FAQCreatePayload) => {
    const res = await createFAQ(payload);
    if (res.data) {
      setFaqs((prev) => [res.data, ...prev]);
    }
    return res;
  }, []);

  const handleUpdate = useCallback(async (faqId: string, payload: FAQUpdatePayload) => {
    const res = await updateFAQ(faqId, payload);
    if (res.data) {
      setFaqs((prev) => prev.map((f) => (f.id === faqId ? res.data : f)));
    }
    return res;
  }, []);

  const handleDelete = useCallback(async (faqId: string) => {
    await deleteFAQ(faqId);
    setFaqs((prev) => prev.filter((f) => f.id !== faqId));
  }, []);

  return {
    faqs: filteredFAQs,
    allFAQs: faqs,
    bots,
    botMap,
    loading,
    error,
    search,
    setSearch,
    fetchData,
    handleCreate,
    handleUpdate,
    handleDelete,
  };
}
