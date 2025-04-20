const db = require("../models/leads.model");
const Lead = db.Leads;

exports.createLead = async (leadData) => {
  return await Lead.create(leadData);
};

exports.getAllLeads = async () => {
  return await Lead.findAll();
};

exports.getLeadById = async (id) => {
  return await Lead.findByPk(id);
};

exports.updateLead = async (id, updateData) => {
  const lead = await Lead.findByPk(id);
  if (!lead) return null;
  await lead.update(updateData);
  return lead;
};

exports.deleteLead = async (id) => {
  const deleted = await Lead.destroy({ where: { Lead_ID: id } });
  return deleted;
};

// Filters
exports.getLeadsByEmpId = async (empId) => {
  return await Lead.findAll({ where: { Emp_Id: empId } });
};

exports.getLeadsBySource = async (source) => {
  return await Lead.findAll({ where: { Source: source } });
};

exports.getLeadsByClient = async (client) => {
  return await Lead.findAll({ where: { Client: client } });
};

exports.getLeadsByStatus = async (status) => {
  return await Lead.findAll({ where: { Status: status } });
};

exports.getLeadsByEmail = async (email) => {
  return await Lead.findAll({ where: { Email: email } });
};

exports.getLeadsByContact = async (number) => {
  return await Lead.findAll({ where: { Contact_Number: number } });
};

exports.getLeadsByDateRange = async (start, end) => {
  return await Lead.findAll({
    where: {
      Date: {
        [db.Sequelize.Op.between]: [start, end],
      },
    },
  });
};
