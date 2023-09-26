import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ClassList = () => {
    const [classes, setClasses] = useState([]);
    const auth = localStorage.getItem('user');
    const key = JSON.parse(auth).employeecode;
    const navigate = useNavigate();


    useEffect(() => {
        getClasses(key);
    })

    const getClasses = async (key) => {
        let result = await fetch(`http://localhost:5000/classes/${key}`);
        result = await result.json();
        setClasses(result);
    }

    const deleteClass = async (id) => {
        let result = await fetch(`http://localhost:5000/class/${id}`, {
            method: 'Delete'
        });
        result = await result.json();
        if (result) {
            navigate('/');
        }
    }

    return (
        <div >
            {
                (setClasses.length > 0) ?
                    <div className="list-box">
                        {
                            classes.map((item, index) =>
                                <div className="card">
                                    <Link to={"/profile/" + item._id} className="card-deco">
                                        <div>
                                            <button className="shift-right deco" onClick={() => deleteClass(item._id)}>Delete</button>
                                            <Link to={"/update/" + item._id} className="shift-right deco">Update</Link>
                                            <h2>{item.classTitle}</h2>
                                            <h4>{item.classCode}</h4>
                                            <Link to={"/add-student/" + item._id} className="d-deco shift-right">Add Students</Link>
                                        </div>
                                    </Link>
                                </div>
                            )
                        }
                    </div>
                    :
                    <div className="card">
                        <div>
                            <p>No classes yet! Let's add some</p>
                        </div>
                    </div>
            }
        </div>

    )
}
export default ClassList;
