const db = require("../helpers/db.helper");
const { Op } = require("sequelize");

module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteByID,
    getByLeadId,
    getByFollowupId,
    searchByFileNameInLead
};

// Get all documents
async function getAll() {
    return await db.Document.findAll();
}

// Get document by primary key ID
async function getById(id) {
    const document = await db.Document.findByPk(id);
    if (!document) return "Document not found";
    return document;
}

// Create a new document
async function create(params) {
    const doc = new db.Document(params);
    await doc.save();
    return doc;
}

// Update a document by ID
async function update(id, params) {
    const doc = await db.Document.findByPk(id);
    if (!doc) return "Document not found";

    Object.assign(doc, params);
    await doc.save();
    return doc;
}

// Delete a document by ID
async function deleteByID(id) {
    const result = await db.Document.destroy({ where: { Documet_ID: id } });
    return result > 0 ? "Deleted successfully" : "Document not found";
}

// Get all documents by Lead ID
async function getByLeadId(leadId) {
    return await db.Document.findAll({
        where: {
            Lead_ID: leadId
        }
    });
}

// Get all documents associated with a Followup ID (via Task)
async function getByFollowupId(followupId) {
    const tasks = await db.Task.findAll({
        where: {
            FollowUP_ID: followupId
        },
        include: db.Document
    });

    // Flatten the document results from each task
    const allDocs = tasks.flatMap(task => task.Documents || []);
    return allDocs;
}

// Search by document name within a lead
async function searchByFileNameInLead(leadId, fileName) {
    const docs = await db.Documents.findAll({
        where: {
            Lead_ID: leadId,
            Doc_Name: { [Op.like]: `%${fileName}%` }
        }
    });

    if (!docs || docs.length === 0) return "No matching documents found for this Lead";
    return docs;
}
