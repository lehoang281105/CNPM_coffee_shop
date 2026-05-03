import { useState, useEffect, useMemo } from 'react';
import { feedbackService } from '../../services/admin/feedbackService';
import type { Feedback, FeedbackCreatePayload, FeedbackRatingPayload, FeedbackSavePayload, FeedbackReportDevPayload } from '../../types';

interface UseFeedbackOptions {
  botId?: string;
}

export function useFeedback({ botId }: UseFeedbackOptions = {}) {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const fetchData = async () => {
    if (!botId) return;
    
    setLoading(true);
    setError(null);
    try {
      const response = await feedbackService.getByBot(botId, {
        sort_by: 'created_at',
        order: 'desc',
        page_size: 1000,
      });
      setFeedbacks(response.data || []);
    } catch (err) {
      console.error('Error fetching feedbacks:', err);
      setError(err instanceof Error ? err.message : 'Không thể tải danh sách feedback');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [botId]);

  // Filter feedbacks by search
  const filteredFeedbacks = useMemo(() => {
    if (!search.trim()) return feedbacks;
    const lowerSearch = search.toLowerCase();
    return feedbacks.filter(
      (fb) =>
        fb.original_question.toLowerCase().includes(lowerSearch) ||
        fb.original_answer.toLowerCase().includes(lowerSearch) ||
        (fb.corrected_answer && fb.corrected_answer.toLowerCase().includes(lowerSearch)) ||
        (fb.note && fb.note.toLowerCase().includes(lowerSearch))
    );
  }, [feedbacks, search]);

  const handleCreate = async (payload: FeedbackCreatePayload) => {
    try {
      await feedbackService.create(payload);
      await fetchData();
    } catch (err) {
      console.error('Error creating feedback:', err);
      throw err;
    }
  };

  const handleRate = async (feedbackId: string, payload: FeedbackRatingPayload) => {
    try {
      await feedbackService.rate(feedbackId, payload);
      await fetchData();
    } catch (err) {
      console.error('Error rating feedback:', err);
      throw err;
    }
  };

  const handleSaveToFAQ = async (feedbackId: string, payload: FeedbackSavePayload) => {
    try {
      await feedbackService.saveToFAQ(feedbackId, payload);
      await fetchData();
    } catch (err) {
      console.error('Error saving to FAQ:', err);
      throw err;
    }
  };

  const handleReportToDev = async (feedbackId: string, payload: FeedbackReportDevPayload) => {
    try {
      await feedbackService.reportToDev(feedbackId, payload);
      await fetchData();
    } catch (err) {
      console.error('Error reporting to dev:', err);
      throw err;
    }
  };

  const handleMarkFixed = async (feedbackId: string) => {
    try {
      await feedbackService.markFixed(feedbackId);
      await fetchData();
    } catch (err) {
      console.error('Error marking as fixed:', err);
      throw err;
    }
  };

  const handleConfirmFix = async (feedbackId: string) => {
    try {
      await feedbackService.confirmFix(feedbackId);
      await fetchData();
    } catch (err) {
      console.error('Error confirming fix:', err);
      throw err;
    }
  };

  const handleDismiss = async (feedbackId: string) => {
    try {
      await feedbackService.dismiss(feedbackId);
      await fetchData();
    } catch (err) {
      console.error('Error dismissing feedback:', err);
      throw err;
    }
  };

  const handleDelete = async (feedbackId: string) => {
    try {
      await feedbackService.delete(feedbackId);
      await fetchData();
    } catch (err) {
      console.error('Error deleting feedback:', err);
      throw err;
    }
  };

  return {
    feedbacks: filteredFeedbacks,
    allFeedbacks: feedbacks,
    loading,
    error,
    search,
    setSearch,
    fetchData,
    handleCreate,
    handleRate,
    handleSaveToFAQ,
    handleReportToDev,
    handleMarkFixed,
    handleConfirmFix,
    handleDismiss,
    handleDelete,
  };
}
