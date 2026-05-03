import axiosInstance from '../axiosInstance';
import type { ApiResponse, SkillBaseResponse } from '../../types';

export const getSkills = (params?: { bot_id?: string; page?: number; page_size?: number; sort_by?: string; order?: string }) => {
  return axiosInstance
    .get<ApiResponse<SkillBaseResponse[]>>('/v1/skills', { params })
    .then((res) => res.data);
};

export const createSkill = (payload: Partial<SkillBaseResponse>) => {
  return axiosInstance
    .post<ApiResponse<SkillBaseResponse>>('/v1/skills', payload)
    .then((res) => res.data);
};

export const updateSkill = (id: string, payload: Partial<SkillBaseResponse>) => {
  return axiosInstance
    .put<ApiResponse<SkillBaseResponse>>(`/v1/skills/${id}`, payload)
    .then((res) => res.data);
};

export const deleteSkill = (id: string) => {
  return axiosInstance
    .delete<ApiResponse<any>>(`/v1/skills/${id}`)
    .then((res) => res.data);
};
