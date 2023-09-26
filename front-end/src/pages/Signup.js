import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [employeecode, setEmployeeCode] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = React.useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate("/");
        }
    })
    const collectData = async () => {
        // console.warn(name, email, password);
        if (!name || !email || !employeecode || !password) {
            setError(true);
            return false;
        }
        const result = await fetch('http://localhost:5000/signup', {
            method: 'post',
            body: JSON.stringify({ name, email, employeecode, password }),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let res = await result.json();
        // console.log(res);
        localStorage.setItem("user", JSON.stringify(res));
        if (res) {
            navigate('/');
        }
    }
    return (
        <div>
            <div className="signup">
                <h1>SignUp</h1>
                <input className="inputBox" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Username" ></input>
                <input className="inputBox" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" ></input>
                <input className="inputBox" type="text" value={employeecode} onChange={(e) => setEmployeeCode(e.target.value)} placeholder="Employee Code" ></input>
                <input className="inputBox" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" ></input>
                <button className="appButton" onClick={collectData} type="button">SignUp</button>
            </div>
            <div className="error-message">
                {error && !name && <span className='invalid'>Enter valid name</span>}
                {error && !email && <span className='invalid'>Enter valid email</span>}
                {error && !employeecode && <span className='invalid'>Enter valid employee code</span>}
                {error && !password && <span className='invalid'>Enter valid password</span>}
            </div>
        </div>
    )
}
export default SignUp;
