const { DataTypes } = require('sequelize');

// Exporting the model definition function
module.exports = model;

/**
 * Defines the 'Documents' model with the required attributes and their properties.
 * 
 * @param {Sequelize} sequelize - The Sequelize instance for database connection
 * @returns {Model} The Sequelize model for 'Documents'
 */
function model(sequelize) {
    const attributes = {
        // Primary key for the document
        Documet_ID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },

        // Foreign key from Leads table
        Lead_ID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Leads',  // Ensure there's a 'Leads' table/model defined
                key: 'Lead_ID'
            }
        },

        // Path to the document file
        Doc_Path: {
            type: DataTypes.STRING,
            allowNull: false
        },

        // Name of the document
        Doc_Name: {
            type: DataTypes.STRING,
            allowNull: false
        },

        // Description of the document
        Doc_desc: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    };

    return sequelize.define("Documents", attributes);
}
