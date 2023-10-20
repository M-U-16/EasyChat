import React from 'react'
import {Link} from "react-router-dom"
import { images } from '../../../constants'
import "./ActionButton.css"

const ActionButton = (props) => {
  return (
    <Link to={props.action} className="app__action-button">
        <span>{props.content}</span>
    </Link>
  )
}

export default ActionButton
