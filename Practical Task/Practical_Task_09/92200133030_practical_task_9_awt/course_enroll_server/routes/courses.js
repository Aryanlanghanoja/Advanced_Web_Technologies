const express = require('express');
const router = express.Router();
const { courses } = require('../data/mockData');

// Search courses
router.get('/', (req, res) => {
  const search = req.query.search?.toLowerCase() || '';
  const filtered = courses.filter(course =>
    course.title.toLowerCase().includes(search)
  );
  res.json(filtered);
});

module.exports = router;
