const { Student, Course } = require('../models');

exports.getStudents = async () => Student.findAll({ include: Course });
exports.getStudentById = async (id) => Student.findByPk(id, { include: Course });
exports.createStudent = async (data) => Student.create(data);
exports.updateStudent = async (id, data) => {
  const student = await Student.findByPk(id);
  if (!student) throw new Error('Student not found');
  return await student.update(data);
};
exports.deleteStudent = async (id) => {
  const student = await Student.findByPk(id);
  if (!student) throw new Error('Student not found');
  return await student.destroy();
};
