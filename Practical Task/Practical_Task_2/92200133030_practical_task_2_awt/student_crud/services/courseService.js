const { Course, Student } = require('../models');

exports.getCourses = async () => Course.findAll({ include: Student });
exports.getCourseById = async (id) => Course.findByPk(id, { include: Student });
exports.createCourse = async (data) => Course.create(data);
exports.updateCourse = async (id, data) => {
  const course = await Course.findByPk(id);
  if (!course) throw new Error('Course not found');
  return await course.update(data);
};
exports.deleteCourse = async (id) => {
  const course = await Course.findByPk(id);
  if (!course) throw new Error('Course not found');
  return await course.destroy();
};