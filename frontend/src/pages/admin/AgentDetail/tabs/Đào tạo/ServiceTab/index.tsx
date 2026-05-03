import React, { useState } from 'react';
import CatalogList from './CatalogList';
import ServiceList from './ServiceList';
import './ServiceTab.css';

interface ServiceTabProps {
  botId: string;
  brandId?: string;
}

const ServiceTab: React.FC<ServiceTabProps> = ({ botId, brandId }) => {
  const [activeSubTab, setActiveSubTab] = useState<'services' | 'catalogs'>('services');

  return (
    <div className="service-tab-container">
      {/* Header */}
      <div className="service-page-header">
        <div>
          <h1 className="service-page-title">Dịch vụ</h1>
          <p className="service-page-subtitle">Quản lý danh sách dịch vụ và danh mục của thương hiệu</p>
        </div>
      </div>
      {/* Sub-tab Switcher */}
      <div className="service-subtab-bar">
        <button
          className={`sub-tab-btn ${activeSubTab === 'services' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('services')}
        >
          Danh sách dịch vụ
        </button>
        <button
          className={`sub-tab-btn ${activeSubTab === 'catalogs' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('catalogs')}
        >
          Danh mục dịch vụ
        </button>
      </div>

      {/* Content */}
      {activeSubTab === 'services' && <ServiceList brandId={brandId} />}
      {activeSubTab === 'catalogs' && <CatalogList brandId={brandId} />}
    </div>
  );
};

export default ServiceTab;
