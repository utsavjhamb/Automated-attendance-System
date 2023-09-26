import React from 'react'
import { useNavigate } from 'react-router-dom';

const AddClass = () => {
    const [classTitle, setClassTitle] = React.useState('');
    const [classCode, setClassCode] = React.useState('');
    const [error, setError] = React.useState(false);
    const navigate = useNavigate();
    const addClass = async () => {
        if (!classCode || !classTitle) {
            setError(true);
            return false;
        }
        const employeeCode = JSON.parse(localStorage.getItem('user')).employeecode;
        // console.log(userId);
        // let result = fetch("http://localhost:5000/add-class", {
        await fetch("http://localhost:5000/add-class", {
            method: 'post',
            body: JSON.stringify({ employeeCode, classCode, classTitle }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        navigate('/');
        // result = (await result).json();
        // console.log(result)
    }
    return (
        <div className='newClass'>
            <h1>Add a class</h1>
            <input className='inputBox' type='text' placeholder='Enter Class Code' value={classCode} onChange={(e) => { setClassCode(e.target.value) }} ></input>
            {error && !classCode && <span className='invalid'>Enter valid code</span>}
            <input className='inputBox' type='text' placeholder='Enter Class Title' value={classTitle} onChange={(e) => { setClassTitle(e.target.value) }} ></input>
            {error && !classTitle && <span className='invalid'>Enter valid title</span>}
            <button className='appButton' onClick={addClass}>Add Class</button>
        </div>
    )
}

export default AddClass;