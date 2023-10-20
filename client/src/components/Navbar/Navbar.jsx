import React from "react";
import Menu from "./Menu/Menu";
import { images } from "../../constants"
import "./Navbar.css"

const Navbar = (props) => {
    return (
        <nav className="app__navbar">
            <div className="navbar__logo-container">
                {/* <img src={images.logo} /> */}
                <h2>Easy</h2>
                <h1>Chat</h1>
            </div>
            <Menu showLogin={props.showLogin}/>
        </nav>
    )
}

export default Navbar