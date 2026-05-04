import React from 'react';

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

// ─── Working Hours ──────────────────────────────────────────────────────────
export interface WorkingHoursDay {
  start: string;  // "HH:mm"
  end: string;    // "HH:mm"
}

export type WorkingHours = {
  [key in 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday']?: WorkingHoursDay;
};

// ─── Nudge Settings ─────────────────────────────────────────────────────────
export interface NudgeSettings {
  enabled: boolean;
  delays: number[];  // giây, VD: [60]
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
  working_hours?: WorkingHours;
  nudge_settings?: NudgeSettings;
}

export interface BotCreatePayload {
  name: string;
  language: string[];
  role_prompt: string;
  temperature: number;
  max_tokens: number;
  status: string;
  brand_id: string;
  working_hours?: WorkingHours;
  nudge_settings?: NudgeSettings;
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


// ─── Service Catalog ─────────────────────────────────────────────────────────
export interface ServiceCatalog {
  id: string;
  category_name: string;
  brand_id: string;
  service_ids: string[];
  description?: string;
  created_at: number;
  updated_at: number;
}

// ─── Service ─────────────────────────────────────────────────────────────────
export interface ServiceMetadata {
  service_code?: string;
  slug?: string;
  duration?: number;
  image_url?: string;
  tags?: string[];
  general_price?: number;
  conditional_prices?: any[];
  catalog_id?: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive';
  brand_id: string;
  branch_id?: string;
  service_metadata?: ServiceMetadata;
  created_at: number;
  updated_at: number;
}

export interface ServiceCreatePayload {
  name: string;
  description?: string;
  status: 'active' | 'inactive';
  brand_id: string;
  branch_id?: string;
  service_metadata?: ServiceMetadata;
}

// ─── Knowledge ──────────────────────────────────────────────────────────────
export interface KnowledgeDocument {
  id: string;
  title: string;
  page_content: string;
  meta_data: any;
  brand_id: string;
  status?: string;
  updated_at?: number;
}

export interface KnowledgeFAQ {
  id: string;
  question: string;
  answer: string;
  bot_id: string;
  updated_at?: number;
}

export type SourceType = 'Website' | 'PDF' | 'FAQ';

export interface SourceCardProps {
  title: string;
  type: SourceType;
  recordCount: number;
  timeText: string;
  hasError?: boolean;
  errorMessage?: string;
  onFixError?: () => void;
  onActionClick?: () => void;
}

export interface MassModule {
  id: string;
  code: string;
  title: string;
  description: string;
  is_enabled: boolean;
  record_count: number;
}

export interface IntegrationRowProps {
  module: MassModule;
  icon: React.ReactNode;
  isLoading?: boolean;
  disabledText?: string;
  onToggle: (id: string, currentStatus: boolean) => void;
  iconBgColor?: string;
  iconColor?: string;
}

// ─── Skills ─────────────────────────────────────────────────────────────────
export interface SkillBaseResponse {
  id: string;
  created_at: number;
  updated_at: number;
  name: string;
  description: string;
  endpoint: string;
  method: string;
  parameters: any;
  fixed_parameters: any;
  headers: any;
  is_active: boolean;
  brand_id: string;
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

// ─── Goal ────────────────────────────────────────────────────────────────────
export interface Goal {
  id: string;
  created_at: number;
  updated_at: number;
  name: string;
  description: string;
  script?: string | null;
  intent_id?: string | null;
  bot_id: string;
  rule?: string | null;
  target_goal?: string | null;
}

export interface GoalCreatePayload {
  name: string;
  description: string;
  script: string;
  intent_id?: string | null;
  bot_id: string;
  target_goal?: string | null;
  rule?: string | null;
}

export interface GoalUpdatePayload {
  name?: string | null;
  description?: string | null;
  script?: string | null;
  intent_id?: string | null;
  bot_id?: string | null;
  target_goal?: string | null;
  rule?: string | null;
}

// ─── Intent ──────────────────────────────────────────────────────────────────
export interface Intent {
  id: string;
  created_at: number;
  updated_at: number;
  name: string;
  description: string;
  target_goal?: string | null;
  example?: unknown;
  bot_id: string;
}

export interface IntentCreatePayload {
  name: string;
  description: string;
  target_goal?: string | null;
  example?: unknown;
  bot_id: string;
}

export interface IntentUpdatePayload {
  name?: string | null;
  description?: string | null;
  target_goal?: string | null;
  example?: unknown;
  bot_id?: string | null;
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

// ─── FAQ ─────────────────────────────────────────────────────────────────────
export interface FAQ {
  id: string;
  created_at: number;
  updated_at: number;
  question: string;
  answer: string;
  bot_id: string;
}

export interface FAQCreatePayload {
  question: string;
  answer: string;
  bot_id: string;
}

export interface FAQUpdatePayload {
  question?: string | null;
  answer?: string | null;
  bot_id?: string | null;
}

// ─── Feedback ────────────────────────────────────────────────────────────────
export interface Feedback {
  id: string;
  created_at: number;
  updated_at: number;
  bot_id: string;
  message_id?: string | null;
  original_question: string;
  original_answer: string;
  corrected_answer?: string | null;
  rating: string; // "pending" | "positive" | "negative"
  status: string; // "pending" | "saved_to_faq" | "reported_to_dev" | "dev_fixed" | "dismissed"
  faq_id?: string | null;
  note?: string | null;
}

export interface FeedbackCreatePayload {
  bot_id: string;
  message_id?: string | null;
  original_question: string;
  original_answer: string;
  rating?: string | null;
  note?: string | null;
}

export interface FeedbackRatingPayload {
  rating: string;
}

export interface FeedbackSavePayload {
  corrected_answer: string;
  note?: string | null;
}

export interface FeedbackReportDevPayload {
  note: string;
}

// ─── Chat Reset ──────────────────────────────────────────────────────────────
export interface ResetSessionPayload {
  user_id: string;
  bot_id: string;

}
