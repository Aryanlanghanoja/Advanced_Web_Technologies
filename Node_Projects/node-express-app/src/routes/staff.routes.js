const express = require("express");
const staffController = require("../controllers/staff.controller");
const router = express.Router();
router.get("/", staffController.fetchAll);
router.post("/", staffController.create);
router.put("/:id", staffController.update);
router.delete("/:id", staffController.delete);
router.get("/:id", staffController.fetchOne);
module.exports = router;
