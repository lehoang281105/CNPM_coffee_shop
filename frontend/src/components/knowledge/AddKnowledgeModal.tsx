import React, { useState } from 'react';
import { IconWebsite, IconPDF, IconClose } from '../common/Icons';

interface AddKnowledgeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
}

const AddKnowledgeModal: React.FC<AddKnowledgeModalProps> = ({ isOpen, onClose, onSave }) => {
  const [sourceType, setSourceType] = useState<'website' | 'pdf'>('website');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden flex flex-col transform transition-all">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-gray-50/50">
          <h3 className="text-lg font-semibold text-gray-900">Thêm nguồn tri thức</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1.5 rounded-lg transition-colors"
          >
            <IconClose className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 flex-1 overflow-y-auto">
          {/* Source Type Selector */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button 
              className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${sourceType === 'website' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50'}`}
              onClick={() => setSourceType('website')}
            >
              <IconWebsite className="w-6 h-6 mb-2" />
              <span className="font-medium text-sm">Website URL</span>
            </button>
            <button 
              className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${sourceType === 'pdf' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50'}`}
              onClick={() => setSourceType('pdf')}
            >
              <IconPDF className="w-6 h-6 mb-2" />
              <span className="font-medium text-sm">Tải lên PDF</span>
            </button>
          </div>

          {/* Form Fields */}
          {sourceType === 'website' ? (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-200">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Đường dẫn Website</label>
                <input 
                  type="url" 
                  placeholder="https://example.com" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-200">
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer">
                <IconPDF className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                <p className="text-sm text-gray-600 font-medium mb-1">Click để tải lên hoặc kéo thả file vào đây</p>
                <p className="text-xs text-gray-400">Định dạng hỗ trợ: .pdf (Max: 10MB)</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end space-x-3">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Hủy
          </button>
          <button 
            onClick={() => onSave && onSave({ sourceType })}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-sm"
          >
            Tải lên
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default AddKnowledgeModal;
