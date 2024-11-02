import React, { useState } from 'react'
import "./SubmitButton.css"

const SubmitButton = ({ isLoading }) => {

    let activeClass = isLoading ? " spinner" : null
    return (
        <button 
            type='submit'
            className={`app__submit-button${activeClass}`}
        >
            <span>Bestätigen</span>
            <div></div>
        </button>
    )
}

export default SubmitButton
