import { useEffect, useRef, useState } from "react";
import {useNavigate} from 'react-router-dom';
import { IoPersonSharp } from "react-icons/io5";
import { handleError, handleSuccess } from "../Layout/utils";
import { ToastContainer } from "react-toastify";

export const Profile = () => {
    const [user, setUser] = useState({});
    const [showCard, setShowCard] = useState(false);
    const navigate = useNavigate();

    const cardRef = useRef(null);
    const btnRef = useRef(null);

    useEffect(() =>{
        const fetchUser = async () =>{
            const token = localStorage.getItem('token');
            if(!token){
                handleError('You are not logged in.');
                return;
            }

            try {
                const decodedToken = JSON.parse(atob(token.split('.')[1]));
                const id = decodedToken.id;
                // console.log(id);

                const url = `http://localhost:8080/root/user/${id}`;

                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization' : `${token}`
                    }
                })

                const data = await response.json();
                const {success, message} = data;
                // console.log("data", data);

                if(success){
                    setUser(data.data || {});
                }else{
                    handleError(message);
                }
            } catch (error) {
                // console.log(error);
                handleError('Something went wrong');
            }
        };

        fetchUser();
    },[navigate])

    const category = user.category || 'N/A';

    const profileHandler = () =>{
        // console.log(user.name);
        setShowCard(!showCard);
    }

    useEffect(() =>{
        const handleClick = (e) =>{
            if(showCard && 
                cardRef.current && 
                !cardRef.current.contains(e.target) &&
                btnRef.current &&
                !btnRef.current.contains(e.target)
            ){
                setShowCard(false);
            }
        }

        document.addEventListener("mousedown", handleClick);
        return () => {
        document.removeEventListener("mousedown", handleClick);
        };
    })

    const handleLogout = (e) =>{
        e.preventDefault();
        localStorage.removeItem('name') ;
        localStorage.removeItem('token');
        handleSuccess('Logout Successful!');
        setTimeout(()=>{
            navigate("/");
            window.location.reload();
        }, 1000)
    }


  return (
    <>
        <div>
            <button
                onClick={profileHandler}
                className="profile-button1"
                ref={btnRef}
            >
                Profile
            </button>
        </div>
        {showCard && (
            <div className="profile-card" ref={cardRef}>
                <h2>User Profile</h2>
                <hr />
                {category === 'manager' && (
                    <div className="profile-info">
                        <p><span>Name: </span>{user.name || 'N/A'}</p>
                        <p><span>Email: </span>{user.email || 'N/A'}</p>
                        <p><span>Phone: </span>{user.contact || 'N/A'}</p>
                        <p><span>Institute: </span>{user.institute || 'N/A'}</p>
                        <p><span>Category: </span>{user.category || 'N/A'}</p>
                    </div>
                )}
                {category === 'student' && (
                    <div className="profile-info">
                        <p><span>Name: </span>{user.name || 'N/A'}</p>
                        <p><span>Email: </span>{user.email || 'N/A'}</p>
                        <p><span>Phone: </span>{user.contact || 'N/A'}</p>
                        <p><span>Institute: </span>{user.institute || 'N/A'}</p>
                        <p><span>Department: </span>{user.department || 'N/A'}</p>
                        <p><span>Semester: </span>{user.semester || 'N/A'}</p>
                        <p><span>Registration No.: </span>{user.registration_no || 'N/A'}</p>
                        <p><span>Roll No.: </span>{user.roll_no || 'N/A'}</p>
                        <p><span>Today Attendance Status: </span>{user.daily_attendance.status || 'N/A'}</p>
                        <p><span>Total Attendance: </span>{user.total_attendance || 0}</p>
                        <p><span>Category: </span>{user.category || 'N/A'}</p>
                    </div>
                )}
                <hr />

                <div className="logout-box">
                    <button onClick={handleLogout}
                        className="logout-btn"
                     >Logout</button>
                </div>
            </div>
        )}
        <ToastContainer/>
    </>
  )
}
