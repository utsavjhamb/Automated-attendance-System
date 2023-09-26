import { React, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';

const AddStudent = () => {
    const [studentId, setStudentId] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState(false);

    const params = useParams();
    const navigate = useNavigate();

    const classId = params.id;

    const addData = async () => {
        console.warn(name, studentId, classId);
        if (!name || !studentId) {
            setError(true);
            return false;
        }

        await fetch(`http://localhost:5000/add-student`, {
            method: 'post',
            body: JSON.stringify({ name, studentId, classId }),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        navigate('/');
    }
    // // const selectedFile = `${params.id}`
    // const [selectedFile, setSelectedFile] = useState(null);

    // // Function to handle file selection
    // const handleFileSelect = (e) => {
    //     setSelectedFile(e.target.files[0]);
    // };

    // // Function to handle file upload
    // const handleFileUpload = async () => {
    //     await fetch(`http://localhost:5000/upload/`+`${classId}`, {
    //         method: 'POST',
    //         body: selectedFile
    //     })
    // }

    return (
        <div>
            <div className="login">
                <h1>Add Student</h1>
                <input type="text" className="inputBox" placeholder="Student ID" onChange={(e) => setStudentId(e.target.value)} value={studentId}></input>
                <input type="text" className="inputBox" placeholder="Name" onChange={(e) => setName(e.target.value)} value={name}></input>
                <button onClick={addData} className="appButton" type="button">ADD</button>
                {/* <input type="file" onChange={handleFileSelect} />
                <button onClick={handleFileUpload}>Upload</button> */}
            </div>
            <div className="error-message">
                {error && !name && <span className='invalid'>Enter valid name</span>}
                {error && !studentId && <span className='invalid'>Enter valid studentId</span>}
            </div>
        </div>
    )
}

export default AddStudent;