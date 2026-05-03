import { useCallback, useEffect, useState } from 'react';
import {
  createGoal,
  deleteGoal,
  getGoalsByFilter,
  updateGoal,
} from '../../services/admin/goalService';
import { getIntentsByBotId } from '../../services/admin/intentService';
import type {
  Goal,
  GoalCreatePayload,
  GoalUpdatePayload,
  Intent,
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
  return 'Không thể xử lý yêu cầu mục tiêu.';
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

    if (totalFromApi > 0) expectedTotal = totalFromApi;
    allGoals.push(...pageData);

    if (pageData.length === 0) break;
    if (pageData.length < FETCH_PAGE_SIZE) break;
    if (expectedTotal > 0 && allGoals.length >= expectedTotal) break;
  }

  return allGoals.filter((goal) => goal.bot_id === botId);
};

export const useGoals = (botId?: string) => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [intents, setIntents] = useState<Intent[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const fetchGoals = useCallback(async () => {
    if (!botId) {
      setGoals([]);
      setIntents([]);
      setError('');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const [goalData, intentResponse] = await Promise.all([
        fetchGoalsByBot(botId),
        getIntentsByBotId(botId),
      ]);

      setGoals(goalData);
      setIntents(intentResponse.data ?? []);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, [botId]);

  useEffect(() => {
    fetchGoals();
  }, [fetchGoals]);

  const createGoalItem = useCallback(
    async (payload: GoalCreatePayload) => {
      setSubmitting(true);
      setError('');
      try {
        await createGoal(payload);
        await fetchGoals();
      } catch (err) {
        const message = getErrorMessage(err);
        setError(message);
        throw new Error(message);
      } finally {
        setSubmitting(false);
      }
    },
    [fetchGoals]
  );

  const updateGoalItem = useCallback(
    async (goalId: string, payload: GoalUpdatePayload) => {
      setSubmitting(true);
      setError('');
      try {
        await updateGoal(goalId, payload);
        await fetchGoals();
      } catch (err) {
        const message = getErrorMessage(err);
        setError(message);
        throw new Error(message);
      } finally {
        setSubmitting(false);
      }
    },
    [fetchGoals]
  );

  const deleteGoalItem = useCallback(
    async (goalId: string) => {
      setSubmitting(true);
      setError('');
      try {
        await deleteGoal(goalId);
        await fetchGoals();
      } catch (err) {
        const message = getErrorMessage(err);
        setError(message);
        throw new Error(message);
      } finally {
        setSubmitting(false);
      }
    },
    [fetchGoals]
  );

  return {
    goals,
    intents,
    loading,
    submitting,
    error,
    fetchGoals,
    createGoalItem,
    updateGoalItem,
    deleteGoalItem,
  };
};

