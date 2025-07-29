import { useEffect, useRef, useState } from "react";
import { MarkAttendance } from "../../pages/student_pages/Mark_Attendence";
import { AttendanceHistoryFunction } from "../../pages/AttendanceHistoryFunction";

export const Attendence = () =>{
    const [showCard, setShowCard] = useState(false);
    const btnRef = useRef(null);
    const cardRef = useRef(null);

    const attendenceHandler = () =>{
        setShowCard(!showCard);
    }

    useEffect(() => {
        const handleClick = (e) =>{
            if(showCard 
                && cardRef.current
                && !cardRef.current.contains(e.target)
                && btnRef.current
                && !btnRef.current.contains(e.target)
            ){
                setShowCard(false);
            }
        }

        document.addEventListener('mousedown', handleClick);
        return () =>{
            document.removeEventListener('mousedown', handleClick);
        }
    })


    return (
        <>
            <div ref={btnRef}>
                <button className="btn" onClick={attendenceHandler}>Attendence</button>
            </div>
            <div className="card-box" ref={cardRef}>
                {showCard && (
                    <ul className="submenu">
                        <li className="atdlist">
                            <MarkAttendance/>
                        </li>
                        <li className="atdlist">
                            <AttendanceHistoryFunction/>
                        </li>
                    </ul>
                )}
            </div>
        </>
    )
}