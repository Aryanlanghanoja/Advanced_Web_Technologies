import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function LeaveRead() {
    const { id } = useParams();
    const [employee, setStudent] = useState(null);  

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

    return (
        <div>
            <h2>Leave Detail</h2>
            {employee ? (  
                <>
                    <h2>ID: {employee.id}</h2>
                    <h2>Name: {employee.name}</h2>
                    <h2>Allowed Per Month: {employee.allowed_month}</h2>
                    <h2>Allowed Per Year: {employee.allowed_year}</h2>
                    <h2>Payment Status: {employee.payment}</h2>
                    <h2>Day Status: {employee.day_status}</h2>
                   
                    <Link to="/leave/">Back</Link>
                    <Link to={`/edit/${employee.id}`}>Edit</Link>
                </>
            ) : (
                <h2>Loading...</h2>
            )}
        </div>
    );
}

export default LeaveRead;
