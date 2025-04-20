import React, { useState, useEffect } from 'react';

const AddMarks = ({ onAdd, editingMark }) => {
  const [rollNumber, setRollNumber] = useState('');
  const [name, setName] = useState('');
  const [subjects, setSubjects] = useState({
    math: '',
    science: '',
    english: '',
    history: '',
    geography: '',
    computer: ''
  });

  // Pre-fill form with existing data during editing
  useEffect(() => {
    if (editingMark) {
      setRollNumber(editingMark.rollNumber);
      setName(editingMark.name);
      setSubjects({ ...editingMark.subjects });
    } else {
      setRollNumber('');
      setName('');
      setSubjects({
        math: '',
        science: '',
        english: '',
        history: '',
        geography: '',
        computer: ''
      });
    }
  }, [editingMark]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (rollNumber && name && Object.values(subjects).every((mark) => mark !== '')) {
      onAdd({ rollNumber, name, subjects });

      // Clear form after submission
      setRollNumber('');
      setName('');
      setSubjects({
        math: '',
        science: '',
        english: '',
        history: '',
        geography: '',
        computer: ''
      });
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
