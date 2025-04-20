const categoryController = require("../category/category.controller");
const express = require("express");
const router = express.Router();

router.post("/", categoryController.create);

router.get("/", categoryController.findAll);
router.get("/:id", categoryController.findOne);
router.get("/search/:keyword", categoryController.search);

router.put("/:id", categoryController.update);

router.delete("/:id", categoryController.delete);
router.delete("/del/:id", categoryController.del);

module.exports = router;
