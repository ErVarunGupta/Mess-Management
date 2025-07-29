import { use, useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";

export const Menu = () =>{

    const [menuCard, setMenuCard] = useState(false);
    const btnRef = useRef(null);
    const cardRef = useRef(null);

    const menuHandler = () =>{
        setMenuCard(!menuCard);
    }

    useEffect(() =>{
        const handleClick = (e) =>{
            if(menuCard
                && cardRef.current
                && !cardRef.current.contains(e.target)
                && btnRef.current
                && !btnRef.current.contains(e.target)
            ){
                setMenuCard(false);
            }
        }

        document.addEventListener('mousedown', handleClick);
        return () =>{
            document.removeEventListener('mousedown', handleClick);
        }
    })

    return(
        <>
            <div>
                <button 
                    className="btn"
                    onClick={menuHandler}
                    ref={btnRef}
                >Menu</button>
            </div>
            <div ref={cardRef}>
                {menuCard && (
                    <ul className="submenu">
                        <li>
                            <NavLink to="menu/create">Create Menu</NavLink>
                        </li>
                        <li>
                            <NavLink to="menu/update">Update Menu</NavLink>
                        </li>
                        <li>
                            <NavLink to="menu/show">Show Menu</NavLink>
                        </li>
                    </ul>
                )}
            </div>
        </>
    )
}