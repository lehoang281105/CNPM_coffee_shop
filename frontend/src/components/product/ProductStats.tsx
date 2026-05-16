import React from 'react';
import { Package, CheckCircle, AlertTriangle, Layers } from 'lucide-react';

interface ProductStatsProps {
  total: number;
  active: number;
  outOfStock: number;
  categories: number;
}

const ProductStats: React.FC<ProductStatsProps> = ({ total, active, outOfStock, categories }) => {
  const stats = [
    {
      label: 'Tổng sản phẩm',
      value: total,
      icon: Package,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      label: 'Hoạt động',
      value: active,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      label: 'Hết hàng',
      value: outOfStock,
      icon: AlertTriangle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      label: 'Danh mục',
      value: categories,
      icon: Layers,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center">
          <div className={`${stat.bgColor} p-3 rounded-lg mr-4`}>
            <stat.icon className={`w-6 h-6 ${stat.color}`} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductStats;
