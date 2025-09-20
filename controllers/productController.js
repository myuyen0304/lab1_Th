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
    console.error("Lỗi khi lấy danh sách sản phẩm:", err);
    res.status(500).render("error", {
      error: "Không thể tải danh sách sản phẩm",
    });
  }
};

// Hiển thị form thêm sản phẩm
exports.showAddProduct = async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    if (suppliers.length === 0) {
      return res.redirect(
        "/products?error=Cần có ít nhất một nhà cung cấp trước khi thêm sản phẩm!"
      );
    }
    res.render("products/new", { suppliers });
  } catch (err) {
    console.error("Lỗi khi hiển thị form thêm sản phẩm:", err);
    res.redirect("/products?error=Không thể hiển thị form thêm sản phẩm!");
  }
};

// Thêm sản phẩm
exports.addProduct = async (req, res) => {
  try {
    const { name, price, quantity, supplierId } = req.body;

    // Kiểm tra nhà cung cấp có tồn tại không
    const supplier = await Supplier.findById(supplierId);
    if (!supplier) {
      return res.redirect("/products?error=Nhà cung cấp không tồn tại!");
    }

    // Kiểm tra sản phẩm đã tồn tại chưa
    const existingProduct = await Product.findOne({
      name: name.trim(),
      supplierId: supplierId,
    });
    if (existingProduct) {
      return res.redirect(
        "/products?error=Sản phẩm này đã tồn tại từ nhà cung cấp này!"
      );
    }

    await Product.create({ name: name.trim(), price, quantity, supplierId });
    res.redirect("/products?message=Thêm sản phẩm thành công!");
  } catch (err) {
    console.error("Lỗi khi thêm sản phẩm:", err);
    if (err.name === "ValidationError") {
      const errorMessages = Object.values(err.errors).map((e) => e.message);
      res.redirect(
        `/products?error=${encodeURIComponent(errorMessages.join(", "))}`
      );
    } else {
      res.redirect("/products?error=Thêm sản phẩm thất bại!");
    }
  }
};

// Hiển thị form sửa sản phẩm
exports.showEditProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.redirect("/products?error=Sản phẩm không tồn tại!");
    }

    const suppliers = await Supplier.find();
    if (suppliers.length === 0) {
      return res.redirect("/products?error=Cần có ít nhất một nhà cung cấp!");
    }

    res.render("products/edit", { product, suppliers });
  } catch (err) {
    console.error("Lỗi khi hiển thị form sửa sản phẩm:", err);
    res.redirect("/products?error=Không thể hiển thị form sửa sản phẩm!");
  }
};

// Sửa sản phẩm
exports.editProduct = async (req, res) => {
  try {
    const { name, price, quantity, supplierId } = req.body;

    // Kiểm tra sản phẩm có tồn tại không
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.redirect("/products?error=Sản phẩm không tồn tại!");
    }

    // Kiểm tra nhà cung cấp có tồn tại không
    const supplier = await Supplier.findById(supplierId);
    if (!supplier) {
      return res.redirect("/products?error=Nhà cung cấp không tồn tại!");
    }

    // Kiểm tra trùng tên sản phẩm (trừ chính nó)
    const existingProduct = await Product.findOne({
      name: name.trim(),
      supplierId: supplierId,
      _id: { $ne: req.params.id },
    });
    if (existingProduct) {
      return res.redirect(
        "/products?error=Tên sản phẩm này đã tồn tại từ nhà cung cấp này!"
      );
    }

    await Product.findByIdAndUpdate(
      req.params.id,
      {
        name: name.trim(),
        price,
        quantity,
        supplierId,
      },
      { runValidators: true }
    );

    res.redirect("/products?message=Cập nhật sản phẩm thành công!");
  } catch (err) {
    console.error("Lỗi khi cập nhật sản phẩm:", err);
    if (err.name === "ValidationError") {
      const errorMessages = Object.values(err.errors).map((e) => e.message);
      res.redirect(
        `/products?error=${encodeURIComponent(errorMessages.join(", "))}`
      );
    } else {
      res.redirect("/products?error=Cập nhật sản phẩm thất bại!");
    }
  }
};

// Xóa sản phẩm
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.redirect("/products?error=Sản phẩm không tồn tại!");
    }

    await Product.findByIdAndDelete(req.params.id);
    res.redirect("/products?message=Xóa sản phẩm thành công!");
  } catch (err) {
    console.error("Lỗi khi xóa sản phẩm:", err);
    res.redirect("/products?error=Xóa sản phẩm thất bại!");
  }
};
