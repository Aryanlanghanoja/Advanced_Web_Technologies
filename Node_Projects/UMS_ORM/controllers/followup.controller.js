const followUpService = require("../services/followup.services");

// Create a new follow-up
exports.createFollowUp = async (req, res) => {
  try {
    const followup = await followUpService.createFollowUp(req.body);
    res.status(201).json(followup);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all follow-ups
exports.getAllFollowUps = async (req, res) => {
  try {
    const followups = await followUpService.getAllFollowUps();
    res.status(200).json(followups);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a follow-up by ID
exports.getFollowUpById = async (req, res) => {
  try {
    const followup = await followUpService.getFollowUpById(req.params.id);
    if (!followup) {
      return res.status(404).json({ message: "Follow-up not found" });
    }
    res.status(200).json(followup);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a follow-up
exports.updateFollowUp = async (req, res) => {
  try {
    const updated = await followUpService.updateFollowUp(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ message: "Follow-up not found" });
    }
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a follow-up
exports.deleteFollowUp = async (req, res) => {
  try {
    const deleted = await followUpService.deleteFollowUp(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Follow-up not found" });
    }
    res.status(200).json({ message: "Follow-up deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get follow-ups by Lead_ID
exports.getFollowUpsByLeadId = async (req, res) => {
  try {
    const followups = await followUpService.getFollowUpsByLeadId(req.params.leadId);
    res.status(200).json(followups);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get follow-ups by Next_followup_date
exports.getFollowUpsByDate = async (req, res) => {
  try {
    const followups = await followUpService.getFollowUpsByDate(req.params.date);
    res.status(200).json(followups);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get follow-ups by User_ID
exports.getFollowUpsByUserId = async (req, res) => {
  try {
    const followups = await followUpService.getFollowUpsByUserId(req.params.userId);
    res.status(200).json(followups);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
