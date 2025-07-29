import { useEffect, useRef, useState } from "react";
import { handleError, handleSuccess } from "../../components/Layout/utils";
const URL = import.meta.env.VITE_API_URL;

export const MarkAttendance = () => {
    const [status, setStatus] = useState('');
    const [showCard, setShowCard] = useState(false);
    const btnRef = useRef(null);
    const cardRef = useRef(null);

    const token = localStorage.getItem('token');
    if(!token){
        handleError('You are not authorized1');
        return;
    }

    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const userId = decodedToken.id;

    // Fetch attendance status on mount
    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const url = `${URL}/root/student/attendance/${userId}`;
                const response = await fetch(url, {
                    method: 'GET',
                    headers:{
                        'Content-Type':'application/json',
                        'Authorization':`${token}`
                    }
                });
                const data = await response.json();
                setStatus(data.daily_attendance.status);
            } catch (error) {
                handleError(error?.message || 'Failed to fetch attendance status');
            }
        };
        fetchStatus();
    }, [userId, token]);

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const url = `${URL}/root/student/attendance/${userId}`;
            const response = await fetch(url, {
                method: 'POST',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`${token}`
                }
            })

            const data = await response.json();

            const {success, message} = data;

            setStatus(data.daily_attendance.status);
            if(success){
                handleSuccess(message);
            }else{
                handleError(message)
            }
        } catch (error) {
            handleError(error?.message || 'Something went wrong!');
        }
    }

    useEffect(() => {
        const handleClick = (e) => {
            if (showCard && cardRef.current && !cardRef.current.contains(e.target) &&
                btnRef.current && !btnRef.current.contains(e.target)) {
                setShowCard(false);
            }
        };

        document.addEventListener('mousedown', handleClick);
        return () => {
            document.removeEventListener('mousedown', handleClick);
        };
    })

    return (
        <>
            <div onClick={() => setShowCard(!showCard)} className="attendance-btn">
                <button ref={btnRef} className="atdbtn">
                    {status === 'present' ? 'Attendance Marked' : 'Mark Attendance'}
                </button>
            </div>
            {showCard && (
                <div className="attendance-box" ref={cardRef}>
                    <form onSubmit={handleSubmit} className="attendance-form">
                        <button
                            type="submit"
                            className="mrkbtn"
                            style={status === 'present'
                                ? { backgroundColor: 'green', color: 'white' }
                                : {backgroundColor: 'blue', color: 'white' }
                            }
                        >
                            Mark as Attendence
                        </button>
                    </form>
                </div>
            )}
        </>
    )
}