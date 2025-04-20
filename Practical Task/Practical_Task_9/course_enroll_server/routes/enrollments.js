const express = require('express');
const router = express.Router();
const { courses, enrollments } = require('../data/mockData');

// Enroll in a course
router.post('/', (req, res) => {
  const { userId, courseId } = req.body;

  const courseExists = courses.some(c => c.id === courseId);
  if (!courseExists) return res.status(404).json({ message: 'Course not found' });

  const alreadyEnrolled = enrollments.some(
    e => e.userId === userId && e.courseId === courseId
  );
  if (alreadyEnrolled)
    return res.status(400).json({ message: 'Already enrolled' });

  enrollments.push({ userId, courseId });
  res.json({ message: 'Enrolled successfully' });
});

// Get user's enrolled courses
router.get('/:userId', (req, res) => {
  const userEnrollments = enrollments
    .filter(e => e.userId === req.params.userId)
    .map(e => courses.find(c => c.id === e.courseId));

  res.json(userEnrollments);
});

module.exports = router;
