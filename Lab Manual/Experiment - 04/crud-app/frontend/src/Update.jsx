import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Update() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [student, setStudent] = useState({});  

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
        age: '',
        grade: ''
    });

    useEffect(() => {
        if (student) {
            setValues({
                name: student.name || '',
                age: student.age || '',
                grade: student.grade || ''
            });
        }
    }, [student]);

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
                <h2 className="text-center">Update Student</h2>
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
                    <button type="submit" className="btn btn-primary w-100">Update</button>
                </form>
            </div>
        </div>
    );
}

export default Update;
