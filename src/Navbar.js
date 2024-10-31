// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { FaHome, FaEdit, FaBookmark, FaUser, FaHeadset } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

function Navbar({ userId }) {
    const location=useLocation()
    console.log(location.state)
    console.log(userId)
    return (
        <nav className="navbar">
            <ul>
                <li>
                    <Link to={{ pathname: "/", state: { userId } }} title="Home">
                        <FaHome />
                    </Link>
                </li>
                <li>
                    <Link to={{ pathname: "/posts", state: { userId } }} title="Posts">
                        <FaEdit />
                    </Link>
                </li>
                {/* <li>
                    <Link to={{ pathname: "/saved", state: { userId } }} title="Saved Articles">
                        <FaBookmark />
                    </Link>
                </li> */}
                <li>
                    <Link to={{ pathname: "/user-profile", state: { userId } }} title="Profile">
                        <FaUser />
                    </Link>
                </li>
                <li>
                    <Link to={{ pathname: "/support", state: { userId } }} title="Support">
                        <FaHeadset />
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
