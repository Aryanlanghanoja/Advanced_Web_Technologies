const express = require("express");
const studentController = require("../controllers/student.controller");
const router = express.Router();
router.get("/", studentController.fetchAll);
router.post("/", studentController.create);
router.put("/:id", studentController.update);
router.delete("/:id", studentController.delete);
router.get("/:id", studentController.findOne);
module.exports = router;
