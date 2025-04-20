import axios from 'axios';
import React, { useState , useEffect , createContext, useContex} from 'react';
import { useNavigate } from 'react-router-dom';
const UserContext = createContext();

function Login() {
    const [values, setValues] = useState({
        name: '',
        email: '',
    });

    const [isAdmin, setIsAdmin] = useState(false);

    const fetchisAdmin = () => {
      axios.get('http://localhost:8081/fetch_admin?name=' + values.name)
          .then(res => setIsAdmin(res.data == 1 ? true : false))
          .catch(err => console.log(err));
    }

    const navigate=useNavigate();

    
    const handleSubmit = (e) => {
        e.preventDefault();
        fetchisAdmin();
        if(isAdmin) {
            <UserContext.Provider value={values}>
                <LeaveList />
            </UserContext.Provider>
        }

        else {
            navigate('/')
        }
    };

    return (
        <div className="d-flex vh-100 justify-content-center align-items-center bg-light">
            <div className="w-50 bg-white p-4 rounded shadow">
                <h2 className="text-center">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input 
                            type="text" 
                            placeholder="Enter Name" 
                            className="form-control"
                            value={values.name} 
                            onChange={e => setValues({...values, name: e.target.value})}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input 
                            type="text" 
                            placeholder="Enter Email" 
                            className="form-control"
                            value={values.email} 
                            onChange={e => setValues({...values, email: e.target.value})}
                            required
                        />
                    </div>

                    
                    <button className="btn btn-primary w-100">Submit</button>
                </form>
            </div>
        </div>
    );
}

function LeaveList() {
    // const [data, setData] = useState([]);

    // const fetchStudents = () => {
    //   axios.get('http://localhost:8081/fetch_leave?')
    //       .then(res => setData(res.data))
    //       .catch(err => console.log(err));
    // }

    // useEffect(() => {
    //   fetchStudents();
    // }, []);

//     const handleDelete = (id) => {
//       if (window.confirm("Are you sure you want to delete this student?")) {
//           axios.post(`http://localhost:8081/delete/${id}`)
//               .then(res => {
//                   console.log("Deleted Successfully", res.data);
//                   fetchStudents(); // Refresh the list
//               })
//               .catch(err => console.log(err));
//       }
//   };

    return (
        <div>
            <h2>Leave List</h2>
            <div>
                <Link to="/create">Create +</Link>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Leave ID</th>
                        <th>Employee Name</th>
                        <th>Leave Type</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Leave Days</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((leave) => (
                        <tr key={leave.id}>  
                            <td>{leave.id}</td>
                            <td>{leave.emp_name}</td>
                            <td>{leave.leave_type }</td>
                            <td>{leave.date}</td>
                            <td>{leave.status}</td>
                            <td>{leave.leave_day}</td> {/* Display salary in a currency format */}
                            <td>
                                {/* <Link to={`/read/${leave.id}`}><button>Read</button></Link>  */}
                                <Link to={`/edit/${leave.id}`}><button>Edit</button></Link>
                                {/* <button onClick={() => handleDelete(leave.id)}>Delete</button> */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Login;
