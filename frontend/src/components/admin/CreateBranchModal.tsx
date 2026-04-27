import React, { useEffect, useState } from 'react';
import type {
  Branch,
  BranchCreatePayload,
  BranchUpdatePayload,
} from '../../types';

interface BranchModalProps {
  mode: 'create' | 'edit';
  branch?: Branch | null;
  brandId?: string | null;
  loading?: boolean;
  onClose: () => void;
  onSubmit: (payload: BranchCreatePayload | BranchUpdatePayload) => Promise<void>;
}

interface BranchFormState {
  name: string;
  address: string;
  google_map_url: string;
  description: string;
  status: string;
  latitude: string;
  longitude: string;
}

const buildInitialForm = (branch?: Branch | null): BranchFormState => ({
  name: branch?.name ?? '',
  address: branch?.address ?? '',
  google_map_url: branch?.google_map_url ?? '',
  description: branch?.description ?? '',
  status: branch?.status ?? 'active',
  latitude: branch?.latitude ?? '',
  longitude: branch?.longitude ?? '',
});

const extractCoordinates = (
  googleMapUrl: string
): { latitude: string; longitude: string } | null => {
  const trimmedUrl = googleMapUrl.trim();
  if (!trimmedUrl) return null;

  const patterns = [
    /@(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/,
    /[?&]q=(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/,
    /[?&]ll=(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/,
    /!3d(-?\d+(?:\.\d+)?)!4d(-?\d+(?:\.\d+)?)/,
  ];

  for (const regex of patterns) {
    const match = trimmedUrl.match(regex);
    if (match?.[1] && match?.[2]) {
      return { latitude: match[1], longitude: match[2] };
    }
  }

  return null;
};

const CreateBranchModal: React.FC<BranchModalProps> = ({
  mode,
  branch,
  brandId,
  loading = false,
  onClose,
  onSubmit,
}) => {
  const [form, setForm] = useState<BranchFormState>(buildInitialForm(branch));
  const [error, setError] = useState('');

  useEffect(() => {
    setForm(buildInitialForm(branch));
    setError('');
  }, [branch, mode]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) {
      setError('Tên chi nhánh là bắt buộc.');
      return;
    }
    if (!form.address.trim()) {
      setError('Địa chỉ là bắt buộc.');
      return;
    }
    if (!form.google_map_url.trim()) {
      setError('Link Google Map là bắt buộc.');
      return;
    }

    const parsedCoordinates = extractCoordinates(form.google_map_url);
    const hasExistingCoordinates = form.latitude && form.longitude;

    if (!parsedCoordinates && !hasExistingCoordinates) {
      setError('Link Google Map chưa có tọa độ. Vui lòng dùng link chứa lat/lng.');
      return;
    }

    setError('');

    const latitude = parsedCoordinates?.latitude ?? form.latitude;
    const longitude = parsedCoordinates?.longitude ?? form.longitude;

    const payloadBase = {
      name: form.name.trim(),
      address: form.address.trim(),
      google_map_url: form.google_map_url.trim(),
      description: form.description.trim() || undefined,
      status: form.status || 'active',
      latitude,
      longitude,
    };

    if (mode === 'create') {
      await onSubmit({
        ...payloadBase,
        brand_id: brandId ?? undefined,
      });
      return;
    }

    await onSubmit({
      ...payloadBase,
      brand_id: brand?.brand_id ?? brandId ?? undefined,
    });
  };

  const isEditMode = mode === 'edit';

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div
        className="modal branch-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="branch-modal-title"
      >
        <div className="modal-header">
          <h2 className="modal-title" id="branch-modal-title">
            {isEditMode ? 'Cập nhật chi nhánh' : 'Thêm mới chi nhánh'}
          </h2>
          <button className="modal-close" onClick={onClose} aria-label="Đóng">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body branch-modal-body">
            {error && <div className="error-banner">⚠️ {error}</div>}

            <div className="form-group">
              <label className="form-label" htmlFor="branch-name">
                Tên chi nhánh <span className="req">*</span>
              </label>
              <input
                id="branch-name"
                name="name"
                className="form-input"
                value={form.name}
                onChange={handleChange}
                placeholder="Nhập tên"
                autoFocus
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="branch-address">
                Địa chỉ <span className="req">*</span>
              </label>
              <input
                id="branch-address"
                name="address"
                className="form-input"
                value={form.address}
                onChange={handleChange}
                placeholder="Nhập địa chỉ"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="branch-map-url">
                Link Google Map <span className="req">*</span>
              </label>
              <input
                id="branch-map-url"
                name="google_map_url"
                className="form-input"
                value={form.google_map_url}
                onChange={handleChange}
                placeholder="Nhập link Google Map"
              />
              <p className="form-hint">
                Link nên chứa tọa độ (ví dụ có <code>@lat,lng</code> hoặc <code>?q=lat,lng</code>).
              </p>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="branch-description">
                Mô tả
              </label>
              <textarea
                id="branch-description"
                name="description"
                className="form-textarea"
                value={form.description}
                onChange={handleChange}
                placeholder="Nhập mô tả"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="branch-status">
                Trạng thái
              </label>
              <select
                id="branch-status"
                name="status"
                className="form-select"
                value={form.status}
                onChange={handleChange}
              >
                <option value="active">Hoạt động</option>
                <option value="inactive">Không hoạt động</option>
              </select>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn--ghost" onClick={onClose} disabled={loading}>
              Hủy
            </button>
            <button type="submit" className="btn btn--primary" disabled={loading}>
              {loading ? 'Đang xử lý...' : isEditMode ? 'Cập nhật' : 'Thêm mới'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBranchModal;
