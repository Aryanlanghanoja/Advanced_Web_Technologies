import React, { useEffect, useState ,  createContext, useContext  } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function LeaveList() {
    const [leavedata, setData] = useState([]);
    const [userdata , setuserData] = useState([]);

    const fetchStudents = () => {
      axios.get('http://localhost:8081/fetch_monthly_leave')
          .then(res => {setData(res.data.leave_summary)
            console.log(res.data)
          })
          .catch(err => console.log(err));
    }

    const fetchUserData = () => {
        axios.get('http://localhost:8081/fetch_user_leave')
            .then(res => {setuserData(res.data.leave_summary)
              console.log(res.data)
            })
            .catch(err => console.log(err));
      }

    useEffect(() => {
      fetchStudents(),
      fetchUserData()
    }, []);

    // const user = useContext(UserContext);

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
                {/* <Link to="/create">Create +</Link> */}
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Employee Name</th>
                        <th>Leave Type</th>
                        <th>Leave in this Month</th>
                        <th>Leave in this Year</th>
                    </tr>
                </thead>
                <tbody>
                    {leavedata.map((leave) => (
                        <tr key={leave.emp_name}>  
                            <td>{leave.emp_name}</td>
                            <td>{leave.leave_type}</td>
                            <td>{leave.month_count }</td>
                            <td>{leave.year_count}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h1>Total Leaves of User</h1>

            <table>
                <thead>
                    <tr>
                        <th>Employee Name</th>
                        <th>Leave in this Month</th>
                        <th>Leave in this Year</th>
                    </tr>
                </thead>
                <tbody>
                    {userdata.map((leave) => (
                        <tr key={leave.emp_name}>  
                            <td>{leave.emp_name}</td>
                            
                            <td>{leave.month_count }</td>
                            <td>{leave.year_count}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default LeaveList;
