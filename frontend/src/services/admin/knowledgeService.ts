import axiosInstance from '../axiosInstance';
import type { ApiResponse, KnowledgeDocument, KnowledgeFAQ, MassModule } from '../../types';

export const getDocuments = (params: any) => {
  return axiosInstance.get<ApiResponse<KnowledgeDocument[]>>('/documents', { params }).then(res => res.data);
};

export const getFaqs = (params: any) => {
  return axiosInstance.get<ApiResponse<KnowledgeFAQ[]>>('/faqs', { params }).then(res => res.data);
};

export const getMassModules = (params: any) => {
  return axiosInstance.get<ApiResponse<MassModule[]>>('/mass-modules', { params }).then(res => res.data);
};

export const toggleMassModuleStatus = (moduleId: string, payload: any) => {
  return axiosInstance.patch<ApiResponse<any>>(`/mass-modules/${moduleId}/toggle`, payload).then(res => res.data);
};
