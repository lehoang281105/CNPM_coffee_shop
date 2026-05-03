import { useCallback, useEffect, useState } from 'react';
import {
  createBranch,
  deleteBranch,
  getBranchesByFilter,
  updateBranch,
} from '../../services/admin/branchService';
import type {
  Branch,
  BranchCreatePayload,
  BranchUpdatePayload,
} from '../../types';

const FETCH_PAGE_SIZE = 100;
const MAX_FETCH_PAGES = 50;

const getErrorMessage = (err: any) =>
  err?.response?.data?.message ||
  err?.message ||
  'Không thể xử lý yêu cầu chi nhánh.';

export const useBranches = (brandId?: string | null) => {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const fetchBranches = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const allBranches: Branch[] = [];
      let expectedTotal = 0;

      for (let page = 1; page <= MAX_FETCH_PAGES; page += 1) {
        const res = await getBranchesByFilter({
          page,
          page_size: FETCH_PAGE_SIZE,
          sort_by: 'id',
          order: 'desc',
        });

        const pageData = res.data ?? [];
        const totalFromApi = Number(res.metadata?.total ?? 0);

        if (totalFromApi > 0) {
          expectedTotal = totalFromApi;
        }

        allBranches.push(...pageData);

        if (pageData.length === 0) break;
        if (pageData.length < FETCH_PAGE_SIZE) break;
        if (expectedTotal > 0 && allBranches.length >= expectedTotal) break;
      }

      const scopedBranches = brandId
        ? allBranches.filter((branch) => branch.brand_id === brandId)
        : allBranches;

      setBranches(scopedBranches);
    } catch (err: any) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, [brandId]);

  useEffect(() => {
    fetchBranches();
  }, [fetchBranches]);

  const createBranchItem = useCallback(
    async (payload: BranchCreatePayload) => {
      setSubmitting(true);
      setError('');
      try {
        await createBranch(payload);
        await fetchBranches();
      } catch (err: any) {
        const message = getErrorMessage(err);
        setError(message);
        throw new Error(message);
      } finally {
        setSubmitting(false);
      }
    },
    [fetchBranches]
  );

  const updateBranchItem = useCallback(
    async (branchId: string, payload: BranchUpdatePayload) => {
      setSubmitting(true);
      setError('');
      try {
        await updateBranch(branchId, payload);
        await fetchBranches();
      } catch (err: any) {
        const message = getErrorMessage(err);
        setError(message);
        throw new Error(message);
      } finally {
        setSubmitting(false);
      }
    },
    [fetchBranches]
  );

  const deleteBranchItem = useCallback(
    async (branchId: string) => {
      setSubmitting(true);
      setError('');
      try {
        await deleteBranch(branchId);
        await fetchBranches();
      } catch (err: any) {
        const message = getErrorMessage(err);
        setError(message);
        throw new Error(message);
      } finally {
        setSubmitting(false);
      }
    },
    [fetchBranches]
  );

  return {
    branches,
    loading,
    submitting,
    error,
    fetchBranches,
    createBranchItem,
    updateBranchItem,
    deleteBranchItem,
  };
};
