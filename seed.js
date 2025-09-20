// Seed data (tùy chọn)
require("dotenv").config();
const mongoose = require("mongoose");
const Supplier = require("./models/Supplier");
const Product = require("./models/Product");

async function seed() {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await Supplier.deleteMany({});
  await Product.deleteMany({});
  const suppliers = await Supplier.insertMany([
    { name: "Công ty A", address: "Hà Nội", phone: "0123456789" },
    { name: "Công ty B", address: "TP.HCM", phone: "0987654321" },
  ]);
  await Product.insertMany([
    {
      name: "Sản phẩm 1",
      price: 10000,
      quantity: 10,
      supplierId: suppliers[0]._id,
    },
    {
      name: "Sản phẩm 2",
      price: 20000,
      quantity: 5,
      supplierId: suppliers[1]._id,
    },
  ]);
  console.log("Seed thành công!");
  mongoose.disconnect();
}
seed();
