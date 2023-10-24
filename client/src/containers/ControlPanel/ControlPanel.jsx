import React from 'react'
import "./ControlPanel.css"
import { icons } from '../../constants'

const ControlPanel = () => {
  return (
    <div className='chat__side-control-container'>
      <div>
        <button>+</button>
      </div>
      <div>
        <input type="text" />
        <button className='search-button'>
          <img src={icons.searchIcon} />
        </button>
      </div>
    </div>
  )
}

export default ControlPanel
