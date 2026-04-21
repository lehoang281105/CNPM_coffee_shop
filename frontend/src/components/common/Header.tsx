import React from 'react';

interface HeaderProps {
  onCreateBrand: () => void;
  onCreateBot: () => void;
  onOpenHelp: () => void;
}

const Header: React.FC<HeaderProps> = ({ onCreateBrand, onCreateBot, onOpenHelp }) => (
  <header className="header">
    {/* Logo */}
    <div className="header-logo">
      <div className="logo-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          <circle cx="9" cy="10" r="1" fill="currentColor" />
          <circle cx="12" cy="10" r="1" fill="currentColor" />
          <circle cx="15" cy="10" r="1" fill="currentColor" />
        </svg>
      </div>
      <span className="logo-name">MASS CHATBOT</span>
    </div>

    {/* Navigation */}
    <nav className="header-nav">
      {/* Help icon-only */}
      <button id="btn-help" className="nav-btn nav-btn--icon" title="Trợ giúp" onClick={onOpenHelp}>
        ?
      </button>


      {/* Create Brand */}
      <button id="btn-create-brand" className="nav-btn" onClick={onCreateBrand}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9,22 9,12 15,12 15,22" />
        </svg>
        Tạo thương hiệu
      </button>

      {/* Create AI */}
      <button id="btn-create-ai" className="nav-btn nav-btn--primary" onClick={onCreateBot}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="16" />
          <line x1="8" y1="12" x2="16" y2="12" />
        </svg>
        Tạo AI
      </button>
    </nav>
  </header>
);

export default Header;
