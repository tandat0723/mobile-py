## 📌 Giới thiệu
**Mobile-Py** là dự án web E-commerce, phát triển bằng Python và các công nghệ web liên quan.

## 🚀 Yêu cầu hệ thống
Trước khi bắt đầu, hãy đảm bảo rằng bạn đã cài đặt các công cụ sau trên hệ thống của mình:
- **Python** (phiên bản 3.8 trở lên)
- **pip** (trình quản lý gói Python)
- **virtualenv** (tùy chọn, để tạo môi trường ảo)
- **Git** (để clone repository)

## 📥 Cài đặt và cấu hình

### 1️⃣ Clone repository
```sh
git clone https://github.com/tandat0723/mobile-py.git
cd mobile-py
```

### 2️⃣ Tạo môi trường ảo (tùy chọn)
```sh
python -m venv venv
source venv/bin/activate  # Trên macOS/Linux
venv\Scripts\activate     # Trên Windows
```

### 3️⃣ Cài đặt các package cần thiết
```sh
pip install -r requirements.txt
```

### 4️⃣ Cấu hình biến môi trường (nếu có)
Tạo file `.env` và thêm các thông tin cấu hình cần thiết (nếu dự án yêu cầu). Ví dụ:
```env
SECRET_KEY=your_secret_key
DEBUG=True
DATABASE_URL=sqlite:///db.sqlite3
```

### 5️⃣ Chạy migrations (nếu sử dụng Django)
```sh
python manage.py migrate
```

### 6️⃣ Khởi động ứng dụng
```sh
python manage.py runserver
```
Sau đó, truy cập **http://127.0.0.1:8000/** để xem website chạy trên máy local.

## 🛠 Công nghệ sử dụng
- **Backend**: Python, Django/Flask
- **Frontend**: HTML, CSS, JavaScript (nếu có)
- **Database**: SQLite/PostgreSQL/MySQL

---

Nếu có vấn đề hoặc cần hỗ trợ, vui lòng liên hệ với tác giả thông qua GitHub!

