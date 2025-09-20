# lab1_Th# Website CRUD Nhà Cung Cấp & Sản Phẩm

Dự án website quản lý nhà cung cấp và sản phẩm sử dụng Node.js, Express, MongoDB, Mongoose, EJS theo mô hình MVC.

## Tính năng

- Quản lý nhà cung cấp (thêm, sửa, xóa, xem danh sách)
- Quản lý sản phẩm (thêm, sửa, xóa, xem danh sách)
- Giao diện hiện đại với Bootstrap
- Thông báo thành công/thất bại khi thao tác
- Ghi log request bằng morgan

## Cài đặt

1. Clone repo về máy:
   ```bash
   git clone https://github.com/myuyen0304/lab1_Th.git
   cd lab1_Th
   ```
2. Cài đặt package:
   ```bash
   npm install
   ```
3. Tạo file `.env` với nội dung:
   ```env
   MONGO_URI=mongodb://localhost:27017/mvc_crud_product_supplier
   ```
4. (Tùy chọn) Tạo dữ liệu mẫu:
   ```bash
   node seed.js
   ```
5. Chạy ứng dụng:
   ```bash
   node app.js
   ```
6. Truy cập: [http://localhost:3000](http://localhost:3000)

## Cấu trúc thư mục

```
models/           # Mongoose models
controllers/      # Xử lý logic
routes/           # Định tuyến
views/            # Giao diện EJS
public/           # Tài nguyên tĩnh (CSS)
```

## Đóng góp

- Fork repo, tạo branch mới, commit và gửi pull request.

## Tác giả

- myuyen0304
