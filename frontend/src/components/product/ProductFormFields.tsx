import React from 'react';
import { Image as ImageIcon } from 'lucide-react';
import { ProductFormData, ServiceCatalog } from '../../types';

interface FormFieldsProps {
  formData: ProductFormData;
  catalogs: ServiceCatalog[];
  previewImage: string;
  onHandleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onHandleImageUrlChange: (val: string) => void;
  onSetPreviewImage: (val: string) => void;
}

const ProductFormFields: React.FC<FormFieldsProps> = ({
  formData,
  catalogs,
  previewImage,
  onHandleChange,
  onHandleImageUrlChange,
  onSetPreviewImage,
}) => {
  return (
    <div className="space-y-6">
      {/* Image Preview */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700">Hình ảnh sản phẩm</label>
        <div className="flex gap-4">
          <div className="w-32 h-32 rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center bg-gray-50 overflow-hidden">
            {previewImage ? (
              <img src={previewImage} alt="Preview" className="w-full h-full object-cover" onError={() => onSetPreviewImage('')} />
            ) : (
              <ImageIcon className="text-gray-300 w-10 h-10" />
            )}
          </div>
          <div className="flex-1 space-y-2">
            <input
              type="text"
              placeholder="Nhập URL hình ảnh..."
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm transition-all"
              value={formData.product_image[0]}
              onChange={(e) => onHandleImageUrlChange(e.target.value)}
            />
            <p className="text-[10px] text-gray-400">Hỗ trợ URL trực tiếp (jpg, png, webp)</p>
          </div>
        </div>
      </div>

      {/* Basic Info */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Tên sản phẩm</label>
          <input
            type="text"
            name="name"
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            placeholder="VD: Cà phê Muối"
            value={formData.name}
            onChange={onHandleChange}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Giá (VND)</label>
            <input
              type="number"
              name="price"
              required
              min="0"
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              value={formData.price}
              onChange={onHandleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Danh mục</label>
            <select
              name="category_id"
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-white"
              value={formData.category_id}
              onChange={onHandleChange}
            >
              {catalogs.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.category_name}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Mô tả</label>
          <textarea
            name="description"
            rows={4}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none"
            placeholder="Nhập mô tả sản phẩm..."
            value={formData.description}
            onChange={onHandleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductFormFields;
