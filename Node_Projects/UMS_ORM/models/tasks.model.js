const { DataTypes } = require('sequelize');

// Exporting the model definition function
module.exports = model;

/**
 * Defines the 'Tasks' model with the required attributes and their properties.
 * 
 * @param {Sequelize} sequelize - The Sequelize instance for database connection
 * @returns {Model} The Sequelize model for 'Tasks'
 */
function model(sequelize) {
    const attributes = {
        // Primary key for the Task
        Task_ID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },

        // Foreign key from Follow_Ups table
        FollowUP_ID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Follow_Ups',
                key: 'FollowUP_ID'
            }
        },

        // Deadline for the task
        DeadLine: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },

        // Description of the task
        Description: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    };

    return sequelize.define("Tasks", attributes);
}
