const express = require('express');
const router = express.Router();
const markController = require('./marks.controller');

router.post('/', markController.createStudent);
router.get('/', markController.getAllStudents);
router.get('/:id', markController.getStudentById);
router.put('/:id', markController.updateStudent);
router.delete('/:id', markController.deleteStudent);

module.exports = router;
