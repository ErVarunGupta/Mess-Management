import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";

export const Show_Details = ({data})=>{
    const [showCard, setShowCard] = useState(false);
    const cardRef = useRef(null);
    const btnRef = useRef(null);

    const handleShowCard = () =>{
        setShowCard(!showCard);
    }

    useEffect(() =>{
        const handleClick = (e) =>{
            if(showCard
                && btnRef.current
                && !btnRef.current.contains(e.target)
                && cardRef.current
                && !cardRef.current.contains(e.target)
            ){
                setShowCard(false)
            }
        }

        document.addEventListener('mousedown', handleClick);
        return () =>{
            document.removeEventListener('mousedown', handleClick);
        }
    })

    console.log(data);

    var status = data.daily_attendance.status;
    status = status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();

    return (
        <>
            <div className="btn-section">
                <button className="show-btn" onClick={handleShowCard} ref={btnRef}>Show</button>
            </div>
            {showCard && (
                <div className="profile-card"  ref={cardRef}>
                    <div  className="profile-info" >
                        <p><span>Name: </span>{data.name || 'N/A'}</p>
                        <p><span>Email: </span>{data.email || 'N/A'}</p>
                        <p><span>Contact: </span>{data.contact || 'N/A'}</p>
                        <p><span>Institute: </span>{data.institute || 'N/A'}</p>
                        <p><span>Department: </span>{data.department || 'N/A'}</p>
                        <p><span>Semester: </span>{data.semester || 'N/A'}</p>
                        <p><span>Registration No.: </span>{data.registration_no || 'N/A'}</p>
                        <p><span>Roll Number: </span>{data.roll_no || 'N/A'}</p>
                        <p><span>Active Days: </span>{data.total_attendance || 0}</p>
                        <p><span>Today Activity: </span>{status}</p>
                    </div>
                </div>
            )}
        </>
    )
}