import { useCallback, useEffect, useState } from 'react';
import { getGoalsByFilter } from '../../services/admin/goalService';
import {
  createIntent,
  deleteIntent,
  getIntentsByBotId,
  updateIntent,
} from '../../services/admin/intentService';
import type {
  Goal,
  Intent,
  IntentCreatePayload,
  IntentUpdatePayload,
} from '../../types';

const FETCH_PAGE_SIZE = 100;
const MAX_FETCH_PAGES = 50;

const getErrorMessage = (err: unknown): string => {
  if (typeof err === 'string') return err;
  if (err && typeof err === 'object') {
    const maybeAxios = err as {
      response?: { data?: { message?: string } };
      message?: string;
    };
    if (maybeAxios.response?.data?.message) return maybeAxios.response.data.message;
    if (maybeAxios.message) return maybeAxios.message;
  }
  return 'Không thể xử lý yêu cầu Intent.';
};

const fetchGoalsByBot = async (botId: string): Promise<Goal[]> => {
  const allGoals: Goal[] = [];
  let expectedTotal = 0;

  for (let page = 1; page <= MAX_FETCH_PAGES; page += 1) {
    const response = await getGoalsByFilter({
      page,
      page_size: FETCH_PAGE_SIZE,
      sort_by: 'id',
      order: 'desc',
    });

    const pageData = response.data ?? [];
    const totalFromApi = Number(response.metadata?.total ?? 0);

    if (totalFromApi > 0) {
      expectedTotal = totalFromApi;
    }

    allGoals.push(...pageData);

    if (pageData.length === 0) break;
    if (pageData.length < FETCH_PAGE_SIZE) break;
    if (expectedTotal > 0 && allGoals.length >= expectedTotal) break;
  }

  return allGoals.filter((goal) => goal.bot_id === botId);
};

export const useIntents = (botId?: string) => {
  const [intents, setIntents] = useState<Intent[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const fetchIntents = useCallback(async () => {
    if (!botId) {
      setIntents([]);
      setGoals([]);
      setError('');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const [intentResponse, goalData] = await Promise.all([
        getIntentsByBotId(botId),
        fetchGoalsByBot(botId),
      ]);

      setIntents(intentResponse.data ?? []);
      setGoals(goalData);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, [botId]);

  useEffect(() => {
    fetchIntents();
  }, [fetchIntents]);

  const createIntentItem = useCallback(
    async (payload: IntentCreatePayload) => {
      setSubmitting(true);
      setError('');
      try {
        await createIntent(payload);
        await fetchIntents();
      } catch (err) {
        const message = getErrorMessage(err);
        setError(message);
        throw new Error(message);
      } finally {
        setSubmitting(false);
      }
    },
    [fetchIntents]
  );

  const updateIntentItem = useCallback(
    async (intentId: string, payload: IntentUpdatePayload) => {
      setSubmitting(true);
      setError('');
      try {
        await updateIntent(intentId, payload);
        await fetchIntents();
      } catch (err) {
        const message = getErrorMessage(err);
        setError(message);
        throw new Error(message);
      } finally {
        setSubmitting(false);
      }
    },
    [fetchIntents]
  );

  const deleteIntentItem = useCallback(
    async (intentId: string) => {
      setSubmitting(true);
      setError('');
      try {
        await deleteIntent(intentId);
        await fetchIntents();
      } catch (err) {
        const message = getErrorMessage(err);
        setError(message);
        throw new Error(message);
      } finally {
        setSubmitting(false);
      }
    },
    [fetchIntents]
  );

  return {
    intents,
    goals,
    loading,
    submitting,
    error,
    fetchIntents,
    createIntentItem,
    updateIntentItem,
    deleteIntentItem,
  };
};
