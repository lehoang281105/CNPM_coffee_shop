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
