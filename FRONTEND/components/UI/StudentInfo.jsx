import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";

export const StudentInfo = () =>{
    const [showCard, setShowCard] = useState(false);
    const btnRef = useRef(null);
    const cardRef = useRef(null);

    const infoHandler = () =>{
        setShowCard(!showCard);
    }

    useEffect(() =>{
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
            <div>
                <button 
                    className="btn"
                    onClick={infoHandler}
                    ref={btnRef}>Students Info</button>
            </div>
            <div ref={cardRef}>
                {showCard && (
                    <ul className="submenu">
                        <li>
                            <NavLink to="/student/all">Total Students</NavLink>
                        </li>
                        <li>
                            <NavLink to="/student/active">Active Students</NavLink>
                        </li>
                    </ul>
                )}
            </div>
        </>
    )
}