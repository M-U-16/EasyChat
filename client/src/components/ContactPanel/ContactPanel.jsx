import React from 'react'
import "./ContactPanel.css"
import { images } from '../../constants'
import { socket } from '../../SOCKET/socket'

const ContactPanel = (props) => {

    const contact = props.contact
    
    const joinChat = () => {
        console.log(contact.room_id)
        props.setCurrentChat(contact.room_id)
        socket.emit(":join_room", {room_id: contact.room_id})
    }

    return (
        <div 
            className='app__chat-panel no-select'
            title={`Chat mit ${contact.username} öffnen`}
            onClick={joinChat}
        >
            <div className="panel__profile-wrapper">
                <div className="panel__profile-container">
                    {contact.newMessages > 0 && <p className="panel__profile-new-messages">{contact.newMessages}</p>}
                    <div className={`panel__status ${contact.status}`}></div>
                    <img className='no-select' src={images.testProfile} alt="Profile Bild" />
                </div>
            </div>
            <div className="panel__text-wrapper">
                <h1 className='app__panel-username'>{contact.username}</h1>
                <div className='app__panel-lastmessage-container'>
                    <h2>{contact.lastMessage.username}:</h2>
                    <p>{contact.lastMessage.message}</p>
                </div>
            </div>
        </div>
    )
}

export default ContactPanel
