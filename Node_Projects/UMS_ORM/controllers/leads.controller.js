const leadService = require("../services/leads.services");

exports.createLead = async (req, res) => {
  try {
    const lead = await leadService.createLead(req.body);
    res.status(201).json(lead);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllLeads = async (req, res) => {
  try {
    const leads = await leadService.getAllLeads();
    res.status(200).json(leads);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getLeadById = async (req, res) => {
  try {
    const lead = await leadService.getLeadById(req.params.id);
    if (!lead) return res.status(404).json({ message: "Lead not found" });
    res.status(200).json(lead);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateLead = async (req, res) => {
  try {
    const updated = await leadService.updateLead(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: "Lead not found" });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteLead = async (req, res) => {
  try {
    const deleted = await leadService.deleteLead(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Lead not found" });
    res.status(200).json({ message: "Lead deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Filter handlers
exports.getLeadsByEmpId = async (req, res) => {
  try {
    const leads = await leadService.getLeadsByEmpId(req.params.empId);
    res.status(200).json(leads);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getLeadsBySource = async (req, res) => {
  try {
    const leads = await leadService.getLeadsBySource(req.params.source);
    res.status(200).json(leads);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getLeadsByClient = async (req, res) => {
  try {
    const leads = await leadService.getLeadsByClient(req.params.client);
    res.status(200).json(leads);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getLeadsByStatus = async (req, res) => {
  try {
    const leads = await leadService.getLeadsByStatus(req.params.status);
    res.status(200).json(leads);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getLeadsByEmail = async (req, res) => {
  try {
    const leads = await leadService.getLeadsByEmail(req.params.email);
    res.status(200).json(leads);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getLeadsByContact = async (req, res) => {
  try {
    const leads = await leadService.getLeadsByContact(req.params.contact);
    res.status(200).json(leads);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getLeadsByDateRange = async (req, res) => {
  try {
    const { start, end } = req.query;
    const leads = await leadService.getLeadsByDateRange(start, end);
    res.status(200).json(leads);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
