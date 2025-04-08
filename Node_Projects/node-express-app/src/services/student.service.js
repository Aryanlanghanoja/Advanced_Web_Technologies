const db = require("../helper/db.helper");
const { Op } = require("sequelize");

module.exports = {
  create,
  fetchAll,
  findOne,
  deleteStudent,
  update,
};
async function create(params) {
  if (
    await db.Student.findOne({ where: { student_name: params.student_name } })
  ) {
    return "Student " + params.student_name + " is already exists";
  }
  const student = new db.Student(params);

  await student.save();
  return student;
}
async function fetchAll() {
  return await db.Student.findAll();
}
async function findOne(id, callback) {
  getStudent(id)
    .then((response) => {
      return callback(null, response);
    })
    .catch((error) => {
      return callback(error);
    });
}
async function update(id, params) {
  const student = await getStudent(id);
  const nameChanged =
    params.student_name && params.student_name !== student.student_name;
  if (
    nameChanged &&
    (await db.Student.findOne({ where: { student_name: params.student_name } }))
  ) {
    return "Student with name " + params.student_name + " is already exists";
  }
  Object.assign(student, params);
  await student.save();
  return student;
}
async function deleteStudent(id) {
  const student = await getStudent(id);

  if (student.student_status) {
    student.student_status = false;
  } else {
    student.student_status = true;
  }
  await student.save();
  return student;
}
async function getStudent(id) {
  const student = await db.Student.findByPk(id);
  if (!student) return "Student not found";
  return student;
}
