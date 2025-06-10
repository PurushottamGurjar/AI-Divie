import React, { useState } from 'react'
import "./chatmain.css"
import reactsvg from "../assets/react.svg"

const ChatMain = () => {
    const [barlength,setBarlength]=useState(true)
  return (
    <div className='chat-main'>
        <div className="sidebar" onClick={() => setBarlength(!barlength)} style={{ width: `${barlength?250:50}px` }}
>

        </div>
        <div className="chat-body" style={{width: `calc(100vw - 50px)`}}>
            <div className="chat-header">
                <div className="ai-name">AI-Divie</div>
                <div>
                    <img className='chat-profile-img' src={reactsvg} alt="image" />
                </div>
            </div>
            <div className="chat-main-content"></div>
            <div className="chat-search-box">
                <div className="chat-search-box-inner"></div>
            </div>
        </div>
      
    </div>
  )
}

export default ChatMain
