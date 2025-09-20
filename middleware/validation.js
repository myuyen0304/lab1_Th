// Middleware validation
exports.validateSupplier = (req, res, next) => {
  const { name, address, phone } = req.body;
  const errors = [];

  // Kiểm tra tên (không được chứa số)
  if (!name || name.trim().length < 2) {
    errors.push('Tên phải có ít nhất 2 ký tự');
  } else if (/\d/.test(name.trim())) {
    errors.push('Tên nhà cung cấp không được chứa số');
  } else if (!/^[a-zA-ZÀ-ỹ\s]+$/.test(name.trim())) {
    errors.push('Tên chỉ được chứa chữ cái và khoảng trắng');
  }
  
  // Kiểm tra địa chỉ
  if (!address || address.trim().length < 5) {
    errors.push('Địa chỉ phải có ít nhất 5 ký tự');
  }
  
  // Kiểm tra số điện thoại (chính xác 10 số)
  if (!phone) {
    errors.push('Số điện thoại là bắt buộc');
  } else if (!/^[0-9]{10}$/.test(phone.trim())) {
    errors.push('Số điện thoại phải có đúng 10 chữ số');
  } else if (!phone.startsWith('0')) {
    errors.push('Số điện thoại phải bắt đầu bằng số 0');
  }

  if (errors.length > 0) {
    return res.redirect(`/suppliers?error=${encodeURIComponent(errors.join(', '))}`);
  }
  
  next();
};

exports.validateProduct = (req, res, next) => {
  const { name, price, quantity, supplierId } = req.body;
  const errors = [];

  // Kiểm tra tên sản phẩm (không được chứa toàn số)
  if (!name || name.trim().length < 2) {
    errors.push('Tên sản phẩm phải có ít nhất 2 ký tự');
  } else if (/^\d+$/.test(name.trim())) {
    errors.push('Tên sản phẩm không được chỉ chứa toàn số');
  }
  
  // Kiểm tra giá (phải là số dương)
  if (!price) {
    errors.push('Giá sản phẩm là bắt buộc');
  } else {
    const priceNum = parseFloat(price);
    if (isNaN(priceNum)) {
      errors.push('Giá phải là một số hợp lệ');
    } else if (priceNum < 0) {
      errors.push('Giá không được nhỏ hơn 0');
    } else if (priceNum === 0) {
      errors.push('Giá phải lớn hơn 0');
    } else if (priceNum > 999999999) {
      errors.push('Giá quá lớn (tối đa 999,999,999)');
    }
  }
  
  // Kiểm tra số lượng (phải là số nguyên không âm)
  if (!quantity && quantity !== 0) {
    errors.push('Số lượng là bắt buộc');
  } else {
    const quantityNum = parseInt(quantity);
    if (isNaN(quantityNum)) {
      errors.push('Số lượng phải là số nguyên');
    } else if (quantityNum < 0) {
      errors.push('Số lượng không được nhỏ hơn 0');
    } else if (quantityNum > 999999) {
      errors.push('Số lượng quá lớn (tối đa 999,999)');
    }
  }
  
  // Kiểm tra nhà cung cấp
  if (!supplierId) {
    errors.push('Vui lòng chọn nhà cung cấp');
  }

  if (errors.length > 0) {
    return res.redirect(`/products?error=${encodeURIComponent(errors.join(', '))}`);
  }
  
  next();
};