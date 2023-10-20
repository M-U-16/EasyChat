import React, { useState } from 'react'
import "./SubmitButton.css"

const SubmitButton = (props) => {
    const isActive = props.isLoading  
    let activeClass = isActive ? " spinner" : null

    return (
        <button 
            type='submit'
            className={`app__submit-button${activeClass}`}
            /* onClick={handleClick} */
        >
            <span>Bestätigen</span>
            <div></div>
        </button>
    )
}

export default SubmitButton
