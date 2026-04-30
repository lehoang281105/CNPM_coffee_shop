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
      <div className="service-tab-header">
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

      <div className="service-tab-content">
        {activeSubTab === 'services' && <ServiceList brandId={brandId} />}
        {activeSubTab === 'catalogs' && <CatalogList brandId={brandId} />}
      </div>
    </div>
  );
};

export default ServiceTab;
