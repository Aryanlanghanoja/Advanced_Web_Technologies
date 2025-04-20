const { DataTypes } = require('sequelize');

// Exporting the model definition function
module.exports = model;

/**
 * Defines the 'Users' model with the required attributes and their properties.
 * 
 * @param {Sequelize} sequelize - The Sequelize instance for database connection
 * @returns {Model} The Sequelize model for 'Users'
 */
function model(sequelize) {
    // Defining the schema/attributes of the Users table
    const attributes = {

        // Username is the primary key for the table
        User_ID: {
            type: DataTypes.INTEGER,      // Data type: string
            autoIncrement: true,          // Cannot be null
            primaryKey: true              // Set as the Primary Key
        },

        // Username is the candidate key for the table
        User_name: { 
            type: DataTypes.STRING,       // Data type: string
            allowNull: false,             // Cannot be null
            unique: true                 // Set as the Unique Parameter
        },

        // Email field with validation to ensure it's in correct format
        Email: { 
            type: DataTypes.STRING,       // Data type: string
            allowNull: false,             // Cannot be null
            validate: { 
                isEmail: true             // Must follow email format (e.g., user@example.com)
            } 
        },

        // Phone number field (no specific format validation here, can be added if needed)
        Phone: { 
            type: DataTypes.STRING,       // Data type: string
            allowNull: false              // Cannot be null
        },

        // Role field to define user type (e.g., admin, faculty, student)
        Role: { 
            type: DataTypes.STRING,       // Data type: string
            allowNull: false              // Cannot be null
        },

        // District field to store location/area associated with the user
        District: { 
            type: DataTypes.STRING,       // Data type: string
            allowNull: false              // Cannot be null
        },

        // Password field (should be stored as a hashed value in practice)
        Password: { 
            type: DataTypes.STRING,       // Data type: string
            allowNull: false              // Cannot be null
        },

        // Field to store the status of the user
        User_status: { 
            type: DataTypes.BOOLEAN, 
            allowNull: false, 
            defaultValue: true 
        },
    };

    // Creating the model using Sequelize's define method
    return sequelize.define("Users", attributes);
    
}
