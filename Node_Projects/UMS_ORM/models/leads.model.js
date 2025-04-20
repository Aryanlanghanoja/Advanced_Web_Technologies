const { DataTypes } = require('sequelize');

// Exporting the model definition function
module.exports = model;

/**
 * Defines the 'Leads' model with the required attributes and their properties.
 * 
 * @param {Sequelize} sequelize - The Sequelize instance for database connection
 * @returns {Model} The Sequelize model for 'Leads'
 */
function model(sequelize) {
    const attributes = {
        // Primary key for the lead
        Lead_ID: { 
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },

        // Employee name who generated the lead
        Emp_Id: {
            type: DataTypes.INTEGER,
            allowNull: false ,
            references: {
                model: 'Users',
                key: 'User_ID'
            }
        },

        // Source of the lead
        Source: {
            type: DataTypes.STRING,
            allowNull: false
        },

        // Date the lead was created
        Date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },

        // Client name or reference
        Client: {
            type: DataTypes.STRING,
            allowNull: false
        },

        // District associated with the lead
        District: {
            type: DataTypes.STRING,
            allowNull: false
        },

        // Contact number for the client
        Contact_Number: {
            type: DataTypes.STRING,
            allowNull: false
        },

        // Email address for the client
        Email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },

        // Status of the lead (e.g., active, converted, dropped)
        Status: {
            type: DataTypes.STRING,
            allowNull: false
        }
    };

    // Creating the model
    return sequelize.define("Leads", attributes);
}
