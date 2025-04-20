import React from 'react';

const MarksTable = ({ marks, onEdit, onDelete }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Roll No</th>
          <th>Name</th>
          <th>Math</th>
          <th>Science</th>
          <th>English</th>
          <th>History</th>
          <th>Geography</th>
          <th>Computer</th>
          <th>Total</th>
          <th>Percentage</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {marks.map((mark) => (
          <tr key={mark.id}>
            <td>{mark.rollNumber}</td>
            <td>{mark.name}</td>
            {Object.values(mark.subjects).map((val, idx) => (
              <td key={idx}>{val}</td>
            ))}
            <td>{mark.total}</td>
            <td>{mark.percentage}%</td>
            <td>
              <button
                className="edit-btn"
                onClick={() => onEdit(mark)}
              >
                Edit
              </button>
              <button
                className="delete-btn"
                onClick={() => onDelete(mark.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MarksTable;
