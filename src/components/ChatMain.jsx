import React, { useState } from 'react'
import "./chatmain.css"
import reactsvg from "../assets/react.svg"

const ChatMain = () => {
    const [isBar,setIsBar]=useState(false)
  return (
    <div className='chat-main'>
        <div className="chat-sidebar-laptop" onMouseEnter={() => setIsBar(!isBar)} 
                                 onMouseLeave={()=>setIsBar(!isBar)}
                                style={{ width: `${isBar?250:50}px` }}
>
        </div>
        <div className="chat-sidebar-tablet" onMouseEnter={() => setIsBar(!isBar)} 
                                onClick={()=>setIsBar(!isBar)}
                                style={{ width: `${isBar?250:50}px` }}
>

        </div>

        <div className="chat-body" >
            <div className="chat-header">
                <div className="ai-name" style={{marginLeft:`${isBar?250:50}px`}}>AI-Divie</div>
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
