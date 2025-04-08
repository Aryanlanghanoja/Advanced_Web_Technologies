import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Leave() {
    const [data, setData] = useState([]);

    const fetchStudents = () => {
      axios.get('http://localhost:8081/leave')
          .then(res => setData(res.data))
          .catch(err => console.log(err));
    }

    useEffect(() => {
      fetchStudents();
    }, []);

    const handleDelete = (id) => {
      if (window.confirm("Are you sure you want to delete this student?")) {
          axios.post(`http://localhost:8081/leave/delete/${id}`)
              .then(res => {
                  console.log("Deleted Successfully", res.data);
                  fetchStudents(); // Refresh the list
              })
              .catch(err => console.log(err));
      }
  };

    return (
        <div>
            <h2>Leave Type  Master</h2>
            <div>
                <Link to="/leave/create">Create +</Link>
            </div>
            <table class="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Allowed Per Year</th>
                        <th>Allowed Per Month</th>
                        <th>Payemt Status</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((leave) => (
                        <tr key={leave.id}>  
                            <td>{leave.id}</td>
                            <td>{leave.name}</td>
                            <td>{leave.allowed_year}</td>
                            <td>{leave.allowed_month}</td>
                            <td>{leave.payment}</td> 
                            <td>{leave.day_status}</td>
                             {/* Display salary in a currency format */}
                            <td>
                                <Link to={`/leave/read/${leave.id}`}><button>Read</button></Link> 
                                <Link to={`/leave/edit/${leave.id}`}><button>Edit</button></Link>
                                <button onClick={() => handleDelete(leave.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Leave;
