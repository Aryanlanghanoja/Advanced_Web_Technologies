import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Update() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [employee, setStudent] = useState({});  

    useEffect(() => {
        axios.get(`http://localhost:8081/read/${id}`)
            .then(res => {
                console.log("API Response:", res.data);
                if (res.data.length > 0) {
                    setStudent(res.data[0]);  
                } else {
                    console.log("Student not found");
                    setStudent(null);
                }
            })
            .catch(err => console.log("API Error:", err));
    }, [id]);

    const [values, setValues] = useState({
        name: '',
        email: '',
        salary: '',
        designation: '',
        department: '',
        reporting_head: ''
    });

    const [designationlist, setDesignationList] = useState([]);
    const [departmentlist, setDepartmentList] = useState([]);
    const [reportingheadlist, setReportingHeadList] = useState([]);

    const fetchdesignation = () => {
        axios.get('http://localhost:8081/designation')
            .then(res => setDesignationList(res.data))
            .catch(err => console.log(err))
      }

      const fetchreportingHead = (dept) => {
        axios.get('http://localhost:8081/reporting_head?dept=' + dept)
            .then(res => setReportingHeadList(res.data))
            .catch(err => console.log(err))
            .then(res => fetchreportingHead(res.data[0].name)) ;
      }
// Update.jsx:52 Uncaught (in promise) TypeError: Cannot read properties of undefined (reading 'catch')
//at Update.jsx:52:52
      const fetchdepartment = () => {
        axios.get('http://localhost:8081/department')
            .then(res => setDepartmentList(res.data)
            .catch(err => console.log(err)))
            .then(res => fetchreportingHead(res.data[0].name)) // Fetch reporting heads for the first department by default
      }

    useEffect(() => {
        fetchdesignation(),
        fetchdepartment()
        
        if (employee) {
            setValues({
                name: employee.name || '',
                email: employee.email || '',
                salary: employee.salary || '',
                designation: employee.designation || '',
                department: employee.department || '',
                reporting_head: employee.reporting_head || ''

            });
        }
    }, [employee]);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:8081/update/${id}`, values)
            .then(res => {
                console.log("Update Successful:", res.data);
                navigate('/');  
            })
            .catch(err => console.log("Update Error:", err));
    };

    return (
        <div className="d-flex vh-100 justify-content-center align-items-center bg-light">
            <div className="w-50 bg-white p-4 rounded shadow">
                <h2 className="text-center">Update Employee</h2>
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

                    <div className="mb-3">
                        <label className="form-label">Designation</label>
                        
                    <select name="" id="" value={values.designation} onChange={e => setValues({...values, designation: e.target.value})} required>
                            <option value="">Select Designation</option>
                            {designationlist.map((item) => (
                                <option value={item.name}>{item.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Department</label>
                        
                        {/* <select name="" id="" value={values.department} onChange={e => setValues({...values, department: e.target.value}), }    required> */}
                         <select name="" id="" value={values.department} onChange={e => [setValues({...values, department: e.target.value}), fetchreportingHead(e.target.value)]} required>
                            <option value="">Select Department</option>
                            {departmentlist.map((item) => (
                                <option value={item.name}>{item.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Reporting Head</label>
                        
                        <select name="" id="" value={values.reporting_head} onChange={e => setValues({...values, reporting_head: e.target.value})} required>
                            <option value="">Select Reporting Head</option>
                            {reportingheadlist.map((item) => (
                                <option value={item.name}>{item.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Salary</label>
                        <input 
                            type="number" 
                            placeholder="Enter Salary" 
                            className="form-control"
                            value={values.salary} 
                            onChange={e => setValues({...values, salary: e.target.value})}
                            required
                        />
                    </div>
                    <button className="btn btn-primary w-100">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default Update;
