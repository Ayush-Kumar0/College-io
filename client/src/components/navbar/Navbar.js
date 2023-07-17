import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import AuthContext from '../../contexts/auth/authContext';
import AuthState from '../../contexts/auth/authState';
import "./navbarStyles.css"

function Navbar({ page }) {
    const nav = useNavigate();
    // Login state
    const [login, setLogin] = useContext(AuthContext);

    const handleSignout = async (e) => {
        e.preventDefault();
        let res = await fetch(`${process.env.REACT_APP_SERVER_URL}/auth/logout`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });
        if (res.status === 200) {
            setLogin(false);
            nav('/');
        } else {
            console.log('Could not logout');
        }
    }


    // Other states and functions
    const [hamburger, setHamburder] = useState(false);
    const handleHamburgerClick = () => {
        setHamburder(!hamburger);
    }

    return (
        <>
            <Nav>
                <NavLink to="/">
                    <svg id="logo-15" width="49" height="48" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M24.5 12.75C24.5 18.9632 19.4632 24 13.25 24H2V12.75C2 6.53679 7.03679 1.5 13.25 1.5C19.4632 1.5 24.5 6.53679 24.5 12.75Z" className="ccustom" fill="#17CF97"></path> <path d="M24.5 35.25C24.5 29.0368 29.5368 24 35.75 24H47V35.25C47 41.4632 41.9632 46.5 35.75 46.5C29.5368 46.5 24.5 41.4632 24.5 35.25Z" className="ccustom" fill="#17CF97"></path> <path d="M2 35.25C2 41.4632 7.03679 46.5 13.25 46.5H24.5V35.25C24.5 29.0368 19.4632 24 13.25 24C7.03679 24 2 29.0368 2 35.25Z" className="ccustom" fill="#17CF97"></path> <path d="M47 12.75C47 6.53679 41.9632 1.5 35.75 1.5H24.5V12.75C24.5 18.9632 29.5368 24 35.75 24C41.9632 24 47 18.9632 47 12.75Z" className="ccustom" fill="#17CF97"></path> </svg>
                </NavLink>

                <div>
                    <ul id="navbar0" className={hamburger ? "#navbar0 active" : "#navbar0"}>
                        <li>
                            <NavLink className={page === 'Home' ? "active" : ""} to="/">Home</NavLink>
                        </li>
                        {
                            login ?
                                <>
                                    <li>
                                        <NavLink className={page === 'Feed' ? "active" : ""} to="/feed">Feed</NavLink>
                                    </li>
                                    <li>
                                        <NavLink className={page === 'Dashboard' ? "active" : ""} to="/dashboard">Dashboard</NavLink>
                                    </li>
                                </>
                                : null
                        }
                        {
                            !login ?
                                <>
                                    <li>
                                        <NavLink to="/signin">LogIn</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/signup">SignUp</NavLink>
                                    </li>
                                </>
                                :
                                <>
                                    <li>
                                        <NavLink to="/signout" onClick={handleSignout}>SignOut</NavLink>
                                    </li>
                                </>
                        }
                    </ul>
                </div>

                <div id="mobile" onClick={handleHamburgerClick}>
                    <i id="bar" className={hamburger ? "fas fa-times" : "fas fa-bars"}></i>
                </div>
            </Nav>
        </>
    );
}

const Nav = styled.nav`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #1b2430;
    padding: 20px 80px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.06);
`;

export { Navbar };