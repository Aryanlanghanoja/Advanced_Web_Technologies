const db = require("../models/followup.model");
const FollowUp = db.Follow_Ups;

const createFollowUp = async (data) => {
  return await FollowUp.create(data);
};

const getAllFollowUps = async () => {
  return await FollowUp.findAll();
};

const getFollowUpById = async (id) => {
  return await FollowUp.findByPk(id);
};

const updateFollowUp = async (id, data) => {
  const followup = await FollowUp.findByPk(id);
  if (!followup) return null;
  await followup.update(data);
  return followup;
};

const deleteFollowUp = async (id) => {
  const followup = await FollowUp.findByPk(id);
  if (!followup) return null;
  await followup.destroy();
  return true;
};

// 🔍 Filter: Get follow-ups by Lead_ID
const getFollowUpsByLeadId = async (leadId) => {
  return await FollowUp.findAll({
    where: { Lead_ID: leadId },
  });
};

// 🔍 Filter: Get follow-ups by Next_followup_date
const getFollowUpsByDate = async (date) => {
  return await FollowUp.findAll({
    where: { Next_followup_date: date },
  });
};

// 🔍 Filter: Get follow-ups by User_ID
const getFollowUpsByUserId = async (userId) => {
  return await FollowUp.findAll({
    where: { User_ID: userId },
  });
};

module.exports = {
  createFollowUp,
  getAllFollowUps,
  getFollowUpById,
  updateFollowUp,
  deleteFollowUp,
  getFollowUpsByLeadId,
  getFollowUpsByDate,
  getFollowUpsByUserId,
};
