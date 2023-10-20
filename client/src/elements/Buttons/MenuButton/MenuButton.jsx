import React from 'react'
import "./MenuButton.css"

import { useState } from 'react'
import { Link } from 'react-router-dom'

const MenuButton = (props) => {

    
    let activeClass = props.activeMenu ? " active-menu-button" : "" 
    const toggleMenu = () => {
        props.setActiveMenu(prev => !prev)
    }

    return (
        <button 
            className={`app__menu-button${activeClass}`}
            onClick={toggleMenu}
        >
            <span></span>
            <span></span>
            <span></span>
        </button>
    )
}

export default MenuButton
