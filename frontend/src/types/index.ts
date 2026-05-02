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
