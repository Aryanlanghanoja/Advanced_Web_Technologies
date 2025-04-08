import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddMarks = ({ editingMark, onSuccess }) => {
  const [rollNumber, setRollNumber] = useState('');
  const [name, setName] = useState('');
  const [subjects, setSubjects] = useState({
    math: '',
    science: '',
    english: '',
    geography: '',
    computer: '',
    history: ''
  });

  // Pre-fill form with existing data during editing
  useEffect(() => {
    if (editingMark) {
      setRollNumber(editingMark.roll_no);
      setName(editingMark.name);
      setSubjects({
        math: editingMark.math,
        science: editingMark.science,
        english: editingMark.english,
        geography: editingMark.geography,
        computer: editingMark.computer,
        history: editingMark.history
      });
    } else {
      // Reset the form when not editing
      setRollNumber('');
      setName('');
      setSubjects({
        math: '',
        science: '',
        english: '',
        geography: '',
        computer: '',
        history: ''
      });
    }
  }, [editingMark]);

  const handleSubmit = async (e) => {
    // e.preventDefault();

    const studentData = {
      roll_no: rollNumber,
      name: name,
      math: parseInt(subjects.math),
      science: parseInt(subjects.science),
      english: parseInt(subjects.english),
      geography: parseInt(subjects.geography),
      computer: parseInt(subjects.computer),
      history: parseInt(subjects.history)
    };

    try {
      if (editingMark) {
        // Update existing student
        await axios.put(`http://localhost:3000/api/students/${editingMark.id}`, studentData);
        alert('Student updated successfully!');
      } else {
        // Add new student
        await axios.post('http://localhost:3000/api/students', studentData);
        alert('Student added successfully!');
      }

      onSuccess(); // Refresh the list after submission
      // Clear form after submission
      setRollNumber('');
      setName('');
      setSubjects({
        math: '',
        science: '',
        english: '',
        geography: '',
        computer: '' ,
        history: ''
      });

    } catch (error) {
      console.error('Error adding/updating student:', error);
      alert('Failed to add/update student');
    }
  };

  const handleChange = (e) => {
    setSubjects({ ...subjects, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Student Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Roll Number"
        value={rollNumber}
        onChange={(e) => setRollNumber(e.target.value)}
        required
      />

      {Object.keys(subjects).map((subject) => (
        <input
          key={subject}
          name={subject}
          type="number"
          placeholder={`${subject.charAt(0).toUpperCase() + subject.slice(1)} Marks`}
          value={subjects[subject]}
          onChange={handleChange}
          required
        />
      ))}
      
      <button type="submit">
        {editingMark ? 'Update Marks' : 'Add Marks'}
      </button>
    </form>
  );
};

export default AddMarks;
