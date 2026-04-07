🤖 MASS CHATBOT - FRONTEND
1. Giới thiệu
Mass Chatbot là nền tảng SaaS giúp doanh nghiệp tạo, cấu hình và quản lý nhiều chatbot AI trên cùng một hệ thống. Chatbot có khả năng tự động trả lời câu hỏi của khách hàng dựa trên các tài liệu tri thức (PDF, Word, Excel...) do chính doanh nghiệp tải lên
.
2. Công nghệ
Framework: ReactJS
Ngôn ngữ: TypeScript
UI Library: Ant Design (AntD)
✨ Tính năng chính
Bot Builder & Dashboard: Khởi tạo và cấu hình từng chatbot riêng biệt
.
Knowledge Base (Kho tri thức): Quản lý tài liệu huấn luyện AI
.
Quản lý hội thoại: Theo dõi lịch sử chat và truy vết nguồn thông tin câu trả lời của bot
.
Tích hợp đa kênh: Giao diện chat trực tiếp trên Website và kết nối Facebook Page
.
📂 Cấu trúc thư mục
Cấu trúc dự án được tổ chức theo từng module (tính năng) để dễ dàng mở rộng và bảo trì:
mass_chatbot_frontend/
├── public/                 # Các tệp tĩnh public (index.html, favicon, images...)
├── src/
│   ├── assets/             # Hình ảnh, icon, global CSS/SCSS
│   ├── components/         # Các UI Component dùng chung (Button, Modal, Table...)
│   ├── layouts/            # Layout chính (AdminDashboard, ChatLayout...)
│   ├── pages/              # Các trang giao diện chính
│   │   ├── Dashboard/      # Trang tổng quan thống kê
│   │   ├── BotBuilder/     # Giao diện khởi tạo và cấu hình bot
│   │   ├── KnowledgeBase/  # Quản lý tài liệu huấn luyện (PDF, Docs...)
│   │   ├── ChatHistory/    # Truy vết và xem lịch sử hội thoại
│   │   └── ChatUI/         # Khung chat dành cho khách hàng cuối
│   ├── services/           # Định nghĩa API kết nối đến Backend và OpenAI
│   ├── store/              # Quản lý state toàn cục (Redux Toolkit/Context)
│   ├── types/              # Khai báo TypeScript Interfaces/Types
│   ├── utils/              # Các hàm tiện ích dùng chung (format ngày, validate...)
│   ├── App.tsx             # Component gốc chứa định tuyến (Router)
│   └── index.tsx           # Entry point của ứng dụng
├── .env                    # Biến môi trường (URL API, Keys)
├── package.json            # Cấu hình thư viện và scripts
└── tsconfig.json           # Cấu hình TypeScript
3. Hướng dẫn cài đặt
    1. Cài đặt thư viện
    npm install
    2. Cấu hình môi trường Tạo file .env ở thư mục gốc:
    REACT_APP_API_BASE_URL=http://localhost:8080/api
    REACT_APP_OPENAI_API_KEY=your_openai_key
    3. Khởi chạy dự án (Local)
    npm start
    4. Build dự án (Production)
    npm run build

4. Quy tắc viết Commit Message
Sử dụng chuẩn Conventional Commits để ghi chú rõ ràng mục đích của đoạn code vừa push. Cú pháp chung: <loại_commit>: <mô_tả_ngắn_gọn_về_tác_vụ>
Các loại commit phổ biến:
feat: Thêm một chức năng mới.
fix: Sửa lỗi (bug).
style: Chỉnh sửa giao diện UI/UX (CSS, AntD) mà không làm thay đổi logic.
refactor: Tối ưu hóa lại code hiện tại (không thêm tính năng mới, không sửa lỗi).
docs: Thêm/sửa tài liệu (ví dụ: cập nhật tệp README).
chore: Cập nhật cấu hình thư viện (package.json), dọn dẹp code...