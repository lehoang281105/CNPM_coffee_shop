import React from 'react';
import { X, Loader2 } from 'lucide-react';
import { Product, ProductFormData } from '../../types';
import { useProductForm } from '../../hooks/admin/useProductForm';
import ProductFormFields from './ProductFormFields';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ProductFormData) => Promise<void>;
  initialData?: Product | null;
  brandId: string;
  botId?: string;
}

const ProductModal: React.FC<ProductModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  brandId,
  botId,
}) => {
  const {
    formData,
    catalogs,
    isSubmitting,
    previewImage,
    setPreviewImage,
    handleChange,
    handleImageUrlChange,
    handleSubmit
  } = useProductForm(brandId, botId, initialData, isOpen, onClose, onSubmit);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity" onClick={onClose} />

      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md transform transition ease-in-out duration-500 sm:duration-700">
          <div className="h-full flex flex-col bg-white shadow-2xl overflow-y-scroll">
            {/* Header */}
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">
                {initialData ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}
              </h2>
              <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 rounded-lg">
                <X size={24} />
              </button>
            </div>

            {/* Form */}
            <form id="product-form" onSubmit={handleSubmit} className="flex-1 px-6 py-8">
              <ProductFormFields
                formData={formData}
                catalogs={catalogs}
                previewImage={previewImage}
                onHandleChange={handleChange}
                onHandleImageUrlChange={handleImageUrlChange}
                onSetPreviewImage={setPreviewImage}
              />
            </form>

            {/* Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Hủy bỏ
              </button>
              <button
                type="submit"
                form="product-form"
                disabled={isSubmitting}
                className="flex-[2] px-4 py-2.5 text-sm font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting && <Loader2 size={16} className="animate-spin" />}
                {initialData ? 'Cập nhật sản phẩm' : 'Tạo sản phẩm'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
