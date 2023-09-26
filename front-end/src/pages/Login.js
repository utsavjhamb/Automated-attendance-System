import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {
    const [employeecode, setEmployeeCode] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate("/");
        }
    })
    const handleLogin = async () => {
        // console.log(employeecode, password);
        let result = await fetch('http://localhost:5000/login', {
            method: 'post',
            body: JSON.stringify({ employeecode, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        result = await result.json();
        // console.log(result);
        if (result.name) {
            localStorage.setItem("user", JSON.stringify(result));
            navigate("/");
        }
        else {
            alert("please enter correct details")
        }
    }
    return (
        <div className="login">
            <h1>Login</h1>
            <input type="text" className="inputBox" placeholder="Employee Code" onChange={(e) => setEmployeeCode(e.target.value)} value={employeecode}></input>
            <input type="password" className="inputBox" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password}></input>
            <button onClick={handleLogin} className="appButton" type="button">Login</button>
        </div>
    )
}
export default Login;

