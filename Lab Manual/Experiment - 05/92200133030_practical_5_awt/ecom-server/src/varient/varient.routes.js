const varientController = require("../varient/varient.controller");
const express = require("express");
const router = express.Router();

router.post("/", varientController.create);

router.get("/", varientController.findAll);
router.get("/:id", varientController.findOne);
router.get("/search/:keyword", varientController.search);

router.put("/:id", varientController.update);

router.delete("/:id", varientController.delete);
router.delete("/del/:id", varientController.del);

module.exports = router;
