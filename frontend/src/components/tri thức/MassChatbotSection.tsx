import React from 'react';
import IntegrationRow from '../knowledge/IntegrationRow';
import { IconChatbot, IconChevronRight, IconModule } from '../common/Icons';
import type { MassModule } from '../../types';
import { mockIntegrations } from '../../pages/admin/AgentDetail/tabs/Tri thức/mockData';

interface MassChatbotSectionProps {
  massModules: MassModule[];
  activeModulesCount: number;
  isExpanded: boolean;
  onToggle: () => void;
  isToggling: string | null;
  onToggleModule: (id: string, currentStatus: boolean) => void;
}

const MassChatbotSection: React.FC<MassChatbotSectionProps> = ({ 
  massModules, 
  activeModulesCount, 
  isExpanded, 
  onToggle, 
  isToggling, 
  onToggleModule 
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm transition-all duration-200">
      <div 
        className={`flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50/50 cursor-pointer hover:bg-gray-100/50 transition-colors ${isExpanded ? 'rounded-t-2xl' : 'rounded-2xl border-b-0'}`}
        onClick={onToggle}
      >
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-lg bg-yellow-100 text-yellow-600 flex items-center justify-center mr-3">
            <IconChatbot />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Học từ Mass_chatbot</h3>
            <p className="text-xs text-gray-500">Cho phép AI học từ dữ liệu các phân hệ khác trong Mass_chatbot</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-xs text-yellow-700 font-medium px-2.5 py-1 bg-yellow-100/50 border border-yellow-200 rounded-full">
            {activeModulesCount}/{massModules.length} mô-đun
          </span>
          <button className={`text-gray-400 p-1 transform transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}>
            <IconChevronRight />
          </button>
        </div>
      </div>
      
      {isExpanded && (
        <>
          <div className="p-5 pb-2 bg-white">
            {massModules.map((module) => {
              const mockObj = mockIntegrations.find(i => i.id === module.code);
              const icon = mockObj ? mockObj.icon : <IconModule />;
              
              return (
                <IntegrationRow 
                  key={module.id}
                  module={module}
                  icon={icon}
                  isLoading={isToggling === module.id}
                  onToggle={onToggleModule}
                />
              );
            })}
          </div>

          <div className="p-4 mx-5 mb-5 bg-orange-50 border border-orange-100 rounded-xl text-sm text-orange-800">
            <strong>Lưu ý:</strong> Dữ liệu học sẽ được ẩn danh hóa. AI chỉ học pattern xử lý, không lưu thông tin nhạy cảm.
          </div>
        </>
      )}
    </div>
  );
};

export default MassChatbotSection;
