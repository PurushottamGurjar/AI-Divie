import React, { useRef, useState } from "react";
import "./chatmain.css";
import reactsvg from "../assets/react.svg";
import { myIcons } from "../assets/myassets";
import { useContext } from "react";
import { ChatContext } from "../context/Context";



const ChatMain = () => {

  const {isBar,setIsBar,
        prompt,setPrompt,
        isResponse, setIsResponse,
        apiResponse, setApiResponse,
        HandleSend


  }=useContext(ChatContext);



  console.log(prompt);
  return (
    <div className="chat-main">
      <div
        className="chat-sidebar-laptop"
        onMouseEnter={() => setIsBar(!isBar)}
        onMouseLeave={() => setIsBar(!isBar)}
        style={{ width: `${isBar ? 250 : 50}px` }}
      >
        <div className="chat-sidebar-first">
          <img  className="chat-sidebar-eachicon chat-expand" src={myIcons.expand_icon} alt="Expand" />
          <div className="chat-sidebar-newchat-container">
             <img  className="chat-sidebar-eachicon chat-plus"  src={myIcons.plus_icon} alt="New Chat" />
             {isBar &&  <div className="chat-sidebar-newchat-text">New chat</div>
              }
          </div>
        </div>
        <div className="chat-sidebar-second">
          <img className="chat-sidebar-eachicon"  src={myIcons.setting_icon} alt="" />
        </div>
      </div>
      <div
        className="chat-sidebar-tablet"
        onMouseEnter={() => setIsBar(!isBar)}
        onClick={() => setIsBar(!isBar)}
        style={{ width: `${isBar ? 250 : 50}px` }}
      >
        <div className="chat-sidebar-first">
          <img  className="chat-sidebar-eachicon chat-expand" src={myIcons.expand_icon} alt="Expand" />
          <img  className="chat-sidebar-eachicon chat-plus"  src={myIcons.plus_icon} alt="New Chat" />
        </div>
        <div className="chat-sidebar-second">
          <img className="chat-sidebar-eachicon"  src={myIcons.setting_icon} alt="" />
        </div>
      </div>

      <div className="chat-body">
        <div className="chat-header">
            <div className="chat-expand-name">
                <img  className="chat-mobile-expand" src={myIcons.expand_icon} alt="Expand" onClick={()=>setIsBar(!isBar)}/>
          <div
            className="ai-name"
            style={{ marginLeft: `${isBar ? 270 : 70}px` }}
          >
            AI-Divie
          </div>
            </div>
          <div>
            <img className="chat-profile-img" src={reactsvg} alt="image"  />
          </div>
        </div>
        <div className="chat-main-content">
            {!isResponse && <div className="chat-home-heading">Hi Developer , Welcome to AI-Divie</div>}
            {!isResponse && <div className="chat-home-subheading">Welcome to the AI- Divie . Divie stands for My Small World ( " Meri Choti si Duniya.. " )</div>}

        </div>
        <div className="chat-search-box">
          <div className="chat-search-box-inner">
            <div className="search-body-first">
              <textarea 
              className="chat-search-prompt"
              type="text" 
              value={prompt}
              placeholder="How can i help you ?"
              onChange={(e)=>setPrompt(e.target.value)}
            />
            </div>
            <div className="search-body-second">
              <div className="search-body-second-first">
                <img src={myIcons.plus_icon} alt="" className="search-box-plus" />
              <div className="search-box-deepsearch"> Research</div>
              <div className="search-box-deepsearch">Reasoning</div>
              </div>
              <img src={myIcons.send_icon} alt="send" className="search-box-plus" onClick={HandleSend} />
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMain;
