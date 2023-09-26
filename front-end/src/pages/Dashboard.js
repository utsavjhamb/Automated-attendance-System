import React from "react";
import ClassList from "./ClassList";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();
    const goToAddClass = () => {
        navigate("/add-class");
    }
    return (
        <div>
            <button className="appButton shift-right" onClick={goToAddClass} >Add Class</button>
            <br />
            <br />
            <br />
            <br />
            <div className="body-margin">
                <ClassList />
            </div>
        </div>
    )
}
export default Dashboard;