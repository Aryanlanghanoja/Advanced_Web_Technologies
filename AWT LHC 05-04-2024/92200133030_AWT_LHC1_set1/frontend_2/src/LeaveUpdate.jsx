import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function LeaveUpdate() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [employee, setStudent] = useState({});  

    useEffect(() => {
        axios.get(`http://localhost:8081/leave/read/${id}`)
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
        allowed_year: '',
        allowed_month: '',
        payment: '',
        status: ''
    });

    useEffect(() => {
        
        if (employee) {
            setValues({
                name: employee.name || '',
                allowed_year: employee.allowed_year || '',
                allowed_month: employee.allowed_month || '',
                payment: employee.payment || '',
                status: employee.status || ''
            });
        }
    }, [employee]);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:8081/leave/update/${id}`, values)
            .then(res => {
                console.log("Update Successful:", res.data);
                navigate('/leave');  
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
                        <label className="form-label">Allowed Per Year</label>
                        <input 
                            type="number" 
                            placeholder="Enter Allowed Per Year" 
                            className="form-control"
                            value={values.allowed_year} 
                            onChange={e => setValues({...values, allowed_year: e.target.value})}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Allowed Per Month</label>
                        <input 
                            type="number" 
                            placeholder="Enter Allowed Per Month" 
                            className="form-control"
                            value={values.allowed_month} 
                            onChange={e => setValues({...values, allowed_month: e.target.value})}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Payemt Status</label>
                        
                    <select name="" id="" value={values.payment} onChange={e => setValues({...values, payment: e.target.value})} required>
                            <option value="">Select Payment Status</option>
                                <option value="With Pay">With Pay</option>
                                <option value="Without Pay">Without Pay</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Status</label>
                        
                    <select name="" id="" value={values.status} onChange={e => setValues({...values, status: e.target.value})} required>
                            <option value="">Select the Status</option>
                                <option value="approved">Approve</option>
                                <option value="rejected">Reject</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Day Status</label>
                        
                    <select name="" id="" value={values.day_status} onChange={e => setValues({...values, day_status: e.target.value})} required>
                            <option value="">Select Payment Status</option>
                                <option value="half">Half Day</option>
                                <option value="full">Full Day</option>
                        </select>
                    </div>
                    <button className="btn btn-primary w-100">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default LeaveUpdate;
