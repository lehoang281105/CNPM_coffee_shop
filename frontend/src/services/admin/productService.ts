import axiosInstance from '../axiosInstance';
import type { ApiResponse, Product, ProductFormData, ProductSearchTextRequest, ProductSearchImageRequest } from '../../types';

/** GET /api/v1/products/all — lấy toàn bộ danh sách sản phẩm */
export const getAllProducts = (params?: { brand_id?: string }) =>
  axiosInstance.get<ApiResponse<Product[]>>('/products/all', { params }).then((r) => r.data);

/** GET /api/v1/products — lấy có phân trang + filter */
export const getProductsByFilter = (params?: {
  brand_id?: string;
  branch_id?: string;
  bot_id?: string;
  page?: number;
  page_size?: number;
  sort_by?: string;
  order?: string;
}) =>
  axiosInstance
    .get<ApiResponse<Product[]>>('/products', { params })
    .then((r) => r.data);

/** GET /api/v1/products/:id */
export const getProductById = (productId: string) =>
  axiosInstance.get<ApiResponse<Product>>(`/products/${productId}`).then((r) => r.data);

/** POST /api/v1/products */
export const createProduct = (payload: ProductFormData) =>
  axiosInstance.post<ApiResponse<Product>>('/products', payload).then((r) => r.data);

/** PUT /api/v1/products/:id */
export const updateProduct = (productId: string, payload: Partial<ProductFormData>) =>
  axiosInstance
    .put<ApiResponse<Product>>(`/products/${productId}`, payload)
    .then((r) => r.data);

/** PATCH /api/v1/products/:id — cập nhật một phần */
export const patchProduct = (productId: string, payload: Partial<ProductFormData>) =>
  axiosInstance
    .patch<ApiResponse<Product>>(`/products/${productId}`, payload)
    .then((r) => r.data);

/** DELETE /api/v1/products/:id */
export const deleteProduct = (productId: string) =>
  axiosInstance.delete(`/products/${productId}`);

/** POST /api/v1/products/search/text */
export const searchProductsByText = (payload: ProductSearchTextRequest) => {
  const normalizedPayload = {
    brand_id: payload.brand_id,
    query: payload.query,
    branch_id: payload.branch_id ?? null,
    bot_id: payload.bot_id ?? null,
    top_k: payload.top_k ?? 10,
  };
  return axiosInstance
    .post<any>('/products/search/text', normalizedPayload)
    .then((r) => r.data);
};

/** POST /api/v1/products/search/image */
export const searchProductsByImage = (payload: ProductSearchImageRequest) => {
  const formData = new FormData();
  formData.append('brand_id', payload.brand_id || '');
  formData.append('branch_id', payload.branch_id || '');
  formData.append('bot_id', payload.bot_id || '');
  formData.append('top_k', payload.top_k !== undefined ? payload.top_k.toString() : '10');
  
  if (payload.file) {
    formData.append('file', payload.file);
  }
  if (payload.image_url) {
    formData.append('image_url', payload.image_url);
  }

  return axiosInstance
    .post<any>('/products/search/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((r) => r.data);
};
