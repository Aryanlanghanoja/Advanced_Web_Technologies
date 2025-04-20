import React, { useState, useEffect } from 'react';

const AddBooks = ({ editingbook, onAdd }) => {
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [date, setDate] = useState('');
  const [content , setContent] = useState('');

  // Pre-fill form with existing data during editing
  useEffect(() => {
    if (editingbook) {
      setId(editingbook.id);
      setTitle(editingbook.title);
      setAuthorName(editingbook.author);
      setDate(editingbook.date.split('T')[0]);
      setContent(editingbook.description);
    } else {
      // Reset form when not editing
      setId('');
      setTitle('');
      setAuthorName('');
      setDate('');
      setContent('');
    }
  }, [editingbook]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookData = {
      id : id,
      title: title,
      author: authorName,
      description : content,
      date: date || new Date().toISOString().split('T')[0] // Use current date if none provided
    };

    try {
      await onAdd(bookData);
      alert(`book ${editingbook ? 'updated' : 'added'} successfully!`);
    } catch (error) {
      console.error('Error saving book:', error);
      alert('Failed to save book');
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
        {editingbook ? 'Update book' : 'Add book'}
      </button>
    </form>
  );
};

export default AddBooks;
