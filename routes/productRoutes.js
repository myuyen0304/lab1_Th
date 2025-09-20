const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const { validateProduct } = require("../middleware/validation");

router.get("/", productController.getAllProducts);
router.get("/new", productController.showAddProduct);
router.post("/new", validateProduct, productController.addProduct);
router.get("/edit/:id", productController.showEditProduct);
router.post("/edit/:id", validateProduct, productController.editProduct);
router.post("/delete/:id", productController.deleteProduct);

module.exports = router;
