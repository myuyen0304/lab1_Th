const Supplier = require("../models/Supplier");

// Lấy danh sách nhà cung cấp
exports.getAllSuppliers = async (req, res, next) => {
  try {
    const suppliers = await Supplier.find();
    const message = req.query.message || null;
    const error = req.query.error || null;
    res.render("suppliers/index", { suppliers, message, error });
  } catch (err) {
    console.error("Lỗi lấy danh sách nhà cung cấp:", err);
    next(err); // Chuyển lỗi đến global error handler
  }
};

// Hiển thị form thêm nhà cung cấp
exports.showAddSupplier = (req, res) => {
  res.render("suppliers/new");
};

// Thêm nhà cung cấp
exports.addSupplier = async (req, res) => {
  try {
    const { name, address, phone } = req.body;

    // Validation
    if (!name || !address || !phone) {
      return res.redirect("/suppliers?error=Vui lòng điền đầy đủ thông tin!");
    }

    // Kiểm tra trùng lặp
    const existingSupplier = await Supplier.findOne({
      $or: [{ name }, { phone }],
    });
    if (existingSupplier) {
      return res.redirect(
        "/suppliers?error=Tên hoặc số điện thoại đã tồn tại!"
      );
    }

    await Supplier.create({ name, address, phone });
    res.redirect("/suppliers?message=Thêm nhà cung cấp thành công!");
  } catch (err) {
    console.error("Lỗi thêm nhà cung cấp:", err);
    if (err.name === "ValidationError") {
      const errorMsg = Object.values(err.errors)
        .map((e) => e.message)
        .join(", ");
      res.redirect(`/suppliers?error=Lỗi validation: ${errorMsg}`);
    } else {
      res.redirect("/suppliers?error=Thêm nhà cung cấp thất bại!");
    }
  }
};

// Hiển thị form sửa nhà cung cấp
exports.showEditSupplier = async (req, res, next) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) {
      return res.status(404).render("error", {
        error: "Không tìm thấy nhà cung cấp",
        message: "ID không hợp lệ hoặc nhà cung cấp đã bị xóa",
      });
    }
    res.render("suppliers/edit", { supplier });
  } catch (err) {
    console.error("Lỗi tìm nhà cung cấp:", err);
    if (err.name === "CastError") {
      return res.status(400).render("error", {
        error: "ID không hợp lệ",
        message: "Định dạng ID MongoDB không đúng",
      });
    }
    next(err);
  }
};

// Sửa nhà cung cấp
exports.editSupplier = async (req, res) => {
  try {
    const { name, address, phone } = req.body;
    await Supplier.findByIdAndUpdate(req.params.id, { name, address, phone });
    res.redirect("/suppliers?message=Cập nhật nhà cung cấp thành công!");
  } catch (err) {
    res.redirect("/suppliers?error=Cập nhật nhà cung cấp thất bại!");
  }
};

// Xóa nhà cung cấp
exports.deleteSupplier = async (req, res) => {
  try {
    const supplierId = req.params.id;

    // Kiểm tra xem có sản phẩm nào đang sử dụng nhà cung cấp này không
    const Product = require("../models/Product");
    const productsUsingSupplier = await Product.find({ supplierId });

    if (productsUsingSupplier.length > 0) {
      return res.redirect(
        "/suppliers?error=Không thể xóa! Còn sản phẩm đang sử dụng nhà cung cấp này."
      );
    }

    const deletedSupplier = await Supplier.findByIdAndDelete(supplierId);
    if (!deletedSupplier) {
      return res.redirect(
        "/suppliers?error=Không tìm thấy nhà cung cấp để xóa!"
      );
    }

    res.redirect("/suppliers?message=Xóa nhà cung cấp thành công!");
  } catch (err) {
    console.error("Lỗi xóa nhà cung cấp:", err);
    res.redirect("/suppliers?error=Xóa nhà cung cấp thất bại!");
  }
};
