import axios from 'axios';
import React, { useState , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function LeaveCreate() {
    const [values, setValues] = useState({
        name: '',
        allowed_year: '',
        allowed_month: '',
        payment: '',
        day_status: ''

    });

    const navigate=useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();

        if(values.allowed_month > values.allowed_year) {
            alert("Allowed Per Month should be less than Allowed Per Year")
            return;
        }
        axios.post('http://localhost:8081/leave', values)
        .then(res => {
          console.log(res);
          navigate('/leave')
        })
        .catch(err => console.log(err));
    };

    return (
        <div className="d-flex vh-100 justify-content-center align-items-center bg-light">
            <div className="w-50 bg-white p-4 rounded shadow">
                <h2 className="text-center">Add Leave Type</h2>
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

export default LeaveCreate;
