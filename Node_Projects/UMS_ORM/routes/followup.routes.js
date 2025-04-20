const express = require("express");
const router = express.Router();
const followUpController = require("../controllers/followup.controller");

// Basic CRUD routes
router.post("/", followUpController.createFollowUp);
router.get("/", followUpController.getAllFollowUps);
router.get("/:id", followUpController.getFollowUpById);
router.put("/:id", followUpController.updateFollowUp);
router.delete("/:id", followUpController.deleteFollowUp);

// Filter routes
router.get("/lead/:leadId", followUpController.getFollowUpsByLeadId);
router.get("/date/:date", followUpController.getFollowUpsByDate);
router.get("/user/:userId", followUpController.getFollowUpsByUserId);

module.exports = router;
