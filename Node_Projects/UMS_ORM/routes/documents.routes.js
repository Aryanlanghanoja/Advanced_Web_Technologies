const documentController = require("../controllers/document.controller");
const express = require("express");
const router = express.Router();

// Create a new document
router.post("/", documentController.create);

// Get all documents
router.get("/", documentController.findAll);

// Get document by ID
router.get("/:id", documentController.findOne);

// Get all documents by Lead ID
router.get("/lead/:leadId", documentController.findByLeadId);

// Get all documents by Followup ID (if implemented)
router.get("/followup/:followupId", documentController.findByFollowupId);

// Search document by file name within the same Lead
router.get("/lead/:leadId/search/:fileName", documentController.searchByFileNameInLead);

// Update a document by ID
router.put("/:id", documentController.update);

// Delete a document by ID
router.delete("/:id", documentController.delete);

module.exports = router;
