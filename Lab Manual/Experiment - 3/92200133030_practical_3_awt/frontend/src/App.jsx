import { useState, useEffect } from 'react';
import axios from 'axios';
import AddBlogs from './components/AddBlogs';
import BlogsTable from './components/BlogsTable';
import './App.css';

const API_URL = 'http://localhost:3000/api/blogs';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [editingBlog, setEditingBlog] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      setBlogs(response.data);
      setError('');
    } catch (error) {
      console.error('Error fetching blogs:', error);
      setError('Failed to fetch blogs. Try again later.');
    } finally {
      setLoading(false);
    }
  };

  const addBlog = async (newBlog) => {
    try {
      if (editingBlog) {
        await axios.put(`${API_URL}/${editingBlog._id}`, newBlog);
        setEditingBlog(null);
      } else {
        await axios.post(API_URL, newBlog);
      }
      fetchBlogs();
    } catch (error) {
      console.log('Error adding/updating blog:', error);
      setError('Failed to save blog.');
    }
  };

  const deleteBlog = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;

    try {
      await axios.delete(`${API_URL}/${id}`);
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id));
    } catch (error) {
      console.error('Error deleting blog:', error);
      setError('Failed to delete blog.');
    }
  };

  return (
    <div className="container">
      <h1>Blog Management System</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      <AddBlogs onAdd={addBlog} editingBlog={editingBlog} />
      <BlogsTable
        blogs={blogs}
        onEdit={setEditingBlog}
        onDelete={deleteBlog}
      />
    </div>
  );
};

export default App;
