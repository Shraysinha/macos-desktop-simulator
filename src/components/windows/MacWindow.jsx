import React from 'react'
import { Rnd } from 'react-rnd'
import "./window.scss"

const MacWindow = ({children, width="60vw", height="60vh" , windowName,setWindowsState}) => {
  return (
    <Rnd
    default={{
      width: width,
      height: height,
      x:200,
      y:120
    }}
    >
      <div className="window">
        <div className="nav">
          <div className="dots">
            <div onClick={() => setWindowsState(state => ({...state, [windowName]: false}))} className="dot red"></div>
            <div className="dot yellow"></div>
            <div className="dot green"></div>
          </div>


          <div className="title"><p>shraypriyadarshi - zsh</p></div>

        </div>
        <div className="main-content">
          {children}
        </div>
      </div>
    </Rnd>
  )
}

export default MacWindow
