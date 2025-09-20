const Supplier = require("../models/Supplier");

// Lấy danh sách nhà cung cấp
exports.getAllSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    const message = req.query.message || null;
    const error = req.query.error || null;
    res.render("suppliers/index", { suppliers, message, error });
  } catch (err) {
    res.status(500).send(err.message);
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
    await Supplier.create({ name, address, phone });
    res.redirect("/suppliers?message=Thêm nhà cung cấp thành công!");
  } catch (err) {
    res.redirect("/suppliers?error=Thêm nhà cung cấp thất bại!");
  }
};

// Hiển thị form sửa nhà cung cấp
exports.showEditSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    res.render("suppliers/edit", { supplier });
  } catch (err) {
    res.status(404).send("Supplier not found");
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
    await Supplier.findByIdAndDelete(req.params.id);
    res.redirect("/suppliers?message=Xóa nhà cung cấp thành công!");
  } catch (err) {
    res.redirect("/suppliers?error=Xóa nhà cung cấp thất bại!");
  }
};
