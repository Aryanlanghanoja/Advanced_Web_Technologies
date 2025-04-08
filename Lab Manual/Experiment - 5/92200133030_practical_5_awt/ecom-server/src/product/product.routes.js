const productController = require("../product/product.controller");
const express = require("express");
const router = express.Router();

router.post("/", productController.create);

router.get("/", productController.findAll);
router.get("/:id", productController.findOne);
router.get("/search/:keyword", productController.search);

router.put("/:id", productController.update);

router.delete("/:id", productController.delete);
router.delete("/del/:id", productController.del);

module.exports = router;
