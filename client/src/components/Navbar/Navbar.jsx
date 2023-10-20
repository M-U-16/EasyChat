import React from "react";
import { Link } from "react-router-dom";

import "./Navbar.css"
import Menu from "./Menu/Menu";

const Navbar = (props) => {
    return (
        <nav className="app__navbar">
            <Link to={"/"} className="navbar__logo-container">
                <h2>Easy</h2>
                <h1>Chat</h1>
            </Link>
            <Menu showLogin={props.showLogin}/>
        </nav>
    )
}

export default Navbar