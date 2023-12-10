import React from 'react'
import "./Message.css"
import images from '../../constants/images'

const Message = ({messageObj}) => {
    const {message, username, you} = messageObj
    const is_you = you ? " is-you-true": " is-you-false"
    
    return (
        <div className='message__container'>
            <div
                className={`chat__message ${is_you}`}
            >
                <div className="message__profile-container">
                    <img src={images.testProfile} />
                </div>
                <div className="message__text-content">
                    <p className="chat__message-name">
                        {username}:
                    </p>
                    <p className="chat__message-content">
                        {message}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Message
