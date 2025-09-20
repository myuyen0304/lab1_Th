const Product = require("../models/Product");
const Supplier = require("../models/Supplier");

// Lấy danh sách sản phẩm
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("supplierId");
    const message = req.query.message || null;
    const error = req.query.error || null;
    res.render("products/index", { products, message, error });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Hiển thị form thêm sản phẩm
exports.showAddProduct = async (req, res) => {
  const suppliers = await Supplier.find();
  res.render("products/new", { suppliers });
};

// Thêm sản phẩm
exports.addProduct = async (req, res) => {
  try {
    const { name, price, quantity, supplierId } = req.body;
    await Product.create({ name, price, quantity, supplierId });
    res.redirect("/products?message=Thêm sản phẩm thành công!");
  } catch (err) {
    res.redirect("/products?error=Thêm sản phẩm thất bại!");
  }
};

// Hiển thị form sửa sản phẩm
exports.showEditProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    const suppliers = await Supplier.find();
    res.render("products/edit", { product, suppliers });
  } catch (err) {
    res.status(404).send("Product not found");
  }
};

// Sửa sản phẩm
exports.editProduct = async (req, res) => {
  try {
    const { name, price, quantity, supplierId } = req.body;
    await Product.findByIdAndUpdate(req.params.id, {
      name,
      price,
      quantity,
      supplierId,
    });
    res.redirect("/products?message=Cập nhật sản phẩm thành công!");
  } catch (err) {
    res.redirect("/products?error=Cập nhật sản phẩm thất bại!");
  }
};

// Xóa sản phẩm
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect("/products?message=Xóa sản phẩm thành công!");
  } catch (err) {
    res.redirect("/products?error=Xóa sản phẩm thất bại!");
  }
};
