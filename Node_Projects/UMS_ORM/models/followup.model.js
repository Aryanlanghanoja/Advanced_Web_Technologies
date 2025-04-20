const { DataTypes } = require('sequelize');

// Exporting the model definition function
module.exports = model;

/**
 * Defines the 'Follow_Ups' model with the required attributes and their properties.
 * 
 * @param {Sequelize} sequelize - The Sequelize instance for database connection
 * @returns {Model} The Sequelize model for 'Follow_Ups'
 */
function model(sequelize) {
    const attributes = {
        // Primary key for follow-up
        FollowUP_ID: {
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
                model: 'Leads',
                key: 'Lead_ID'
            }
        },

        // Auto-incremented number of follow-up attempts for a lead
        No_of_followup: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        // Text conclusion of this follow-up
        Conclusion: {
            type: DataTypes.TEXT,
            allowNull: false
        },

        // Next follow-up date
        Next_followup_date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },

        // Foreign key from Users table
        User_ID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'User_ID'
            }
        }
    };

    return sequelize.define("Follow_Ups", attributes);
}
