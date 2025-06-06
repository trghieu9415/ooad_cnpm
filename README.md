# Stack Overflow Clone

## Giới thiệu

Dự án này là một nền tảng hỏi đáp tương tự như Stack Overflow, được phát triển với kiến trúc full-stack bao gồm cả backend và frontend. Hệ thống cho phép người dùng đăng ký, đăng nhập, đặt câu hỏi, trả lời, bình luận, vote và tương tác với cộng đồng như một nền tảng chia sẻ kiến thức.

## Kiến trúc hệ thống

### Backend
- **Ngôn ngữ và Framework**: Node.js với Express.js
- **Cơ sở dữ liệu**: MySQL với Sequelize ORM
- **Xác thực**: JWT (JSON Web Token) và bcrypt
- **API Documentation**: Swagger UI
- **Logging**: Morgan và hệ thống ghi nhật ký tùy chỉnh

### Frontend
- **Framework**: React với Vite
- **State Management**: Redux, Redux Toolkit, Redux Persist
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **UI/UX**: TailwindCSS, React Icons
- **Form Handling**: React Hook Form
- **API Handling**: React Query

### Công cụ phụ trợ
- **Python Script**: Công cụ tạo dữ liệu mẫu (dbgen)
- **Database Schema**: SQL script cho cấu trúc cơ sở dữ liệu

## Chức năng chính

### Quản lý tài khoản
- Đăng ký, đăng nhập, quản lý thông tin cá nhân
- Hệ thống phân quyền (người dùng thông thường và admin)

### Quản lý câu hỏi
- Đăng câu hỏi mới với các thẻ (tags)
- Chỉnh sửa, xem và tìm kiếm câu hỏi
- Đánh dấu các câu hỏi đã xem

### Quản lý câu trả lời
- Đăng câu trả lời cho câu hỏi
- Chấp nhận câu trả lời tốt nhất
- Vote up/down cho câu trả lời

### Hệ thống danh hiệu (Badge)
- Trao danh hiệu cho người dùng dựa trên hoạt động
- Hiển thị danh hiệu trên trang cá nhân

### Hệ thống thông báo
- Thông báo khi có tương tác với câu hỏi/trả lời của người dùng
- Thông báo khi nhận được danh hiệu mới

### Các tính năng khác
- Hệ thống thẻ (tag) cho câu hỏi
- Hệ thống bình luận
- Hệ thống tiền thưởng (bounty)
- Báo cáo nội dung không phù hợp (flag)
- Quản lý điểm uy tín (reputation)

## Cấu trúc dự án

### Backend
- **Controllers**: Xử lý logic nghiệp vụ và tương tác với models
- **Models**: Định nghĩa cấu trúc dữ liệu và tương tác với cơ sở dữ liệu
- **Routes**: Định nghĩa API endpoints
- **Middlewares**: Xử lý authentication, authorization, validation...
- **Utils**: Các hàm tiện ích như mã hóa, tạo token...
- **Configs**: Cấu hình cơ sở dữ liệu và các cài đặt khác

### Frontend
- **Components**: Các thành phần UI tái sử dụng
- **Pages**: Các trang chính của ứng dụng
- **APIs**: Các hàm gọi API từ backend
- **Redux**: Quản lý state toàn cục
- **Layouts**: Cấu trúc bố cục chung cho các trang
- **Hooks**: Custom hooks
- **Utils**: Các hàm tiện ích

## Hướng dẫn cài đặt

### Backend
1. Di chuyển vào thư mục backend: `cd backend`
2. Cài đặt các dependencies: `npm run setup`
3. Tạo file .env với các thông tin kết nối database:
```
DB_HOST=localhost
DB_DATABASE=stackoverflow2
DB_USER=root
DB_PASSWORD=

PORT=3000
SECRET=AAA
```
4. Khởi động server: `npm start`
5. Truy cập API docs tại: http://localhost:3000/api-docs

### Frontend
1. Di chuyển vào thư mục frontend: `cd frontend`
2. Cài đặt các dependencies: `npm install`
3. Khởi động ứng dụng: `npm run dev`
4. Truy cập ứng dụng tại: http://localhost:5173

### Tạo dữ liệu mẫu
1. Di chuyển vào thư mục dbgen: `cd dbgen`
2. Cài đặt các dependencies Python: `pip install -r requirements.txt`
3. Chạy script tạo dữ liệu mẫu: `python create_data.py`

## Cơ sở dữ liệu

File `stackoverflow2.sql` chứa toàn bộ cấu trúc CSDL của dự án. Bạn có thể import file này vào MySQL/MariaDB để tạo CSDL hoàn chỉnh.

## Thành viên nhóm

- Nguyễn Văn A
- Trần Thị B
- Lê Văn C
- Phạm Thị D

## Giấy phép

© 2024 - Bản quyền thuộc về Nhóm X