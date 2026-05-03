import React, { useState, useEffect } from 'react';
import { IconClose } from '../../../../../../components/common/Icons';
import { createSkill, updateSkill } from '../../../../../../services/admin/skillService';
import type { SkillBaseResponse } from '../../../../../../types';

interface CreateSkillModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  agentId?: string;
  brandId?: string;
  editData?: SkillBaseResponse | null;
}

const CreateSkillModal: React.FC<CreateSkillModalProps> = ({ 
  isOpen, 
  onClose, 
  onSuccess, 
  agentId, 
  brandId,
  editData 
}) => {
  const [machineName, setMachineName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      if (editData) {
        setMachineName(editData.name);
        setDescription(editData.description || '');
      } else {
        setMachineName('');
        setDisplayName('');
        setDescription('');
      }
      setError(null);
    }
  }, [isOpen, editData]);

  if (!isOpen) return null;

  const handleClose = () => {
    if (isLoading) return;
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!machineName.trim()) {
      setError('Machine Name không được để trống.');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const payload = {
        name: machineName.trim(), 
        description: description.trim(),
        endpoint: editData?.endpoint || "",
        method: editData?.method || "POST",
        parameters: editData?.parameters || {},
        fixed_parameters: editData?.fixed_parameters || {},
        headers: editData?.headers || {},
        is_active: editData ? editData.is_active : true,
        brand_id: brandId || editData?.brand_id || "",
      };

      if (editData) {
        await updateSkill(editData.id, payload);
      } else {
        await createSkill(payload);
      }
      onSuccess();
      handleClose();
    } catch (err: any) {
      console.error('Error saving skill:', err);
      setError(err?.response?.data?.message || 'Có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-[500px] overflow-hidden flex flex-col transform transition-all">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-900">{editData ? 'Chỉnh sửa Skill custom' : 'Tạo Skill custom mới'}</h3>
          <button 
            onClick={handleClose}
            disabled={isLoading}
            className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1.5 rounded-lg transition-colors disabled:opacity-50"
          >
            <IconClose className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-1 space-y-5">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Machine Name</label>
            <input 
              type="text" 
              value={machineName}
              onChange={(e) => setMachineName(e.target.value)}
              placeholder="VD: tim_chi_nhanh" 
              disabled={isLoading}
              className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow disabled:bg-gray-50 disabled:text-gray-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Tên hiển thị</label>
            <input 
              type="text" 
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="VD: Tìm chi nhánh gần nhất" 
              disabled={isLoading}
              className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow disabled:bg-gray-50 disabled:text-gray-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Mô tả</label>
            <textarea 
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isLoading}
              className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow disabled:bg-gray-50 disabled:text-gray-500 resize-none"
            ></textarea>
          </div>

          {/* Alert Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-700 leading-relaxed">
              <span className="font-bold">Lưu ý:</span> Skill custom cần được cấu hình API endpoint và parameters trong phần cài đặt kỹ thuật.
            </p>
          </div>

          {/* Footer */}
          <div className="pt-2 flex justify-between gap-3">
            <button 
              type="button"
              onClick={handleClose}
              disabled={isLoading}
              className="px-5 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors"
            >
              Hủy
            </button>
            <button 
              type="submit"
              disabled={isLoading}
              className="flex items-center px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-sm disabled:opacity-70 transition-colors"
            >
              {isLoading && (
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              {editData ? 'Lưu thay đổi' : 'Tạo Skill'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateSkillModal;
