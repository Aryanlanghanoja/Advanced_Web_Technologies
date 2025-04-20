const studentService = require('./marks.services');

exports.createStudent = (req, res) => {
  const student = req.body;

  studentService.createStudent(student, (err, result) => {
    if (err) {
      res.status(500).send({ message: 'Error creating student', error: err });
    } else {
      res.status(201).send({ message: 'Student created', data: result });
    }
  });
};

exports.getAllStudents = (req, res) => {
  studentService.getAllStudents((err, results) => {
    if (err) {
      res.status(500).send({ message: 'Error fetching students', error: err });
    } else {
      res.status(200).send(results);
    }
  });
};

exports.getStudentById = (req, res) => {
  const id = req.params.id;

  studentService.getStudentById(id, (err, result) => {
    if (err) {
      res.status(500).send({ message: 'Error fetching student', error: err });
    } else {
      res.status(200).send(result[0]);
    }
  });
};

exports.updateStudent = (req, res) => {
  const id = req.params.id;
  const student = req.body;

  studentService.updateStudent(id, student, (err, result) => {
    if (err) {
      res.status(500).send({ message: 'Error updating student', error: err });
    } else {
      res.status(200).send({ message: 'Student updated successfully' });
    }
  });
};

exports.deleteStudent = (req, res) => {
  const id = req.params.id;

  studentService.deleteStudent(id, (err, result) => {
    if (err) {
      res.status(500).send({ message: 'Error deleting student', error: err });
    } else {
      res.status(200).send({ message: 'Student deleted successfully' });
    }
  });
};
