import React from 'react';
import { IconLightning, IconDatabase, IconPlay, IconCheckCircle } from '../common/Icons';

interface SkillStatsProps {
  customCount: number;
  activatedTemplateCount?: number;
  totalTemplateCount?: number;
}

const SkillStats: React.FC<SkillStatsProps> = ({
  customCount,
  activatedTemplateCount = 0,
  totalTemplateCount = 8
}) => {
  const stats = [
    { title: 'Skill custom', value: customCount.toString(), icon: <IconLightning className="w-6 h-6 text-indigo-500" />, bgColor: 'bg-indigo-50' },
    { title: 'Template đã kích hoạt', value: `${activatedTemplateCount}/${totalTemplateCount}`, icon: <IconDatabase className="w-6 h-6 text-blue-500" />, bgColor: 'bg-blue-50' },
    { title: 'Lần thực thi', value: '3.402', icon: <IconPlay className="w-6 h-6 text-green-500" />, bgColor: 'bg-green-50' },
    { title: 'Thành công TB', value: '60%', icon: <IconCheckCircle className="w-6 h-6 text-orange-500" />, bgColor: 'bg-orange-50' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white border border-gray-200 rounded-xl p-5 flex items-center shadow-sm">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 ${stat.bgColor}`}>
            {stat.icon}
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900 leading-tight">{stat.value}</div>
            <div className="text-sm text-gray-500 font-medium">{stat.title}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkillStats;
