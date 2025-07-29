 import React, { useEffect, useState } from 'react'
import {useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../components/Layout/utils';
 
 export const AttendanceHistoryFunction = () => {
    const [history, setHistory] = useState([]);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    if (!token) {
        handleError('You are not authorized!');
        return <p>You are not authorized!</p>;
    }

    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const userId = decodedToken.id;

    const fetchAttendance = async () => {
        setError('');
        try {
            const url = `http://localhost:8080/root/user/${userId}`;
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                }
            });

            const result = await response.json();
            const { success, message, data: data } = result;
            // console.log(data.attendance_history);

            if (success) {
                const list = Array.isArray(data.attendance_history) ? data.attendance_history : [];
                setHistory(list);
                handleSuccess(message);
            } else {
                handleError(message);
                setError(message);
            }
        } catch (err) {
            const msg = err?.message || 'Something went wrong!';
            handleError(msg);
            setError(msg);
        } 
    };

    // Optional: fetch data on component mount
    useEffect(() => {
        fetchAttendance();
    }, []);

    const navigatePath = () =>{
        fetchAttendance();
        navigate('/student/attendence/history', {state: { history }});
    }



return (
    <div>

        <div>
            <button className='atdbtn' onClick={navigatePath}>Attendance History</button>
        </div>
    </div>
)
 }
 