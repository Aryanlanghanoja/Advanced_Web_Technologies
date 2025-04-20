const Student = require('./marks.model');

const createStudent = (data, callback) => {
  Student.create(data, callback);
};

const getAllStudents = (callback) => {
  Student.findAll(callback);
};

const getStudentById = (id, callback) => {
  Student.findById(id, callback);
};

const updateStudent = (id, data, callback) => {
  Student.update(id, data, callback);
};

const deleteStudent = (id, callback) => {
  Student.delete(id, callback);
};

module.exports = {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent
};
