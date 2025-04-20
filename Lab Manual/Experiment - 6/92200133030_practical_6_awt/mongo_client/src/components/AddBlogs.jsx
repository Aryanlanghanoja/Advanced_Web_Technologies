import React, { useState, useEffect } from 'react';

const AddBlogs = ({ editingBlog, onAdd }) => {
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [date, setDate] = useState('');
  const [content , setContent] = useState('');

  // Pre-fill form with existing data during editing
  useEffect(() => {
    if (editingBlog) {
      setId(editingBlog._id);
      setTitle(editingBlog.title);
      setAuthorName(editingBlog.author);
      setDate(editingBlog.date.split('T')[0]);
      setContent(editingBlog.description);
    } else {
      // Reset form when not editing
      setId('');
      setTitle('');
      setAuthorName('');
      setDate('');
      setContent('');
    }
  }, [editingBlog]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const blogData = {
      _id : id,
      title: title,
      author: authorName,
      description : content,
      date: date || new Date().toISOString().split('T')[0] // Use current date if none provided
    };

    try {
      await onAdd(blogData);
      alert(`Blog ${editingBlog ? 'updated' : 'added'} successfully!`);
    } catch (error) {
      console.error('Error saving blog:', error);
      alert('Failed to save blog');
    }

    // Clear form after submission
    setId('');
    setTitle('');
    setAuthorName('');
    setDate('');
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Author Name"
        value={authorName}
        onChange={(e) => setAuthorName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <input
        type="date"
        placeholder="Date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <button type="submit">
        {editingBlog ? 'Update Blog' : 'Add Blog'}
      </button>
    </form>
  );
};

export default AddBlogs;
