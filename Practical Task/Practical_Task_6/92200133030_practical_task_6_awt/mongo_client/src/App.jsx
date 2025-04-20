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
      setBlogs(response.data.blogs);
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
      console.error('Error adding/updating blog:', error);
      setError('Failed to save blog.');
    }
  };

  const deleteBlog = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;

    try {
      if (!id) {
        throw new Error('Blog ID is required');
      }
      const response = await axios.delete(`${API_URL}/${id}`);
      if (response.data) {
        setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
        setError('');
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
      const errorMessage = error.response?.data?.message || 'Failed to delete blog. Please check if the ID is valid.';
      setError(errorMessage);
    }
  };

  return (
    <div className="container">
      <h1>Notes Management System</h1>
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
