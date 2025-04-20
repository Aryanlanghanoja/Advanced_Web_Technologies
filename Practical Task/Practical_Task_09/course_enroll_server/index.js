const express = require('express');
const app = express();
const PORT = 3000;

const courseRoutes = require('./routes/courses');
const enrollmentRoutes = require('./routes/enrollments');

app.use(express.json());

app.use('/courses', courseRoutes);
app.use('/enroll', enrollmentRoutes);

app.get("/" , (req , res) => {
    res.send("Course Enroll API")
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
