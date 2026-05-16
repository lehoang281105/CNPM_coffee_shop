import React from 'react';
import { Edit2, Trash2, Image as ImageIcon } from 'lucide-react';
import { Product } from '../../types';

interface ProductTableProps {
  products: Product[];
  isLoading: boolean;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (product: Product) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({
  products,
  isLoading,
  onEdit,
  onDelete,
  onToggleStatus
}) => {
  const formatCurrency = (amount: any) => {
    if (typeof amount === 'string' && (amount.includes('VNĐ') || amount.includes('đ'))) {
      return amount;
    }
    const num = typeof amount === 'string' ? parseFloat(amount.replace(/[^0-9.-]+/g, "")) : amount;
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(num || 0);
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              {['Ảnh', 'Tên sản phẩm', 'Giá', 'Trạng thái', 'Thao tác'].map((head) => (
                <th key={head} className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, i) => (
              <tr key={i} className="animate-pulse border-b border-gray-50">
                <td className="px-6 py-4"><div className="w-12 h-12 bg-gray-200 rounded-lg"></div></td>
                <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-3/4"></div></td>
                <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-1/2"></div></td>
                <td className="px-6 py-4"><div className="h-6 bg-gray-200 rounded-full w-16"></div></td>
                <td className="px-6 py-4"><div className="h-8 bg-gray-200 rounded w-20"></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase tracking-wider w-24">Ảnh</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">Tên sản phẩm</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">Giá</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">Trạng thái</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase tracking-wider text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {products.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-10 text-center text-gray-500">
                  Không tìm thấy sản phẩm nào
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    {product.product_image && product.product_image.length > 0 ? (
                      <img
                        src={product.product_image[0]}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded-lg border border-gray-100"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=No+Image';
                        }}
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                        <ImageIcon size={20} />
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{product.name}</div>
                    <div className="text-xs text-gray-500 line-clamp-1">{product.description}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 font-semibold">
                    {formatCurrency(product.price || product.product_metadata?.price || 0)}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => onToggleStatus(product)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${(product.is_active ?? product.product_metadata?.is_active) ? 'bg-indigo-600' : 'bg-gray-200'
                        }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${(product.is_active ?? product.product_metadata?.is_active) ? 'translate-x-6' : 'translate-x-1'
                          }`}
                      />
                    </button>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => onEdit(product)}
                      className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                      title="Chỉnh sửa"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => onDelete(product.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Xóa"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;
