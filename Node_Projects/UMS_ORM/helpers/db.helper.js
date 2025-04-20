// Database configuration
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;

// Sequelize ORM
const { Sequelize } = require("sequelize");

module.exports = db = {};

initialize();

async function initialize() {

    // Initialize Sequelize instance for PostgreSQL
    const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
        dialect: "postgres",
        host: DB_HOST,
        port: DB_PORT,
        logging: false, 
        dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false // Use this cautiously, only for development
        }
        }// Optional: disable query logging
    });

    // Import models with Sequelize instance
    db.User = require("../models/user.model")(
        sequelize
    );

    db.Lead = require("../models/leads.model")(
        sequelize
    );

    db.Followup = require("../models/followup.model")(
        sequelize
    );

    db.Task = require("../models/tasks.model")(
        sequelize
    );

    db.Document = require("../models/documents.model")(
        sequelize
    );

    db.PasswordReset = require("../models/passwordReset.model")(
        sequelize
    );

    // Define model relationships

    /**
     * User has many Leads
     * - A user can create/manage multiple leads
     */
    db.User.hasMany(db.Lead, {
        foreignKey: "User_ID",
    });

    db.Lead.belongsTo(db.User, {
        foreignKey: "User_ID",
    });
    

    /**
     * Lead has many Followups
     * - A lead can have multiple follow-up entries
     */
    db.Lead.hasMany(db.Followup, {
        foreignKey: "Lead_ID",
    });

    db.Followup.belongsTo(db.Lead, {
        foreignKey: "Lead_ID",
    });

    /**
     * Followup has many Tasks
     * - Each follow-up may have multiple tasks associated with it
     */
    db.Followup.hasMany(db.Task, {
        foreignKey: "FollowUP_ID",
    });

    db.Task.belongsTo(db.Followup, {
        foreignKey: "FollowUP_ID",
    });

    /**
     * Task has many Documents
     * - A task may have multiple related documents
     */
    db.Task.hasMany(db.Document, {
        foreignKey: "Task_ID",
    });

    db.Document.belongsTo(db.Task, {
        foreignKey: "Task_ID",
    });

    // Sync all models with the database (creates tables if not exist)
    await sequelize.sync(
    {
        alter: false,
    })
    .then(() => {
        console.log('PostgreSQL Synced Sucessfully');
    })
    .catch(err => {
        console.error('Unable to connect to DB:', err);
    });

    // Export Sequelize instance
    db.sequelize = sequelize;
}
