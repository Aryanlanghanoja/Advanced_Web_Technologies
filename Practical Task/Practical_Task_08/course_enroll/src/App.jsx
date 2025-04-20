import React, { useState } from "react";
import { Card, CardContent } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";

const courses = [
    {
      "id": 1,
      "title": "React for Beginners",
      "description": "Learn the basics of React.js and build dynamic web apps."
    },
    {
      "id": 2,
      "title": "Advanced JavaScript",
      "description": "Deep dive into JavaScript concepts and best practices."
    },
    {
      "id": 3,
      "title": "UI/UX Design Principles",
      "description": "Understand the fundamentals of great user experience design."
    },
    {
      "id": 4,
      "title": "Python Programming",
      "description": "Get started with Python and explore its powerful features."
    },
    {
      "id": 5,
      "title": "Data Structures and Algorithms",
      "description": "Master DSA for technical interviews and problem-solving."
    },
    {
      "id": 6,
      "title": "Web Development Bootcamp",
      "description": "Learn HTML, CSS, JavaScript and build full-stack web apps."
    },
    {
      "id": 7,
      "title": "Machine Learning Essentials",
      "description": "Understand the core concepts of machine learning with hands-on projects."
    },
    {
      "id": 8,
      "title": "Database Management Systems",
      "description": "Explore relational databases, SQL, and database design."
    },
    {
      "id": 9,
      "title": "Cloud Computing Basics",
      "description": "Introduction to cloud services and deployment models."
    },
    {
      "id": 10,
      "title": "Cybersecurity Fundamentals",
      "description": "Learn about threats, vulnerabilities, and defense mechanisms."
    },
    {
      "id": 11,
      "title": "DevOps with Docker and Kubernetes",
      "description": "Implement CI/CD pipelines and manage containerized applications."
    },
    {
      "id": 12,
      "title": "Mobile App Development with Flutter",
      "description": "Build beautiful, natively compiled apps with Flutter and Dart."
    },
    {
      "id": 13,
      "title": "Introduction to Artificial Intelligence",
      "description": "Explore the basics of AI and its real-world applications."
    },
    {
      "id": 14,
      "title": "Git and GitHub Masterclass",
      "description": "Version control your code and collaborate using Git and GitHub."
    },
    {
      "id": 15,
      "title": "Operating Systems Concepts",
      "description": "Understand processes, memory, and file management in OS."
    },
    {
      "id": 16,
      "title": "Software Engineering Practices",
      "description": "Learn agile, scrum, and modern software development practices."
    },
    {
      "id": 17,
      "title": "Natural Language Processing",
      "description": "Build applications that can understand and generate human language."
    },
    {
      "id": 18,
      "title": "Blockchain for Developers",
      "description": "Dive into blockchain technology and build decentralized apps."
    },
    {
      "id": 19,
      "title": "Intro to Internet of Things (IoT)",
      "description": "Build smart devices with sensors, microcontrollers, and IoT platforms."
    },
    {
      "id": 20,
      "title": "Augmented and Virtual Reality",
      "description": "Explore immersive technologies and how to develop AR/VR apps."
    },
    {
      "id": 21,
      "title": "Game Development with Unity",
      "description": "Create interactive 2D and 3D games using Unity and C#."
    },
    {
      "id": 22,
      "title": "Design Thinking Workshop",
      "description": "Apply human-centered design to solve complex problems creatively."
    },
    {
      "id": 23,
      "title": "Agile Project Management",
      "description": "Manage tech projects effectively using agile principles."
    },
    {
      "id": 24,
      "title": "Ethical Hacking and Pen Testing",
      "description": "Learn how to find and fix vulnerabilities through ethical hacking."
    },
    {
      "id": 25,
      "title": "Big Data and Hadoop",
      "description": "Process and analyze massive datasets using the Hadoop ecosystem."
    },
    {
      "id": 26,
      "title": "Financial Technology (FinTech) Basics",
      "description": "Explore innovations in digital payments, lending, and investment."
    },
    {
      "id": 27,
      "title": "Quantum Computing Introduction",
      "description": "Understand quantum mechanics fundamentals and quantum algorithms."
    },
    {
      "id": 28,
      "title": "Robotics with Arduino",
      "description": "Design and build interactive robots using Arduino and sensors."
    },
    {
      "id": 29,
      "title": "Data Visualization with Python",
      "description": "Create stunning visualizations using Matplotlib, Seaborn, and Plotly."
    },
    {
      "id": 30,
      "title": "Intro to Computer Vision",
      "description": "Learn image processing and object detection using OpenCV."
    }
];

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [enrolled, setEnrolled] = useState([]);

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEnroll = (courseId) => {
    if (!enrolled.includes(courseId)) {
      setEnrolled([...enrolled, courseId]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-[Poppins]">
      <h1 className="text-3xl font-bold mb-6 text-center">Course Enrollment Platform</h1>

      <div className="max-w-xl mx-auto mb-6">
        <Input
          placeholder="Search for courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCourses.map((course) => (
          <Card key={course.id} className="bg-white shadow-md rounded-2xl">
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
              <p className="text-sm text-gray-600 mb-4">{course.description}</p>
              <Button
                className="w-full"
                onClick={() => handleEnroll(course.id)}
                disabled={enrolled.includes(course.id)}
              >
                {enrolled.includes(course.id) ? "Enrolled" : "Enroll"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
