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

## 🌿 Hướng dẫn tạo nhánh khi code

### Quy tắc đặt tên nhánh

Sử dụng format: `<type>/<description>`

**Các loại nhánh:**
- `feature/` - Tính năng mới
- `bugfix/` - Sửa lỗi
- `hotfix/` - Sửa lỗi khẩn cấp trên production
- `refactor/` - Tái cấu trúc code
- `docs/` - Cập nhật tài liệu
- `test/` - Thêm hoặc sửa test

**Ví dụ:**
```
feature/login-page
feature/admin-dashboard
bugfix/fix-cart-calculation
hotfix/fix-payment-error
refactor/optimize-api-calls
docs/update-readme
```

### Quy trình làm việc với Git

#### 1. Cập nhật code mới nhất từ main
```bash
# Chuyển về nhánh main
git checkout main

# Lấy code mới nhất
git pull origin main
```

#### 2. Tạo nhánh mới cho task của bạn
```bash
# Tạo và chuyển sang nhánh mới
git checkout -b feature/ten-tinh-nang

# Hoặc tách làm 2 lệnh
git branch feature/ten-tinh-nang
git checkout feature/ten-tinh-nang
```

#### 3. Làm việc và commit code
```bash
# Xem trạng thái file thay đổi
git status

# Thêm file vào staging
git add .                    # Thêm tất cả file
git add src/components/      # Thêm một thư mục cụ thể
git add src/App.tsx          # Thêm một file cụ thể

# Commit với message rõ ràng
git commit -m "feat: add login page with validation"
git commit -m "fix: resolve cart total calculation bug"
git commit -m "refactor: optimize API service structure"
```

**Quy ước commit message:**
- `feat:` - Thêm tính năng mới
- `fix:` - Sửa lỗi
- `refactor:` - Tái cấu trúc code
- `style:` - Thay đổi style, format code
- `docs:` - Cập nhật tài liệu
- `test:` - Thêm hoặc sửa test
- `chore:` - Các công việc khác (update dependencies, config...)

#### 4. Push code lên remote repository
```bash
# Lần đầu push nhánh mới
git push -u origin feature/ten-tinh-nang

# Các lần push tiếp theo
git push
```

#### 5. Đồng bộ với nhánh main (nếu main có update)
```bash
# Cách 1: Merge main vào nhánh hiện tại
git checkout feature/ten-tinh-nang
git merge main

# Cách 2: Rebase (khuyến nghị - giữ history sạch hơn)
git checkout feature/ten-tinh-nang
git rebase main

# Nếu có conflict, giải quyết conflict rồi:
git add .
git rebase --continue
# Hoặc hủy rebase
git rebase --abort
```

#### 6. Tạo Pull Request
1. Push code lên remote repository
2. Vào GitHub/GitLab
3. Tạo Pull Request từ nhánh của bạn vào `main`
4. Đợi review từ team
5. Sau khi được approve, merge vào main

#### 7. Xóa nhánh sau khi merge (optional)
```bash
# Xóa nhánh local
git branch -d feature/ten-tinh-nang

# Xóa nhánh remote
git push origin --delete feature/ten-tinh-nang
```

### Một số lệnh Git hữu ích

```bash
# Xem danh sách nhánh
git branch              # Nhánh local
git branch -r           # Nhánh remote
git branch -a           # Tất cả nhánh

# Chuyển nhánh
git checkout ten-nhanh
git switch ten-nhanh    # Cách mới hơn

# Xem lịch sử commit
git log
git log --oneline       # Xem gọn hơn
git log --graph         # Xem dạng graph

# Hủy thay đổi
git checkout -- file.txt        # Hủy thay đổi một file
git reset HEAD file.txt         # Bỏ file khỏi staging
git reset --hard HEAD           # Hủy tất cả thay đổi (cẩn thận!)

# Stash - Tạm cất code chưa commit
git stash               # Cất code
git stash list          # Xem danh sách
git stash pop           # Lấy code ra và xóa stash
git stash apply         # Lấy code ra nhưng giữ stash

# Xem sự khác biệt
git diff                # So sánh working directory với staging
git diff --staged       # So sánh staging với last commit
```

### ⚠️ Lưu ý quan trọng

1. **KHÔNG bao giờ** commit trực tiếp vào nhánh `main`
2. **Luôn luôn** tạo nhánh mới cho mỗi task/feature
3. **Pull code mới** từ main trước khi bắt đầu làm việc
4. **Commit thường xuyên** với message rõ ràng
5. **Test kỹ** trước khi tạo Pull Request
6. **Không commit** file như `.env`, `node_modules/`, `dist/`
7. **Giải quyết conflict** cẩn thận, kiểm tra kỹ trước khi merge


