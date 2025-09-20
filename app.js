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
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
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

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
