import React from 'react';
import SourceCard from '../../../../../../components/knowledge/SourceCard';
import { IconBrand, IconPlus, IconChevronRight } from '../../../../../../components/common/Icons';
import type { KnowledgeDocument, SourceType } from '../../../../../../types';

interface BrandSectionProps {
  documents: KnowledgeDocument[];
  statBrandCount: number;
  isExpanded: boolean;
  onToggle: () => void;
  onAddSource: () => void;
}

const BrandSection: React.FC<BrandSectionProps> = ({ 
  documents, 
  statBrandCount, 
  isExpanded, 
  onToggle, 
  onAddSource 
}) => {
  const formatTime = (ts?: number) => {
    if (!ts) return "Gần đây";
    return new Date(ts * 1000).toLocaleDateString('vi-VN'); 
  };

  const mapDocType = (typeStr?: string): SourceType => {
    if (!typeStr) return 'Website';
    if (typeStr.toLowerCase().includes('web')) return 'Website';
    if (typeStr.toLowerCase().includes('pdf')) return 'PDF';
    return 'Website';
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm transition-all duration-200">
      <div 
        className={`flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50/50 cursor-pointer hover:bg-gray-100/50 transition-colors ${isExpanded ? 'rounded-t-2xl' : 'rounded-2xl border-b-0'}`}
        onClick={onToggle}
      >
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-500 flex items-center justify-center mr-3">
            <IconBrand />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Tri thức Brand</h3>
            <p className="text-xs text-gray-500">Nguồn tri thức do Brand quản lý — dùng chung cho mọi Agent</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-xs text-blue-600 font-medium px-2.5 py-1 bg-blue-50 rounded-full">{statBrandCount} bài viết</span>
          <button 
            onClick={(e) => { e.stopPropagation(); onAddSource(); }} 
            className="text-sm font-medium text-gray-700 px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 bg-white shadow-sm flex items-center"
          >
            <IconPlus className="w-4 h-4 mr-1" />
            Thêm nguồn
          </button>
          <button className={`text-gray-400 p-1 transform transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}>
            <IconChevronRight />
          </button>
        </div>
      </div>
      
      {isExpanded && (
        <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-4 bg-white rounded-b-2xl">
          {documents.length > 0 ? documents.map((doc, idx) => (
            <SourceCard 
              key={doc.id || idx}
              title={doc.title}
              type={mapDocType(doc.status)}
              recordCount={1} 
              timeText={formatTime(doc.updated_at)}
              hasError={doc.status === 'error'}
            />
          )) : (
            <div className="col-span-3 text-center py-6 text-gray-400 text-sm">Không có dữ liệu tri thức Brand</div>
          )}
        </div>
      )}
    </div>
  );
};

export default BrandSection;
