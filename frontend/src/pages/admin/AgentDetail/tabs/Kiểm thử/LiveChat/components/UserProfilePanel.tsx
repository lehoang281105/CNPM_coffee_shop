import React, { useState, useEffect } from 'react';
import type { InboxConversationItem, LongTermBaseResponse, LongTermCreateRequest, LongTermUpdateRequest } from '../../../../../../../types';
import * as longtermService from '../../../../../../../services/admin/longtermService';
import ConfirmModal from '../../../../../../../components/common/ConfirmModal';
import NotificationModal from '../../../../../../../components/common/NotificationModal';

interface Props {
  conversation: InboxConversationItem | null;
  onCollapse: () => void;
}

const UserProfilePanel: React.FC<Props> = ({ conversation, onCollapse }) => {
  const [longtermId, setLongtermId] = useState<string>('');
  const [profile, setProfile] = useState<LongTermBaseResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
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
  }, [conversation?.user_id, conversation?.bot_id]);

  const fetchProfile = async () => {
    if (!conversation) return;
    setLoading(true);
    try {
      const res = await longtermService.getAllLongTerms(); // Lấy từ endpoint /all
      // Lọc thủ công bằng JS vì Backend không bắt query param
      const allProfiles = Array.isArray(res.data) ? res.data : [];
      const data = allProfiles.find(item => 
        item.user_id === conversation.user_id && 
        item.bot_id === conversation.bot_id
      ) || null;

      if (data) {
        let genderStr = data.gender || '';
        if (genderStr.toLowerCase() === 'male') genderStr = 'Nam';
        if (genderStr.toLowerCase() === 'female') genderStr = 'Nữ';
        if (genderStr.toLowerCase() === 'other') genderStr = 'Khác';

        setProfile(data);
        setLongtermId(data.id);
        setFormData({
          name: data.name || '',
          phone: data.phone || '',
          gender: genderStr,
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

  const confirmSave = async () => {
    setShowConfirm(false);
    if (!conversation) return;
    setSaving(true);
    try {
      if (longtermId) {
        await longtermService.updateLongTerm(longtermId, {
          ...formData,
          user_id: conversation.user_id,
          bot_id: conversation.bot_id
        });
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
      setShowSuccess(true);
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
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
                <option value="Khác">Khác</option>
                <option value="Chưa xác định">Chưa xác định</option>
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
          onClick={() => setShowConfirm(true)}
          disabled={loading || saving}
        >
          {saving ? 'Đang lưu...' : 'Lưu thông tin'}
        </button>
      </div>

      {showConfirm && (
        <ConfirmModal
          title="Lưu thông tin khách hàng"
          message="Bạn có chắc chắn muốn lưu lại các thay đổi thông tin này không?"
          confirmText="Lưu thay đổi"
          cancelText="Hủy"
          type="info"
          onConfirm={confirmSave}
          onCancel={() => setShowConfirm(false)}
        />
      )}
      
      {showSuccess && (
        <NotificationModal
          title="Thành công"
          message="Đã cập nhật thông tin khách hàng thành công!"
          type="success"
          onClose={() => setShowSuccess(false)}
        />
      )}
    </div>
  );
};

export default UserProfilePanel;
