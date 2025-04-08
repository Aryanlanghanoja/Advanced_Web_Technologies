import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Create() {
    const [values, setValues] = useState({
        name: '',
        age: '',
        grade: ''
    });


    const navigate=useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8081/student', values)
        .then(res => {
          console.log(res);
          navigate('/')
        })
        .catch(err => console.log(err));
    };

    return (
        <div className="d-flex vh-100 justify-content-center align-items-center bg-light">
            <div className="w-50 bg-white p-4 rounded shadow">
                <h2 className="text-center">Add Student</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input 
                            type="text" 
                            placeholder="Enter Name" 
                            className="form-control"
                            value={values.name} 
                            onChange={e => setValues({...values, name: e.target.value})}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Age</label>
                        <input 
                            type="text" 
                            placeholder="Enter Age" 
                            className="form-control"
                            value={values.age} 
                            onChange={e => setValues({...values, age: e.target.value})}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Grade</label>
                        <input 
                            type="text" 
                            placeholder="Enter Grade" 
                            className="form-control"
                            value={values.grade} 
                            onChange={e => setValues({...values, grade: e.target.value})}
                        />
                    </div>
                    <button className="btn btn-primary w-100">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default Create;
