const express = require("express");
const router = express.Router();
const supplierController = require("../controllers/supplierController");

router.get("/", supplierController.getAllSuppliers);
router.get("/new", supplierController.showAddSupplier);
router.post("/new", supplierController.addSupplier);
router.get("/edit/:id", supplierController.showEditSupplier);
router.post("/edit/:id", supplierController.editSupplier);
router.post("/delete/:id", supplierController.deleteSupplier);

module.exports = router;
