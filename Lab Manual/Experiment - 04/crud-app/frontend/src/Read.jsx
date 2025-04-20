import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function Read() {
    const { id } = useParams();
    const [student, setStudent] = useState(null);  

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
            {student ? (  
                <>
                    <h2>ID: {student.id}</h2>
                    <h2>Name: {student.name}</h2>
                    <h2>Age: {student.age}</h2>
                    <h2>Grade: {student.grade}</h2>
                    <Link to="/">Back</Link>
                    <Link to={`/edit/${student.id}`}>Edit</Link>
                </>
            ) : (
                <h2>Loading...</h2>
            )}
        </div>
    );
}

export default Read;
