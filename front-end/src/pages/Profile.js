import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from 'axios';
// import * as FileSaver from 'file-saver';
// const excelJs = require('exceljs');

const Profile = () => {

    const [classTitle, setClassTitle] = React.useState('');
    const [classCode, setClassCode] = React.useState('');

    const [studentData, setStudentData] = useState([]);

    const [startDate, setstartDate] = useState("");
    const [endDate, setendDate] = useState("");

    const params = useParams();

    useEffect(() => {
        getClassDetail();
    });

    const getClassDetail = async () => {
        let result = await fetch(`http://localhost:5000/class/${params.id}`);
        result = await result.json();
        setClassTitle(result.classTitle);
        setClassCode(result.classCode);
    }

    const details = async (key, sdate, edate) => {
        console.log(sdate);
        console.log(edate);
        try {
            const response = await axios.post('http://127.0.0.1:8000/attendance', { classId: key, startDate: sdate, endDate: edate });
            setStudentData(response.data);
        } catch (error) {
            console.error('Error posting data:', error);
        }
        console.log(studentData);
        // console.log(Object.keys(studentData));
    }

    // const download = async (key, sdate, edate) => {
    //     try {
    //         await axios.post('http://127.0.0.1:8000/download', { classId: key, startDate: sdate, endDate: edate });
    //     } catch (error) {
    //         console.error('Error posting data:', error);
    //     }
    // }


    return (
        <div>
            <div className="webcam">
                <h1>{classTitle}</h1>
                <h3>{classCode}</h3>
                <br></br>
                {/* <Link to={"/webcam/" + `${params.id}`} className="appButton">Take Attendance</Link> */}
                <Link to={"http://127.0.0.1:8000/webcam/" + `${params.id}`} className="appButton">Take Attendance</Link>

                <br></br>
                <input type="date" className="inputBox" placeholder="yyyy-mm-dd" onChange={(e) => setstartDate(e.target.value)} value={startDate}></input>
                to
                <input type="date" className="inputBox" placeholder="yyyy-mm-dd" onChange={(e) => setendDate(e.target.value)} value={endDate}></input>
                {/* <button className="appButton" type="button" onClick={() => oldDetail(params.id, oldDate)} >View Attendance</button> */}

                <button className="appButton" id="viewb" type="button" onClick={() => details(params.id, startDate, endDate)} >View Attendance</button>
                {/* <Link to={"http://127.0.0.1:8000/download/" + `${params.id}/` + `${startDate}/` + `${endDate}`} className="appButton">Download Attendance</Link> */}
                {/* <button className="appButton" type="button" onClick={() => download(params.id, startDate, endDate)} >Download Attendance</button> */}
                <Link id="downloadb" to={"http://127.0.0.1:8000/download/" + `${params.id}/` + `${startDate}/` + `${endDate}`} className="appButton" >Download Attendance</Link>

            </div>
            <div id='absentlist'>
                {
                    (Object.keys(studentData).length !== 0) ?
                        <div className='absentlist'>
                            <h2>Attendance</h2>
                            <table className='abstable'>
                                <tr>
                                    <th>Students</th>
                                    {studentData['dates'].map((item) =>
                                        <th>{item[0] + ' ' + item[1]}</th>
                                    )}

                                </tr>
                                {
                                    studentData['students'].map((x, index) =>
                                        <tr>
                                            <td>{x}</td>
                                            {
                                                studentData['attendance'].map((student) =>
                                                    <td>{student[index]}</td>
                                                )
                                            }
                                        </tr>
                                    )
                                }

                            </table>
                        </div>
                        :
                        <div>
                            <p>Please select the date</p>
                        </div>
                }
            </div>
        </div>
    )
}
export default Profile;