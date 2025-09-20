const express = require("express");
const mongoose = require("mongoose");
const app = express();
const morgan = require("morgan");
app.use(morgan("dev"));

// Ghi log request
app.use(morgan("dev"));
require("dotenv").config();
const bodyParser = require("body-parser");
const path = require("path");

const supplierRoutes = require("./routes/supplierRoutes");
const productRoutes = require("./routes/productRoutes");

// Kết nối MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Kết nối MongoDB thành công!"))
  .catch((err) => console.error("Lỗi kết nối MongoDB:", err));

// Cấu hình view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Body parser
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.get("/", (req, res) => res.redirect("/suppliers"));
app.use("/suppliers", supplierRoutes);
app.use("/products", productRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).render("error", {
    error: "Trang không tồn tại",
    message: "404 - Not Found",
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render("error", {
    error: "Lỗi server",
    message: err.message || "Có lỗi xảy ra",
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
