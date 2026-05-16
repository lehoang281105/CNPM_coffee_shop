import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, RotateCcw } from 'lucide-react';
import ProductStats from '../../../../../../components/product/ProductStats';
import ProductTable from '../../../../../../components/product/ProductTable';
import ProductModal from '../../../../../../components/product/ProductModal';
import { Product, ProductFormData } from '../../../../../../types';
import {
  getProductsByFilter,
  getAllProducts,
  createProduct,
  updateProduct,
  patchProduct,
  deleteProduct
} from '../../../../../../services/admin/productService';
import NotificationModal from '../../../../../../components/common/NotificationModal';

interface ProductsProps {
  brandId: string;
  botId?: string;
}

const Products: React.FC<ProductsProps> = ({ brandId, botId }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [notification, setNotification] = useState<{ title: string; message: string; type: 'success' | 'error' } | null>(null);

  const fetchProducts = async (silent = false) => {
    if (!silent) setIsLoading(true);
    try {
      const response = await getAllProducts({ brand_id: brandId });
      if (response.success) {
        setProducts(response.data);
      }
    } catch (error: any) {
      setNotification({
        title: 'Lỗi',
        message: error.message || 'Không thể tải danh sách sản phẩm',
        type: 'error',
      });
    } finally {
      if (!silent) setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [brandId]);

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateOrUpdate = async (data: ProductFormData) => {
    try {
      if (selectedProduct) {
        const res = await updateProduct(selectedProduct.id, data);
        if (res.success) {
          setNotification({ title: 'Thành công', message: 'Cập nhật sản phẩm thành công', type: 'success' });
          fetchProducts();
        }
      } else {
        const res = await createProduct(data);
        if (res.success) {
          setNotification({ title: 'Thành công', message: 'Thêm sản phẩm mới thành công', type: 'success' });
          fetchProducts();
        }
      }
    } catch (error: any) {
      setNotification({ title: 'Lỗi', message: error.message || 'Thao tác thất bại', type: 'error' });
      throw error;
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) return;
    try {
      await deleteProduct(id);
      setNotification({ title: 'Thành công', message: 'Xóa sản phẩm thành công', type: 'success' });
      fetchProducts();
    } catch (error: any) {
      setNotification({ title: 'Lỗi', message: error.message || 'Xóa thất bại', type: 'error' });
    }
  };

  const handleToggleStatus = async (product: Product) => {
    const currentStatus = product.is_active ?? product.product_metadata?.is_active;
    const newStatus = !currentStatus;

    // Cập nhật giao diện ngay lập tức (Optimistic Update)
    setProducts(prev => prev.map(p => 
      p.id === product.id 
        ? { ...p, is_active: newStatus, product_metadata: { ...p.product_metadata, is_active: newStatus } } 
        : p
    ));

    try {
      const res = await patchProduct(product.id, {
        is_active: newStatus,
        product_metadata: {
          ...product.product_metadata,
          is_active: newStatus
        }
      } as any);
      
      if (!res.success) {
        fetchProducts(true); // Tải lại ngầm để đồng bộ nếu có lỗi
      }
    } catch (error: any) {
      fetchProducts(true); // Tải lại ngầm để revert trạng thái
      setNotification({ title: 'Lỗi', message: error.message || 'Cập nhật trạng thái thất bại', type: 'error' });
    }
  };

  // Stats calculation
  const stats = {
    total: products.length,
    active: products.filter(p => p.is_active ?? p.product_metadata?.is_active).length,
    outOfStock: 0, // Backend doesn't support stock yet, placeholder
    categories: new Set(products.map(p => p.category_id || p.product_metadata?.category_id)).size,
  };

  return (
    <div className="space-y-6">
      {/* Header & Stats */}
      <ProductStats {...stats} />

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm theo tên, mô tả..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => fetchProducts()}
            className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
            title="Tải lại"
          >
            <RotateCcw size={20} />
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-all">
            <Filter size={18} />
            Bộ lọc
          </button>
          <button
            onClick={() => {
              setSelectedProduct(null);
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-all shadow-sm shadow-indigo-200"
          >
            <Plus size={18} />
            Thêm sản phẩm
          </button>
        </div>
      </div>

      {/* Table */}
      <ProductTable
        products={filteredProducts}
        isLoading={isLoading}
        onEdit={(p) => {
          setSelectedProduct(p);
          setIsModalOpen(true);
        }}
        onDelete={handleDelete}
        onToggleStatus={handleToggleStatus}
      />

      {/* Modal */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateOrUpdate}
        initialData={selectedProduct}
        brandId={brandId}
        botId={botId}
      />

      {notification && (
        <NotificationModal
          title={notification.title}
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
};

export default Products;
