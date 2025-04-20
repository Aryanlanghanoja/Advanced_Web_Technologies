const { DataTypes } = require('sequelize');

// Exporting the model definition function
module.exports = model;

/**
 * Defines the 'PasswordReset' model with the required attributes and their properties.
 * 
 * @param {Sequelize} sequelize - The Sequelize instance for database connection
 * @returns {Model} The Sequelize model for 'PasswordReset'
 */
function model(sequelize) {
    const attributes = {
        // Email address of the user requesting password reset
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },

        // Token generated for resetting the password
        token: {
            type: DataTypes.STRING,
            allowNull: false
        }
    };

    const options = {
        tableName: 'password_resets',
        timestamps: true
    };

    // Creating the model
    return sequelize.define("PasswordReset", attributes, options);
}
