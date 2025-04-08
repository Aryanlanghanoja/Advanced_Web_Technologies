import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function Read() {
    const { id } = useParams();
    const [employee, setStudent] = useState(null);  

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

    return (
        <div>
            <h2>Student Detail</h2>
            {employee ? (  
                <>
                    <h2>ID: {employee.id}</h2>
                    <h2>Name: {employee.name}</h2>
                    <h2>Email: {employee.email}</h2>
                    <h2>Grade: {employee.salary}</h2>
                    <h2>Designation: {employee.designation}</h2>
                    <h2>Department: {employee.department}</h2>
                    <h2>Reporting Head: {employee.reporting_head}</h2>
                    <h2>Salary: {employee.salary}</h2>
                    <Link to="/">Back</Link>
                    <Link to={`/edit/${employee.id}`}>Edit</Link>
                </>
            ) : (
                <h2>Loading...</h2>
            )}
        </div>
    );
}

export default Read;
