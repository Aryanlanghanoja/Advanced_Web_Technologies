const sequelize = require('../config/db');
const Student = require('./student');
const Course = require('./course');

Course.hasMany(Student, { foreignKey: 'courseId', onDelete: 'CASCADE' });
Student.belongsTo(Course, { foreignKey: 'courseId' });

sequelize.sync({ alter: true });

module.exports = { Student, Course };