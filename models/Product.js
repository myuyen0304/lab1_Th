const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Tên sản phẩm là bắt buộc'],
    trim: true,
    maxlength: [100, 'Tên không được quá 100 ký tự'],
    minlength: [2, 'Tên phải có ít nhất 2 ký tự'],
    validate: {
      validator: function(v) {
        // Không được chỉ chứa toàn số
        return !/^\d+$/.test(v.trim());
      },
      message: 'Tên sản phẩm không được chỉ chứa toàn số'
    }
  },
  price: { 
    type: Number, 
    required: [true, 'Giá sản phẩm là bắt buộc'],
    min: [0.01, 'Giá phải lớn hơn 0'],
    max: [999999999, 'Giá quá lớn (tối đa 999,999,999)'],
    validate: {
      validator: function(v) {
        return v > 0;
      },
      message: 'Giá phải lớn hơn 0'
    }
  },
  quantity: { 
    type: Number, 
    required: [true, 'Số lượng là bắt buộc'],
    min: [0, 'Số lượng không được nhỏ hơn 0'],
    max: [999999, 'Số lượng quá lớn (tối đa 999,999)'],
    validate: {
      validator: function(v) {
        return Number.isInteger(v);
      },
      message: 'Số lượng phải là số nguyên'
    }
  },
  supplierId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Supplier",
    required: [true, 'Nhà cung cấp là bắt buộc'],
  },
}, {
  timestamps: true
});

// Index để tìm kiếm nhanh
productSchema.index({ name: 1 });
productSchema.index({ supplierId: 1 });

module.exports = mongoose.model("Product", productSchema);
