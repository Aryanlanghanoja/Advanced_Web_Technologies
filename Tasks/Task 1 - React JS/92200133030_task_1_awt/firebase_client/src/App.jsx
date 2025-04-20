import { useState, useEffect } from 'react';
import axios from 'axios';
import AddBooks from './components/AddBooks';
import BooksTable from './components/BooksTable';
import './App.css';

const API_URL = 'http://localhost:3000/api/books';

const App = () => {
  const [Books, setBooks] = useState([]);
  const [editingbook, setEditingbook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      console.log(response.data);
      setBooks(response.data);
      setError('');
    } catch (error) {
      console.error('Error fetching Books:', error);
      setError('Failed to fetch Books. Try again later.');
    } finally {
      setLoading(false);
    }
  };

  const addbook = async (newbook) => {
    try {
      if (editingbook) {
        await axios.put(`${API_URL}/${editingbook.id}`, newbook);
        setEditingbook(null);
      } else {
        await axios.post(API_URL, newbook);
      }
      fetchBooks();
    } catch (error) {
      console.error('Error adding/updating book:', error);
      setError('Failed to save book.');
    }
  };

  const deletebook = async (id) => {
    if (!window.confirm('Are you sure you want to delete this book?')) return;

    try {
      if (!id) {
        throw new Error('book ID is required');
      }
      const response = await axios.delete(`${API_URL}/${id}`);
      if (response.data) {
        setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
        setError('');
      }
    } catch (error) {
      console.error('Error deleting book:', error);
      const errorMessage = error.response?.data?.message || 'Failed to delete book. Please check if the ID is valid.';
      setError(errorMessage);
    }
  };

  return (
    <div className="container">
      <h1>Book Management System</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      <AddBooks onAdd={addbook} editingbook={editingbook} />
      <BooksTable
        Books={Books}
        onEdit={setEditingbook}
        onDelete={deletebook}
      />
    </div>
  );
};

export default App;
