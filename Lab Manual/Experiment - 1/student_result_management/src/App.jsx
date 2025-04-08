import React, { useState } from 'react';
import AddMarks from './components/AddMarks';
import MarksTable from './components/MarksTable';
import './App.css';  // Styling import

const App = () => {
  const [marks, setMarks] = useState([]);
  const [editingMark, setEditingMark] = useState(null);

  // Add or update student marks
  const addMark = (newMark) => {
    const total = Object.values(newMark.subjects).reduce(
      (acc, val) => acc + parseInt(val || 0),
      0
    );
    const percentage = ((total / 600) * 100).toFixed(2);

    if (editingMark) {
      // Update the existing mark
      const updatedMarks = marks.map((mark) =>
        mark.id === editingMark.id
          ? { ...newMark, id: editingMark.id, total, percentage }
          : mark
      );
      setMarks(updatedMarks);
      setEditingMark(null);  // Clear edit mode
    } else {
      // Add new mark
      setMarks([
        ...marks,
        { ...newMark, id: Date.now(), total, percentage }
      ]);
    }
  };

  const handleEdit = (mark) => {
    setEditingMark(mark);
  };

  const deleteMark = (id) => {
    setMarks(marks.filter((mark) => mark.id !== id));
    setEditingMark(null);  // Exit edit mode on delete
  };

  return (
    <div className="container">
      <h1>Student Result Management</h1>
      <AddMarks onAdd={addMark} editingMark={editingMark} />
      <MarksTable marks={marks} onEdit={handleEdit} onDelete={deleteMark} />
    </div>
  );
};

export default App;
