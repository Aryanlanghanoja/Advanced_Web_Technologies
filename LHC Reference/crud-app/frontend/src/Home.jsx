import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
    const [data, setData] = useState([]);

    const fetchStudents = () => {
      axios.get('http://localhost:8081/')
          .then(res => setData(res.data))
          .catch(err => console.log(err));
    }

    useEffect(() => {
      fetchStudents();
    }, []);

    const handleDelete = (id) => {
      if (window.confirm("Are you sure you want to delete this student?")) {
          axios.post(`http://localhost:8081/delete/${id}`)
              .then(res => {
                  console.log("Deleted Successfully", res.data);
                  fetchStudents(); // Refresh the list
              })
              .catch(err => console.log(err));
      }
  };

    return (
        <div>
            <h2>Student List</h2>
            <div>
                <Link to="/create">Create +</Link>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Student_ID</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Grade</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((student) => (
                        <tr key={student.id}>  
                            <td>{student.id}</td>
                            <td>{student.name}</td>
                            <td>{student.age}</td>
                            <td>{student.grade}</td>
                            <td>
                                <Link to={`/read/${student.id}`}><button>Read</button></Link> 
                                <Link to={`/edit/${student.id}`}><button>Edit</button></Link>
                                <button onClick={() => handleDelete(student.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Home;
