import React from 'react'
import "./MenuContainer.css"
import {motion} from "framer-motion"

const menuStates = {
    open: { opacity: 1, width: "15rem" },
    closed: { opacity: 0, width: 0 },
}

const MenuContainer = (props) => {

    return (
        <motion.div
            className='app__menu-container'
            animate={props.activeMenu ? "open" : "closed"}
            variants={menuStates}
            transition={{ duration: 0.5 }}
        >
            {props.children}
        </motion.div>
    )
}

export default MenuContainer
