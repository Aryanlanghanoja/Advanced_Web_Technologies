import React from 'react';

const BooksTable = ({ Books, onEdit, onDelete }) => {
  if (!Books || !Array.isArray(Books) || Books.length === 0) {
    return <p>No Books available.</p>;
  }

  return (
    <div>
      <h2>Books</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author Name</th>
            <th>Content</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Books.map((book) => {
            return (
              <tr key={book.id}>
                <td>{book.id}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.description}</td>
                <td>{book.date}</td>
                <td>
                  <button className="edit-btn" onClick={() => onEdit(book)}>
                    Edit
                  </button>
                  <button className="delete-btn" onClick={() => onDelete(book.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>

      </table>
    </div>
  );
};

export default BooksTable;
