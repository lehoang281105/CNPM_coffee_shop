import React, { useState, useEffect } from 'react';
import type { InboxConversationItem, LongTermBaseResponse, LongTermCreateRequest, LongTermUpdateRequest } from '../../../../../../../types';
import * as longtermService from '../../../../../../../services/admin/longtermService';

interface Props {
  conversation: InboxConversationItem | null;
  onCollapse: () => void;
}

const UserProfilePanel: React.FC<Props> = ({ conversation, onCollapse }) => {
  const [longtermId, setLongtermId] = useState<string>('');
  const [profile, setProfile] = useState<LongTermBaseResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<LongTermUpdateRequest>({
    name: '',
    phone: '',
    gender: '',
    description: '',
    language: ''
  });

  useEffect(() => {
    if (conversation) {
      fetchProfile();
    } else {
      setProfile(null);
      setLongtermId('');
      setFormData({ name: '', phone: '', gender: '', description: '', language: '' });
    }
  }, [conversation]);

  const fetchProfile = async () => {
    if (!conversation) return;
    setLoading(true);
    try {
      const res = await longtermService.getLongTerms({
        user_id: conversation.user_id,
        bot_id: conversation.bot_id
      });
      const data = Array.isArray(res.data) && res.data.length > 0 ? res.data[0] : null;
      if (data) {
        setProfile(data);
        setLongtermId(data.id);
        setFormData({
          name: data.name || '',
          phone: data.phone || '',
          gender: data.gender || '',
          description: data.description || '',
          language: data.language || ''
        });
      } else {
        setProfile(null);
        setLongtermId('');
        setFormData({ name: '', phone: '', gender: '', description: '', language: '' });
      }
    } catch (e) {
      console.error("Failed to fetch profile", e);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!conversation) return;
    setSaving(true);
    try {
      if (longtermId) {
        await longtermService.updateLongTerm(longtermId, formData);
      } else {
        const createPayload: LongTermCreateRequest = {
          user_id: conversation.user_id,
          bot_id: conversation.bot_id,
          name: formData.name,
          phone: formData.phone,
          gender: formData.gender,
          description: formData.description,
          language: formData.language,
        };
        const res = await longtermService.createLongTerm(createPayload);
        if (res.data && res.data.id) {
          setLongtermId(res.data.id);
        }
      }
      // Optional: show success toast
    } catch (e) {
      console.error("Failed to update profile", e);
    } finally {
      setSaving(false);
    }
  };

  if (!conversation) {
    return (
      <div className="user-profile-panel" style={{ alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
        Thông tin khách hàng
      </div>
    );
  }

  return (
    <div className="user-profile-panel">
      <div className="user-profile-header panel-header-fixed">
        <h3>Thông tin khách hàng</h3>
        <button className="btn-icon-collapse" onClick={onCollapse} title="Thu gọn">
          <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>
      </div>

      <div className="user-profile-content">
        {loading ? (
          <div style={{ textAlign: 'center', color: '#94a3b8', padding: 20 }}>Đang tải...</div>
        ) : (
          <>
            <div className="profile-field">
              <label>Họ và tên</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Nhập tên khách hàng"
              />
            </div>

            <div className="profile-field">
              <label>Số điện thoại</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="Nhập số điện thoại"
              />
            </div>

            <div className="profile-field">
              <label>Giới tính</label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              >
                <option value="">-- Chọn giới tính --</option>
                <option value="male">Nam</option>
                <option value="female">Nữ</option>
                <option value="other">Khác</option>
              </select>
            </div>

            <div className="profile-field">
              <label>Ghi chú</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Thêm ghi chú về khách hàng..."
              />
            </div>

            <div className="profile-field">
              <label>Ngôn ngữ</label>
              <input
                type="text"
                value={formData.language}
                onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                placeholder="VD: vi, en"
              />
            </div>
          </>
        )}
      </div>

      <div className="user-profile-actions">
        <button
          className="btn-save-profile"
          onClick={handleSave}
          disabled={loading || saving}
        >
          {saving ? 'Đang lưu...' : 'Lưu thông tin'}
        </button>
      </div>
    </div>
  );
};

export default UserProfilePanel;
