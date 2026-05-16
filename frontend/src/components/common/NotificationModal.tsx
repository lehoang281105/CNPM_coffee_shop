import React from 'react';

export interface NotificationModalProps {
  title: string;
  message: string;
  type?: 'success' | 'error' | 'info'| 'warning';
  onClose: () => void;
}

const NotificationModal: React.FC<NotificationModalProps> = ({ title, message, type = 'info', onClose }) => {
  let iconClass = 'ti-info-alt';
  let iconColor = 'var(--color-primary)';
  
  let iconBg = 'rgba(79, 99, 210, 0.1)';
  
  if (type === 'success') {
    iconClass = 'ti-check';
    iconColor = 'var(--color-success, #10b981)';
    iconBg = 'rgba(16, 185, 129, 0.1)';
  } else if (type === 'error') {
    iconClass = 'ti-close';
    iconColor = 'var(--color-danger, #ef4444)';
    iconBg = 'rgba(239, 68, 68, 0.1)';
  }

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 9999, backdropFilter: 'blur(4px)' }}>
      <div 
        className="modal-content" 
        onClick={e => e.stopPropagation()} 
        style={{ 
          maxWidth: 600, 
          width: '90%',
          textAlign: 'center', 
          padding: '60px 40px',
          background: 'var(--color-surface, #ffffff)',
          borderRadius: 24,
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          border: '1px solid var(--color-border)',
          transform: 'scale(1)',
          animation: 'popIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        <style>{`
          @keyframes popIn {
            0% { opacity: 0; transform: scale(0.9) translateY(10px); }
            100% { opacity: 1; transform: scale(1) translateY(0); }
          }
        `}</style>
        
        <div style={{ 
          width: 64, height: 64, 
          borderRadius: '50%', 
          background: iconBg, 
          color: iconColor, 
          fontSize: 32, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          margin: '0 auto 20px'
        }}>
          <i className={iconClass} style={{ fontWeight: 'bold' }}></i>
        </div>

        <h2 style={{ marginBottom: 8, fontSize: 20, fontWeight: 700, color: 'var(--color-text)' }}>
          {title}
        </h2>
        
        <p style={{ color: 'var(--color-text-sub)', marginBottom: 28, fontSize: 15, lineHeight: 1.5 }}>
          {message}
        </p>
        
        <button 
          className="btn btn--primary" 
          onClick={onClose} 
          style={{ 
            width: '100%', 
            justifyContent: 'center', 
            padding: '12px', 
            fontSize: 15,
            fontWeight: 600,
            borderRadius: 12
          }}
        >
          Xác nhận
        </button>
      </div>
    </div>
  );
};

export default NotificationModal;
