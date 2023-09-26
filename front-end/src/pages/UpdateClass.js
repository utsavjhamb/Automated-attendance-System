import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const UpdateClass = () => {
    const [classTitle, setClassTitle] = React.useState('');
    const [classCode, setClassCode] = React.useState('');
    const [error, setError] = React.useState(false);
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        // console.log(params);
        getClassDetail();
    }, [])

    const getClassDetail = async () => {
        let result = await fetch(`http://localhost:5000/class/${params.id}`);
        result = await result.json();
        setClassTitle(result.classTitle);
        setClassCode(result.classCode);
    }

    const updateClass = async () => {
        if (!classCode || !classTitle) {
            setError(true);
            return false;
        }
        await fetch(`http://localhost:5000/class/${params.id}`, {
            method: 'put',
            body: JSON.stringify({ classCode, classTitle }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        navigate('/');
        // result = await result.json();
        // console.log(result);
    }

    return (
        <div className='newClass'>
            <h1>Update class</h1>
            <input className='inputBox' type='text' placeholder='Enter Class Code' value={classCode} onChange={(e) => { setClassCode(e.target.value) }} ></input>
            {error && !classCode && <span className='invalid'>Enter valid code</span>}
            <input className='inputBox' type='text' placeholder='Enter Class Title' value={classTitle} onChange={(e) => { setClassTitle(e.target.value) }} ></input>
            {error && !classTitle && <span className='invalid'>Enter valid title</span>}
            <button className='appButton' onClick={updateClass}>Update Class</button>
        </div>
    )
}

export default UpdateClass;