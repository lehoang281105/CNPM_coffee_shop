import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface HeaderProps {
  onCreateBrand: () => void;
  onCreateBot: () => void;
  onOpenHelp: () => void;
}

const Header: React.FC<HeaderProps> = ({ onCreateBrand, onCreateBot, onOpenHelp }) => {
  const location = useLocation();

  return (
    <header className="header">
      {/* Logo */}
      <div className="header-logo">
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div className="logo-icon">
            <i className="ti-comments" style={{ fontSize: '20px' }} />
          </div>
          <span className="logo-name">MASS CHATBOT</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="header-nav">

        {/* Help icon-only */}
        <button id="btn-help" className="nav-btn nav-btn--icon" title="Trợ giúp" onClick={onOpenHelp}>
          <i className="ti-help" />
        </button>

        {/* Create Brand */}
        <button id="btn-create-brand" className="nav-btn" onClick={onCreateBrand}>
          <i className="ti-home" />
          Tạo thương hiệu
        </button>

        {/* Create AI */}
        <button id="btn-create-ai" className="nav-btn nav-btn--primary" onClick={onCreateBot}>
          <i className="ti-plus" />
          Tạo AI
        </button>
      </nav>
    </header>
  );
};

export default Header;
