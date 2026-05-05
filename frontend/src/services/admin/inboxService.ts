import axiosInstance from '../axiosInstance';
import type { ApiResponse } from '../../types';
import type { 
  InboxConversationItem, 
  InboxMessageItem, 
  UserProfileResponse, 
  UserProfileUpdateRequest,
  InboxTakeoverRequest,
  InboxResolveRequest,
  InboxReplyRequest
} from '../../types';

export const getConversations = (brand_id: string) =>
  axiosInstance
    .get<ApiResponse<InboxConversationItem[]>>('/inbox/conversations', { params: { brand_id } })
    .then((r) => r.data);

export const getMessages = (user_id: string, bot_id: string) =>
  axiosInstance
    .get<ApiResponse<InboxMessageItem[]>>('/inbox/messages', { params: { user_id, bot_id } })
    .then((r) => r.data);

export const takeoverConversation = (payload: InboxTakeoverRequest) =>
  axiosInstance
    .post<ApiResponse<any>>('/inbox/takeover', payload)
    .then((r) => r.data);

export const resolveConversation = (payload: InboxResolveRequest) =>
  axiosInstance
    .post<ApiResponse<any>>('/inbox/resolve', payload)
    .then((r) => r.data);

export const replyToUser = (payload: InboxReplyRequest) =>
  axiosInstance
    .post<ApiResponse<any>>('/inbox/reply', payload)
    .then((r) => r.data);

export const getUserProfile = (user_id: string, bot_id: string) =>
  axiosInstance
    .get<ApiResponse<UserProfileResponse>>(`/inbox/conversations/${user_id}/${bot_id}/profile`)
    .then((r) => r.data);

export const updateUserProfile = (user_id: string, bot_id: string, payload: UserProfileUpdateRequest) =>
  axiosInstance
    .put<ApiResponse<UserProfileResponse>>(`/inbox/conversations/${user_id}/${bot_id}/profile`, payload)
    .then((r) => r.data);
