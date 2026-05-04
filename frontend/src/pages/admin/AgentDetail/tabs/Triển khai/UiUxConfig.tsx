import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

type RGB = { r: number; g: number; b: number };

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function rgbToHsv(r: number, g: number, b: number): { h: number; s: number; v: number } {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const d = max - min;
  let h = 0;
  if (d !== 0) {
    if (max === rn) h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6;
    else if (max === gn) h = ((bn - rn) / d + 2) / 6;
    else h = ((rn - gn) / d + 4) / 6;
  }
  const s = max === 0 ? 0 : d / max;
  const v = max;
  return { h: h * 360, s, v };
}

function hsvToRgb(h: number, s: number, v: number): RGB {
  const hh = ((h % 360) + 360) % 360;
  const c = v * s;
  const x = c * (1 - Math.abs(((hh / 60) % 2) - 1));
  const m = v - c;
  let rp = 0;
  let gp = 0;
  let bp = 0;
  if (hh < 60) {
    rp = c;
    gp = x;
  } else if (hh < 120) {
    rp = x;
    gp = c;
  } else if (hh < 180) {
    gp = c;
    bp = x;
  } else if (hh < 240) {
    gp = x;
    bp = c;
  } else if (hh < 300) {
    rp = x;
    bp = c;
  } else {
    rp = c;
    bp = x;
  }
  return {
    r: Math.round((rp + m) * 255),
    g: Math.round((gp + m) * 255),
    b: Math.round((bp + m) * 255),
  };
}

function parseHex(hex: string): RGB | null {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
  if (!m) return null;
  const n = parseInt(m[1], 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

interface PrimaryColorPickerProps {
  value: RGB;
  onChange: (rgb: RGB) => void;
}

const PrimaryColorPicker: React.FC<PrimaryColorPickerProps> = ({ value, onChange }) => {
  const [h, setH] = useState(() => rgbToHsv(value.r, value.g, value.b).h);
  const [s, setS] = useState(() => rgbToHsv(value.r, value.g, value.b).s);
  const [v, setV] = useState(() => rgbToHsv(value.r, value.g, value.b).v);

  const rgb = useMemo(() => hsvToRgb(h, s, v), [h, s, v]);
  const hsvRef = useRef({ h, s, v });
  hsvRef.current = { h, s, v };

  useEffect(() => {
    const { h: nh, s: ns, v: nv } = rgbToHsv(value.r, value.g, value.b);
    setH(nh);
    setS(ns);
    setV(nv);
  }, [value.r, value.g, value.b]);

  const [panelOpen, setPanelOpen] = useState(false);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pointerInside = useRef(false);
  const dragging = useRef<'sv' | 'hue' | null>(null);

  const svRef = useRef<HTMLDivElement | null>(null);
  const hueRef = useRef<HTMLDivElement | null>(null);

  const clearLeaveTimer = () => {
    if (leaveTimer.current) {
      clearTimeout(leaveTimer.current);
      leaveTimer.current = null;
    }
  };

  const scheduleClose = () => {
    clearLeaveTimer();
    leaveTimer.current = setTimeout(() => {
      if (!pointerInside.current && !dragging.current) setPanelOpen(false);
    }, 220);
  };

  const handleEnter = () => {
    pointerInside.current = true;
    clearLeaveTimer();
    setPanelOpen(true);
  };

  const handleLeave = () => {
    pointerInside.current = false;
    if (!dragging.current) scheduleClose();
  };

  const applyRgb = useCallback(
    (next: RGB) => {
      onChange({
        r: clamp(next.r, 0, 255),
        g: clamp(next.g, 0, 255),
        b: clamp(next.b, 0, 255),
      });
    },
    [onChange]
  );

  const setFromHsv = useCallback(
    (nh: number, ns: number, nv: number) => {
      setH(nh);
      setS(ns);
      setV(nv);
      applyRgb(hsvToRgb(nh, ns, nv));
    },
    [applyRgb]
  );

  const pickSv = useCallback(
    (clientX: number, clientY: number) => {
      const el = svRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const ns = clamp((clientX - rect.left) / rect.width, 0, 1);
      const nv = clamp(1 - (clientY - rect.top) / rect.height, 0, 1);
      const hh = hsvRef.current.h;
      setFromHsv(hh, ns, nv);
    },
    [setFromHsv]
  );

  const pickHue = useCallback(
    (clientX: number) => {
      const el = hueRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      let nh = clamp(((clientX - rect.left) / rect.width) * 360, 0, 360);
      if (nh === 360) nh = 0;
      const { s: ss, v: vv } = hsvRef.current;
      setFromHsv(nh, ss, vv);
    },
    [setFromHsv]
  );

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (dragging.current === 'sv') pickSv(e.clientX, e.clientY);
      else if (dragging.current === 'hue') pickHue(e.clientX);
    };
    const onUp = () => {
      dragging.current = null;
      if (!pointerInside.current) scheduleClose();
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, [pickSv, pickHue]);

  useEffect(() => () => clearLeaveTimer(), []);

  const pure = hsvToRgb(h, 1, 1);
  const pureCss = `rgb(${pure.r},${pure.g},${pure.b})`;
  const rgbCss = `rgb(${rgb.r},${rgb.g},${rgb.b})`;

  const handleRgbInput = (channel: keyof RGB, raw: string) => {
    const n = parseInt(raw, 10);
    if (Number.isNaN(n)) return;
    const next = { ...rgb, [channel]: clamp(n, 0, 255) };
    applyRgb(next);
  };

  const handleEyedropper = async () => {
    const EyeDropperCtor = (window as unknown as { EyeDropper?: new () => { open: () => Promise<{ sRGBHex: string }> } })
      .EyeDropper;
    if (!EyeDropperCtor) return;
    try {
      const eye = new EyeDropperCtor();
      const { sRGBHex } = await eye.open();
      const parsed = parseHex(sRGBHex);
      if (parsed) applyRgb(parsed);
    } catch {
      /* user cancelled */
    }
  };

  return (
    <div
      className={`uiux-color-picker ${panelOpen ? 'is-open' : ''}`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <div
        className="uiux-color-picker__preview"
        style={{ background: rgbCss }}
        title="Di chuột để mở bảng chọn màu"
      />

      <div className="uiux-color-picker__panel">
        <div
          ref={svRef}
          className="uiux-color-picker__sv"
          style={{
            background: `linear-gradient(to top, #000, rgba(0,0,0,0)), linear-gradient(to right, #fff, rgba(255,255,255,0)), ${pureCss}`,
          }}
          onMouseDown={(e) => {
            e.preventDefault();
            dragging.current = 'sv';
            pickSv(e.clientX, e.clientY);
          }}
        >
          <span
            className="uiux-color-picker__sv-thumb"
            style={{ left: `${s * 100}%`, top: `${(1 - v) * 100}%` }}
          />
        </div>

        <div className="uiux-color-picker__controls">
          <button className="uiux-color-picker__dropper" type="button" onClick={handleEyedropper}>
            <i className="ti-eyedropper" />
          </button>
          <span className="uiux-color-picker__swatch" style={{ background: rgbCss }} />
          <div
            ref={hueRef}
            className="uiux-color-picker__hue"
            onMouseDown={(e) => {
              e.preventDefault();
              dragging.current = 'hue';
              pickHue(e.clientX);
            }}
          >
            <span
              className="uiux-color-picker__hue-thumb"
              style={{
                left: `${(h / 360) * 100}%`,
                background: pureCss,
              }}
            />
          </div>
        </div>

        <div className="uiux-color-picker__rgb">
          <div>
            <input
              value={String(rgb.r)}
              onChange={(e) => handleRgbInput('r', e.target.value)}
            />
            <label>R</label>
          </div>
          <div>
            <input
              value={String(rgb.g)}
              onChange={(e) => handleRgbInput('g', e.target.value)}
            />
            <label>G</label>
          </div>
          <div>
            <input
              value={String(rgb.b)}
              onChange={(e) => handleRgbInput('b', e.target.value)}
            />
            <label>B</label>
          </div>
        </div>
      </div>
    </div>
  );
};

const UiUxConfig: React.FC = () => {
  const [primaryRgb, setPrimaryRgb] = useState<RGB>({ r: 36, g: 235, b: 201 });

  const accent = `rgb(${primaryRgb.r},${primaryRgb.g},${primaryRgb.b})`;

  return (
    <div className="uiux-page">
      <div className="uiux-header">
        <div>
          <h1 className="uiux-title">Giao diện & Trải nghiệm</h1>
          <p className="uiux-subtitle">Cấu hình widget chat và giao diện tin nhắn</p>
        </div>
        <div className="uiux-actions">
          <button className="btn btn--ghost"><i className="ti-reload" /> Xem trước</button>
          <button className="btn btn--primary"><i className="ti-save" /> Lưu thay đổi</button>
        </div>
      </div>

      <div className="uiux-grid">
        <section className="uiux-card">
          <div className="uiux-card__head">
            <span className="uiux-card__icon"><i className="ti-comment" /></span>
            <div>
              <h3>Widget Chat</h3>
              <p>Cấu hình giao diện widget trên website</p>
            </div>
          </div>

          <div className="uiux-form-2col">
            <div className="form-group">
              <label className="form-label">Vị trí</label>
              <select className="form-select"><option>Góc phải dưới</option></select>
            </div>
            <div className="form-group">
              <label className="form-label">Giao diện</label>
              <select className="form-select"><option>Sáng</option></select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Tiêu đề widget</label>
            <input className="form-input" value="Lumi AI Assistant" readOnly />
          </div>

          <div className="form-group">
            <label className="form-label">Tin nhắn chào mừng</label>
            <input className="form-input" value="Xin chào! Lumi AI có thể giúp gì cho bạn?" readOnly />
          </div>

          <div className="uiux-form-2col">
            <div className="form-group uiux-color-picker-field">
              <label className="form-label">Màu chính</label>
              <PrimaryColorPicker value={primaryRgb} onChange={setPrimaryRgb} />
            </div>
            <div className="form-group">
              <label className="form-label">Bo góc</label>
              <select className="form-select"><option>Vừa</option></select>
            </div>
          </div>

          <div className="uiux-check-list">
            <label><input type="checkbox" defaultChecked /> Hiển thị tên Agent</label>
            <label><input type="checkbox" defaultChecked /> Hiển thị logo</label>
            <label><input type="checkbox" defaultChecked /> Gạch ngang đang gõ</label>
          </div>
        </section>

        <section className="uiux-card">
          <div className="uiux-card__head">
            <span className="uiux-card__icon uiux-card__icon--yellow"><i className="ti-text" /></span>
            <div>
              <h3>Tin nhắn & Trải nghiệm</h3>
              <p>Cấu hình giao diện tin nhắn và tính năng chat</p>
            </div>
          </div>

          <div className="uiux-check-list">
            <label><input type="checkbox" defaultChecked /> Gợi ý trả lời nhanh</label>
            <label><input type="checkbox" defaultChecked /> Animation đang gõ</label>
            <label><input type="checkbox" defaultChecked /> Đã xem (read receipts)</label>
            <label><input type="checkbox" defaultChecked /> Bảng chọn emoji</label>
            <label><input type="checkbox" /> Tải file lên</label>
          </div>

          <div className="form-group" style={{ marginTop: 12 }}>
            <label className="form-label">Gợi ý hội thoại (Quick Replies)</label>
            <div className="uiux-replies">
              <div className="uiux-reply">Kiểm tra đơn hàng <button type="button">×</button></div>
              <div className="uiux-reply">Chính sách hoàn tiền <button type="button">×</button></div>
              <div className="uiux-reply">Hỏi về gói Premium <button type="button">×</button></div>
              <button type="button" className="uiux-add-reply">+ Thêm gợi ý</button>
            </div>
          </div>

          <div className="uiux-preview">
            <div className="uiux-preview__title">Xem trước widget</div>
            <div className="widget-mock">
              <div className="widget-mock__head">
                <span className="widget-mock__avatar" style={{ background: accent }}>L</span>
                <div>
                  <strong>Lumi AI Assistant</strong>
                  <small>ONLINE</small>
                </div>
              </div>
              <div className="widget-mock__bubble">Xin chào! Lumi AI có thể giúp gì cho bạn?</div>
              <div className="widget-mock__chips">
                <span style={{ borderColor: accent, color: accent }}>Kiểm tra đơn hàng</span>
                <span style={{ borderColor: accent, color: accent }}>Chính sách hoàn tiền</span>
                <span style={{ borderColor: accent, color: accent }}>Hỏi về gói Premium</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default UiUxConfig;
