import { NavLink } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState, useEffect } from "react";
import { Profile } from "./Profile";
import { Menu } from "./Menu";
import { Home } from "./Home";
import { StudentInfo } from "./StudentInfo";
import { Attendence } from "./Attendence";

export const Navbar = () => {
  const [show, setShow] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authMode, setAuthMode] = useState(null); // null | 'signin' | 'signup'
  const [menuOption, setMenuOption] = useState(false);

  const handleButtontoggle = () => setShow(!show);
  const category = localStorage.getItem('category');

  const handleAuthClick = (mode) => {
    setAuthMode(mode);
  };

  const handleBack = () => {
    setAuthMode(null);
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // Handler for toggling the menu options
  const menuHandler = () => {
    setMenuOption((prev) => !prev)
  };

  return (
    <div className="container">
      <div className="grid navbar-grid">
        <div className="Logo">
          <NavLink to="/">
            <h1>Mess Management</h1>
          </NavLink>
        </div>

        <nav className={show ? "menu-mobile" : "menu-web"}>
          <ul className="nav-items">
            {!isLoggedIn ? (
              authMode === null ? (
                <>
                  <li>
                    <button onClick={() => handleAuthClick("signin")}>Sign In</button>
                  </li>
                  <li>
                    <button onClick={() => handleAuthClick("signup")}>Sign Up</button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink to={`/${authMode}/manager`}>Manager</NavLink>
                  </li>
                  <li>
                    <NavLink to={`/${authMode}/student`}>Student</NavLink>
                  </li>
                  <li>
                    <button onClick={handleBack}>⬅ Back</button>
                  </li>
                </>
              )
            ) : (
              <>
                <li>
                  <Home/>
                </li>
                {category === 'manager' && (
                  <li>
                    <StudentInfo/>
                  </li>
                )}
                {category === 'student' && (
                  <li>
                    <Attendence/>
                  </li>
                )}
                <li>
                  <Menu/>
                </li>
                <li>
                  <Profile/>
                </li>
              </>
            )}
          </ul>
        </nav>

        <div className="ham-menu">
          <button onClick={handleButtontoggle}>
            <GiHamburgerMenu />
          </button>
        </div>
      </div>
    </div>
  );
};
