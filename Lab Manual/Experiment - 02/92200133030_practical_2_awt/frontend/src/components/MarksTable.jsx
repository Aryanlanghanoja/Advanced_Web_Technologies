import React from 'react';

const MarksTable = ({ marks, onEdit, onDelete }) => {

  if (!marks || !Array.isArray(marks) || marks.length === 0) {
    return <p>No student marks available.</p>;
  }

  return (
    <div>
      <h2>Student Marks</h2>
      <table>
        <thead>
          <tr>
            <th>Roll No</th>
            <th>Name</th>
            <th>Math</th>
            <th>Science</th>
            <th>English</th>
            <th>Geography</th>
            <th>Computer</th>
            <th>History</th>
            <th>Total</th>
            <th>Percentage</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {marks.map((mark) => (
            <tr key={mark.id}>
              <td>{mark.roll_no}</td>
              <td>{mark.name}</td>
              <td>{mark.math}</td>
              <td>{mark.science}</td>
              <td>{mark.english}</td>
              <td>{mark.geography}</td>
              <td>{mark.computer}</td>
              <td>{mark.history}</td>
              <td>{(mark.math + mark.science + mark.english + mark.history + mark.geography + mark.computer)}</td>
              <td>{(mark.math + mark.science + mark.english + mark.history + mark.geography + mark.computer) * 100 / 600}%</td>
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
    </div>
  );
};

export default MarksTable;
