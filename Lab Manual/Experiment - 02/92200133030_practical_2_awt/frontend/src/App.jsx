import { useState, useEffect } from 'react';
import axios from 'axios';
import AddMarks from './components/AddMarks';
import MarksTable from './components/MarksTable';
import './App.css';

const API_URL = 'http://localhost:3000/api/students';

const App = () => {
  const [marks, setMarks] = useState([]);
  const [editingMark, setEditingMark] = useState(null);

  useEffect(() => {
    fetchMarks();
  }, []);


  const fetchMarks = async () => {
    try {
      const response = await axios.get(API_URL);
      setMarks(response.data);
    } catch (error) {
      console.error('Error fetching marks:', error);
    }
  };


  const addMark = async (newMark) => {
    const total = Object.values(newMark.subjects).reduce(
      (acc, val) => acc + parseInt(val || 0),
      0
    );
    const percentage = ((total / 600) * 100).toFixed(2);

    if (editingMark) {
      const updatedMark = { ...newMark, total, percentage, id: editingMark.id };

      setMarks((prevMarks) =>
        prevMarks.map((mark) =>
          mark.id === editingMark.id ? updatedMark : mark
        )
      );

      try {
        await axios.put(`${API_URL}/${editingMark.id}`, updatedMark);
        setEditingMark(null); 
        fetchMarks();
      } catch (error) {
        console.error('Error updating mark:', error);
      }
    } else {
      // Add new mark
      const tempId = Date.now();
      const newStudent = {
        ...newMark,
        total,
        percentage,
        id: tempId 
      };

      // Optimistically update UI
      setMarks((prevMarks) => [...prevMarks, newStudent]);

      try {
        await axios.post(API_URL, {
          ...newMark,
          total,
          percentage
        });

        fetchMarks(); 
      } catch (error) {
        console.error('Error adding mark:', error);
      }
    }
  };

  const handleEdit = (mark) => {
    setEditingMark(mark);
  };

  const deleteMark = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setMarks((prevMarks) => prevMarks.filter((mark) => mark.id !== id));
      fetchMarks(); 
    } catch (error) {
      console.error('Error deleting mark:', error);
    }
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
