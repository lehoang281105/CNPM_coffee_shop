import React from 'react';
import SourceCard from '../knowledge/SourceCard';
import { IconAgent, IconPlus, IconChevronRight } from '../common/Icons';
import type { KnowledgeFAQ } from '../../types';

interface AgentSectionProps {
  faqs: KnowledgeFAQ[];
  statAgentCount: number;
  isExpanded: boolean;
  onToggle: () => void;
  onAddSource: () => void;
}

const AgentSection: React.FC<AgentSectionProps> = ({ 
  faqs, 
  statAgentCount, 
  isExpanded, 
  onToggle, 
  onAddSource 
}) => {
  const formatTime = (ts?: number) => {
    if (!ts) return "Gần đây";
    return new Date(ts * 1000).toLocaleDateString('vi-VN'); 
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm transition-all duration-200">
      <div 
        className={`flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50/50 cursor-pointer hover:bg-gray-100/50 transition-colors ${isExpanded ? 'rounded-t-2xl' : 'rounded-2xl border-b-0'}`}
        onClick={onToggle}
      >
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-lg bg-green-100 text-green-500 flex items-center justify-center mr-3">
            <IconAgent />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Tri thức Agent</h3>
            <p className="text-xs text-gray-500">Nguồn tri thức riêng của Agent này — mở rộng từ Brand</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-xs text-green-600 font-medium px-2.5 py-1 bg-green-50 rounded-full">{statAgentCount} bài viết</span>
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
          {faqs.length > 0 ? faqs.map((faq, idx) => (
            <SourceCard 
              key={faq.id || idx}
              title={faq.question}
              type="FAQ"
              recordCount={1} 
              timeText={formatTime(faq.updated_at)}
            />
          )) : (
            <div className="col-span-3 text-center py-6 text-gray-400 text-sm">Không có dữ liệu tri thức Agent</div>
          )}
        </div>
      )}
    </div>
  );
};

export default AgentSection;
