const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Tên nhà cung cấp là bắt buộc'],
    trim: true,
    maxlength: [100, 'Tên không được quá 100 ký tự'],
    minlength: [2, 'Tên phải có ít nhất 2 ký tự'],
    validate: {
      validator: function(v) {
        // Không chứa số và chỉ chứa chữ cái + khoảng trắng
        return /^[a-zA-ZÀ-ỹ\s]+$/.test(v) && !/\d/.test(v);
      },
      message: 'Tên nhà cung cấp chỉ được chứa chữ cái và khoảng trắng, không được chứa số'
    }
  },
  address: { 
    type: String, 
    required: [true, 'Địa chỉ là bắt buộc'],
    trim: true,
    maxlength: [200, 'Địa chỉ không được quá 200 ký tự'],
    minlength: [5, 'Địa chỉ phải có ít nhất 5 ký tự']
  },
  phone: { 
    type: String, 
    required: [true, 'Số điện thoại là bắt buộc'],
    trim: true,
    validate: {
      validator: function(v) {
        // Đúng 10 số và bắt đầu bằng 0
        return /^0[0-9]{9}$/.test(v);
      },
      message: 'Số điện thoại phải có đúng 10 chữ số và bắt đầu bằng số 0'
    },
    unique: true
  },
}, {
  timestamps: true // Tự động thêm createdAt, updatedAt
});

// Index để tìm kiếm nhanh
supplierSchema.index({ name: 1 });
supplierSchema.index({ phone: 1 });

module.exports = mongoose.model("Supplier", supplierSchema);
