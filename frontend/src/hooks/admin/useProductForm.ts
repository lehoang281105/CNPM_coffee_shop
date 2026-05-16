import { useState, useEffect } from 'react';
import { Product, ProductFormData, ServiceCatalog } from '../../types';
import { getAllCatalogs } from '../../services/admin/catalogService';

export const useProductForm = (
  brandId: string, 
  botId: string | undefined,
  initialData: Product | null | undefined,
  isOpen: boolean,
  onClose: () => void,
  onSubmit: (data: ProductFormData) => Promise<void>
) => {
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    price: 0,
    description: '',
    product_image: [''],
    is_active: true,
    category_id: '',
    brand_id: brandId,
    bot_ids: botId ? [botId] : [],
    branch_ids: [],
    product_metadata: {},
  });
  
  const [catalogs, setCatalogs] = useState<ServiceCatalog[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>('');

  // Sync initial data
  useEffect(() => {
    if (initialData) {
      const meta = initialData.product_metadata || {};
      const rawPrice = initialData.price || meta.price || 0;
      const cleanPrice = typeof rawPrice === 'string' ? parseFloat(rawPrice.replace(/[^0-9.-]+/g, "")) : rawPrice;
      
      setFormData({
        name: initialData.name,
        price: isNaN(cleanPrice) ? 0 : cleanPrice,
        description: initialData.description,
        product_image: initialData.product_image && initialData.product_image.length > 0 ? initialData.product_image : [''],
        is_active: initialData.is_active ?? meta.is_active ?? true,
        category_id: initialData.category_id || meta.category_id || '',
        brand_id: brandId,
        bot_ids: initialData.bot_ids || (botId ? [botId] : []),
        branch_ids: initialData.branch_ids || [],
        product_metadata: meta,
      });
      if (initialData.product_image && initialData.product_image.length > 0) {
        setPreviewImage(initialData.product_image[0]);
      }
    } else {
      setFormData({
        name: '',
        price: 0,
        description: '',
        product_image: [''],
        is_active: true,
        category_id: '',
        brand_id: brandId,
        bot_ids: botId ? [botId] : [],
        branch_ids: [],
        product_metadata: {},
      });
      setPreviewImage('');
    }
  }, [initialData, brandId, botId]);

  // Fetch catalogs
  useEffect(() => {
    const fetchCatalogs = async () => {
      try {
        const response = await getAllCatalogs();
        if (response.success) {
          setCatalogs(response.data);
          if (!initialData && response.data.length > 0) {
            setFormData(prev => ({ ...prev, category_id: response.data[0].id }));
          }
        }
      } catch (error) {
        console.error('Failed to fetch catalogs:', error);
      }
    };
    if (isOpen) fetchCatalogs();
  }, [isOpen, initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'number') {
      setFormData({ ...formData, [name]: parseFloat(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageUrlChange = (val: string) => {
    setFormData({ ...formData, product_image: [val] });
    setPreviewImage(val);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Chuẩn bị dữ liệu cuối cùng, ép buộc lấy ID từ props để đảm bảo chính xác theo ngữ cảnh Agent hiện tại
    const finalData: ProductFormData = {
      ...formData,
      brand_id: brandId, // Luôn lấy brandId từ trang chi tiết Agent
      bot_ids: botId ? (formData.bot_ids?.includes(botId) ? formData.bot_ids : [...(formData.bot_ids || []), botId]) : (formData.bot_ids || []),
      branch_ids: formData.branch_ids || [],
      product_metadata: {
        ...formData.product_metadata,
        price: formData.price,
        is_active: formData.is_active,
        category_id: formData.category_id
      }
    };
    
    try {
      await onSubmit(finalData);
      onClose();
    } catch (error) {
      console.error('Submit failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    catalogs,
    isSubmitting,
    previewImage,
    setPreviewImage,
    handleChange,
    handleImageUrlChange,
    handleSubmit
  };
};
