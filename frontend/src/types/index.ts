// ─── Shared response wrapper ────────────────────────────────────────────────
export interface ApiMeta {
  page: number;
  page_size: number;
  total: number;
}

export interface ApiResponse<T> {
  http_code: number;
  success: boolean;
  message: string;
  metadata: ApiMeta;
  data: T;
}

// ─── Bot ────────────────────────────────────────────────────────────────────
export interface Bot {
  id: string;
  created_at: number;
  updated_at: number;
  name: string;
  language: string[];
  role_prompt: string;
  temperature: number;
  max_tokens: number;
  status: string;   // "active" | "inactive"
  brand_id: string;
}

export interface BotCreatePayload {
  name: string;
  language: string[];
  role_prompt: string;
  temperature: number;
  max_tokens: number;
  status: string;
  brand_id: string;
}

// ─── Brand ──────────────────────────────────────────────────────────────────
export interface Brand {
  id: string;
  created_at: number;
  updated_at: number;
  name: string;
  description?: string;
  logo_url?: string;
  status: string;
}

export interface BrandCreatePayload {
  name: string;
  description?: string;
  logo_url?: string;
  status?: string;
}

// ─── Branch ─────────────────────────────────────────────────────────────────
export interface Branch {
  id: string;
  created_at: number;
  updated_at: number;
  name: string;
  description?: string | null;
  address: string;
  google_map_url: string;
  latitude: string;
  longitude: string;
  status: string;
  brand_id?: string | null;
}

export interface BranchCreatePayload {
  name: string;
  description?: string;
  address: string;
  google_map_url: string;
  latitude: string;
  longitude: string;
  status?: string;
  brand_id?: string;
}

export interface BranchUpdatePayload {
  name?: string | null;
  description?: string | null;
  address?: string | null;
  google_map_url?: string | null;
  latitude?: string | null;
  longitude?: string | null;
  status?: string | null;
  brand_id?: string | null;
}

// ─── Chat Simulator ──────────────────────────────────────────────────────────
export interface ChatUserInfo {
  user_id: string;
  name?: string | null;
  phone?: string | null;
  description?: string | null;
  gender?: string | null;
  language?: string | null;
}

export interface ChatRequestPayload {
  user: ChatUserInfo;
  history?: Record<string, unknown>[] | null;
  message: string;
  bot_id: string;
  brand_id: string;
  payload?: Record<string, unknown> | null;
}

export interface IntentReasoning {
  id?: string | null;
  reason?: string | null;
  thought?: string | null;
  confidence?: number | null;
  [key: string]: unknown;
}

export interface GoalReasoning {
  ids?: string[];
  reason?: string | null;
  thought?: string | null;
  confidence?: number | null;
  [key: string]: unknown;
}

export interface ChatReasoning {
  intent?: IntentReasoning | null;
  goal?: GoalReasoning | null;
  [key: string]: unknown;
}

export interface ChatResponsePayload {
  response: string[];
  reasoning?: ChatReasoning | null;
  message_id?: string | null;
  user_message_id?: string | null;
  [key: string]: unknown;
}

export type ChatMessageRole = 'user' | 'assistant';

export interface ChatMessageItem {
  id: string;
  role: ChatMessageRole;
  content: string;
  created_at: number;
}
