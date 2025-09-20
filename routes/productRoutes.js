const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/", productController.getAllProducts);
router.get("/new", productController.showAddProduct);
router.post("/new", productController.addProduct);
router.get("/edit/:id", productController.showEditProduct);
router.post("/edit/:id", productController.editProduct);
router.post("/delete/:id", productController.deleteProduct);

module.exports = router;
