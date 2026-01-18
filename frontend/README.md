# ☕ Hệ thống quản lý chuỗi cửa hàng Cafe - Frontend

Ứng dụng frontend cho hệ thống quản lý chuỗi cửa hàng cafe, được xây dựng với React, TypeScript và Vite.

## 🚀 Công nghệ sử dụng

- **Framework**: React 19.2.0
- **Ngôn ngữ**: TypeScript 5.9.3
- **Build Tool**: Vite 7.2.4
- **CSS**: CSS Modules / Vanilla CSS
- **Linting**: ESLint
- **Package Manager**: npm

## 📋 Yêu cầu hệ thống

- Node.js >= 18.0.0
- npm >= 9.0.0

## 📦 Cài đặt

1. **Clone repository và di chuyển vào thư mục frontend:**
   ```bash
   cd frontend
   ```

2. **Cài đặt dependencies:**
   ```bash
   npm install
   ```

3. **Cấu hình biến môi trường:**
   ```bash
   # Sao chép file .env.example thành .env
   cp .env.example .env
   
   # Chỉnh sửa các biến môi trường trong file .env
   ```

## 🏃 Chạy ứng dụng

### Development Mode
```bash
npm run dev
```
Ứng dụng sẽ chạy tại: `http://localhost:5173`

### Build Production
```bash
npm run build
```
Build output sẽ được tạo trong thư mục `dist/`

### Preview Production Build
```bash
npm run preview
```

### Lint Code
```bash
npm run lint
```

## 📁 Cấu trúc thư mục

```
frontend/
├── public/                 # Tài sản tĩnh (favicon, robots.txt, ...)
├── src/
│   ├── assets/             # Tài nguyên (Ảnh, Logo, CSS)
│   │   ├── images/         # Hình ảnh, logo, icon
│   │   └── styles/         # Global styles, CSS modules
│   │
│   ├── components/         # Các component giao diện tái sử dụng
│   │   ├── common/         # Button, Input, Modal, Table, Loader, Card
│   │   └── layout/         # Sidebar, Header, Footer, Navbar
│   │
│   ├── hooks/              # Custom Hooks
│   │                       # Ví dụ: useAuth, useFetch, useCart, useDebounce
│   │
│   ├── pages/              # Màn hình chính (Chia theo vai trò người dùng)
│   │   ├── auth/           # Login, Register, ForgotPassword
│   │   ├── admin/          # Dashboard, Quản lý chi nhánh, Doanh thu
│   │   ├── staff/          # Giao diện POS, Quản lý đơn hàng tại quầy
│   │   └── customer/       # Giao diện quét QR, Menu, Đặt món, Lịch sử
│   │
│   ├── routes/             # Cấu hình định tuyến
│   │                       # Public Routes, Private Routes, Role-based Routes
│   │
│   ├── services/           # Cấu hình API và Service layer
│   │   └── api.js          # Cấu hình Axios instance, Interceptors
│   │
│   ├── store/              # Quản lý trạng thái toàn cục
│   │                       # Context API, Redux, Zustand hoặc giải pháp khác
│   │
│   ├── utils/              # Các hàm bổ trợ
│   │                       # Format tiền tệ, xử lý Date, Validation, ...
│   │
│   ├── App.tsx             # Component gốc của ứng dụng
│   ├── main.tsx            # Entry point của ứng dụng
│   └── index.css           # Global CSS
│
├── .env.example            # File mẫu cấu hình biến môi trường
├── .gitignore              # Git ignore rules
├── eslint.config.js        # Cấu hình ESLint
├── index.html              # HTML template
├── package.json            # Dependencies và scripts
├── tsconfig.json           # TypeScript configuration
├── tsconfig.app.json       # TypeScript config cho app
├── tsconfig.node.json      # TypeScript config cho Node
├── vite.config.ts          # Vite configuration
└── README.md               # Tài liệu này
```

## 🎯 Hướng dẫn sử dụng các thư mục

### 📂 `src/components/`
Chứa các component React có thể tái sử dụng:
- **`common/`**: Component chung như Button, Input, Modal, Table
- **`layout/`**: Component layout như Header, Footer, Sidebar

**Ví dụ:**
```tsx
// src/components/common/Button.tsx
export const Button = ({ children, onClick, variant = 'primary' }) => {
  return <button className={`btn btn-${variant}`} onClick={onClick}>{children}</button>
}
```

### 📂 `src/pages/`
Chứa các trang/màn hình chính của ứng dụng, chia theo vai trò:
- **`auth/`**: Trang đăng nhập, đăng ký
- **`admin/`**: Trang quản trị (Dashboard, quản lý chi nhánh, báo cáo)
- **`staff/`**: Trang nhân viên (POS, quản lý đơn hàng)
- **`customer/`**: Trang khách hàng (Menu, đặt món, lịch sử)

### 📂 `src/hooks/`
Chứa custom hooks để tái sử dụng logic:
```tsx
// Ví dụ: useAuth.ts
export const useAuth = () => {
  const [user, setUser] = useState(null);
  // Logic xác thực
  return { user, login, logout };
}
```

### 📂 `src/services/`
Chứa các service để gọi API:
```tsx
// api.js đã được cấu hình sẵn Axios với interceptors
import api from './api';

export const getProducts = () => api.get('/products');
export const createOrder = (data) => api.post('/orders', data);
```

### 📂 `src/routes/`
Cấu hình routing cho ứng dụng:
```tsx
// Ví dụ: routes.tsx
import { Routes, Route } from 'react-router-dom';

export const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/admin/*" element={<PrivateRoute><AdminLayout /></PrivateRoute>} />
  </Routes>
);
```

### 📂 `src/store/`
Quản lý state toàn cục (Context API, Redux, Zustand):
```tsx
// Ví dụ: CartContext.tsx
export const CartContext = createContext();
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  return <CartContext.Provider value={{ cart, setCart }}>{children}</CartContext.Provider>
}
```

### 📂 `src/utils/`
Các hàm tiện ích:
```tsx
// Ví dụ: formatCurrency.ts
export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
}
```


## 👥 Phân quyền người dùng

Hệ thống hỗ trợ 3 vai trò:
1. **Admin**: Quản lý toàn bộ hệ thống, chi nhánh, báo cáo
2. **Staff**: Nhân viên bán hàng, sử dụng POS
3. **Customer**: Khách hàng đặt món qua QR code

## 🛠️ Scripts có sẵn

| Script | Mô tả |
|--------|-------|
| `npm run dev` | Chạy development server |
| `npm run build` | Build production |
| `npm run preview` | Preview production build |
| `npm run lint` | Kiểm tra lỗi code với ESLint |

## 📝 Coding Standards

- Sử dụng TypeScript cho tất cả các file
- Tuân thủ ESLint configuration
- Component names sử dụng PascalCase
- File names sử dụng camelCase hoặc PascalCase
- Sử dụng functional components và hooks

## 🤝 Đóng góp

1. Fork repository
2. Tạo branch mới (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

## 👨‍💻 Thành viên nhóm

- **Lương Toàn Thắng** – Project Manager
- **Bùi Duy Tuấn Anh** – Backend, AI
- **Lê Huy Hoàng** – Backend
- **Thiều Minh Duy** – Frontend
- **Nguyễn Văn Đông** – Frontend
- **Nguyễn Hoàng Nam** – Business Analyst
- **Phạm Minh Hiếu** – Tester



