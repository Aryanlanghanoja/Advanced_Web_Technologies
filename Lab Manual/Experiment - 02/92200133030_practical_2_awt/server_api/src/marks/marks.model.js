const db = require('../config/db.config');

class Student {
  
  static create(student, callback) {
    const query = `
      INSERT INTO students (roll_no, name, math, science, english, geography, computer , history)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

    db.query(query, [student.roll_no, student.name, student.math, student.science, student.english, student.geography, student.computer , student.history], callback);
  }

  static findAll(callback) {
    const query = 'SELECT * FROM students';
    db.query(query, callback);
  }

  static findById(id, callback) {
    const query = 'SELECT * FROM students WHERE id = ?';
    db.query(query, [id], callback);
  }

  static update(id, student, callback) {
    const query = `
      UPDATE students
      SET roll_no = ?, name = ?, math = ?, science = ?, english = ?, geography = ?, computer = ?, history = ?
      WHERE id = ?`;

    db.query(query, [student.roll_no, student.name, student.math, student.science, student.english, student.geography, student.computer, student.history , id], callback);
  }

  static delete(id, callback) {
    const query = 'DELETE FROM students WHERE id = ?';
    db.query(query, [id], callback);
  }
}

module.exports = Student;
