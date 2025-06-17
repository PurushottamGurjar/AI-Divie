import React, { useRef, useState, useEffect } from "react";
import "./chatmain.css";
import reactsvg from "../assets/react.svg";
import { myIcons } from "../assets/myassets";
import runChat from "../config/Gemini";

const ChatMain = () => {
  const [isBar, setIsBar] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [isResponse, setIsResponse] = useState(false);
  const [apiResponse, setApiResponse] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [prevPrompts, setPrevPrompts] = useState([
    
  ]);
  const [lastPrompt, setLastPrompt] = useState("");
  const [isMenu, setIsMenu] = useState(false);

  const delayPara = (i, word) => {
    setTimeout(() => {
      setApiResponse((prev) => prev + word);
    }, 25 * i);
  };
 
  const escapeHtml = (str) => {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  };
  const HandleSend = async (prompt) => {
    setIsResponse(true);
    setLastPrompt(prompt);
    setPrevPrompts((prev) => [prompt,...prev]);
    setPrompt("");
    setIsLoading(true);

    let response = await runChat(prompt);

    //Extract code blocks and replace with placeholders
    const codeBlocks = [];
    response = response.replace(/```([\s\S]*?)```/g, (match, code) => {
      const escapedCode = `<pre class="code-block"><code>${escapeHtml(
        code.trim()
      )}</code></pre>`;
      codeBlocks.push(escapedCode);
      return `[[CODE_BLOCK_${codeBlocks.length - 1}]]`;
    });

    //handle bold text
    let resArray = response.split("**");
    let newboldArray = "";
    for (let i = 0; i < resArray.length; i++) {
      if (i % 2 === 1) {
        newboldArray += "<b>" + resArray[i] + "</b>";
      } else {
        newboldArray += resArray[i];
      }
    }

    // replacing * ; with break
    let newbrArray = newboldArray.split("*").join("<br><br>");
    newbrArray = newbrArray.split(";").join("<br>");

    // numerating the reesponse
    newbrArray = newbrArray.replace(/(?<!<br>)\s*(\d+\.)/g, "<br>$1");

    const typeArray = newbrArray.split(" ");

    // Typing animation on clean text with placeholders
    setApiResponse("");
    let temp = "";

    for (let i = 0; i < typeArray.length; i++) {
      const word = typeArray[i] + " ";
      setTimeout(() => {
        temp += word;
        setApiResponse(temp);
      }, 25 * i);
    }

    //Final replacement of placeholders with actual code blocks
    setTimeout(() => {
      let final = temp;
      codeBlocks.forEach((block, index) => {
        final = final.replace(`[[CODE_BLOCK_${index}]]`, block);
      });
      setApiResponse(final);
    }, 25 * typeArray.length + 100);

    setIsLoading(false);
  };

  const HandleEnter=(e)=>{
    if(e.key==="Enter" && !e.ShiftKey){
      e.preventDefault();
      HandleSend(prompt);

    }
  }

  return (
    <div className="chat-main">
      <div
        className="chat-sidebar-laptop"
        onMouseEnter={() => setIsBar(!isBar)}
        onMouseLeave={() => setIsBar(!isBar)}
        style={{ width: `${isBar ? 250 : 50}px` }}
      >
        {!isBar ?
          <div className=""> 
          <div className="chat-sidebar-first">
          <img
            className="chat-sidebar-eachicon chat-expand"
            src={myIcons.expand_icon}
            alt="Expand"
            onClick={() => setIsMenu(true)}
          />
          <div className="chat-sidebar-newchat-container"
         
          >
            <img
              className="chat-sidebar-eachicon chat-plus"
              src={myIcons.plus_icon}
              alt="New Chat"
            />
            {isBar && <div className="chat-sidebar-newchat-text">New chat</div>}
          </div>
        </div>
        <div className="chat-sidebar-second">
          <img
            className="chat-sidebar-eachicon chat-setting"
            src={myIcons.setting_icon}
            alt=""
          />
        </div>
          </div> :
          <div className="">
             <div className="ai-name-expand" style={{marginBottom:"20px"}}>
                  <img
                    className="chat-mobile-expand"
                    src={myIcons.expand_icon}
                    alt="Expand"
                    onClick={() => setIsMenu(false)}
                    style={{width:"25px"}}
                  />
                  <div
                    className="ai-name"
                    style={{fontSize:'20px', marginTop:"3px" , color:"white"}}
                   
                  >
                  Menu
                  </div>
                </div>
                <div className="mobile-first" style={{marginBottom:"20px"}}
                 onClick={()=>setIsResponse(false)}
                >
                  <img
                    src={myIcons.plus_icon}
                    alt=""
                    className="mobile-newchat-icon"
                  />
                  <p className="mobile-newchat">New Chat</p>
                </div>
                <div className="mobile-setting">
                  <img
                    src={myIcons.setting_icon}
                    alt=""
                    className="mobile-setting-img"
                  />
                  <p className="mobile-setting-text">Settings</p>
                </div>
                <div className="mobile-recent-prompt-container">
                  <p className="recent-text">Recent Chats</p>
                
                    <div className="each-recent-prompt">
                      {prevPrompts.map((item, idx) => (
                        <div key={idx} className="recent-prompt-item"
                        onClick={async()=>{
                          await setPrompt(item);
                          await HandleSend(item);
                        }}
                        >
                          <img
                            src={myIcons.message_icon}
                            alt=""
                            className="recent-prompt-message-img"
                          />
                          <p className="prev-prompt-menu">
                            {item.slice(0, 50)}...
                          </p>
                        </div>
                      ))}
                    </div>
                </div>

          </div>
        }

      </div>
      <div className="chat-body">
        <div className="chat-header">
          <div className="chat-expand-name">
            <img
              className="chat-mobile-expand"
              src={myIcons.expand_icon}
              alt="Expand"
              onClick={() => setIsMenu(true)}
            />

            {isMenu && (
              <div className="chat-mobile-sidebar">
                <div className="ai-name-expand">
                  <img
                    className="chat-mobile-expand"
                    src={myIcons.expand_icon}
                    alt="Expand"
                    onClick={() => setIsMenu(false)}
                  />
                  <div
                    className="ai-name"
                    style={{ marginLeft: `${isBar ? 250 : 50}px` }}
                  >
                    AI-Divie
                  </div>
                </div>
                <div className="mobile-first"
                 onClick={()=>setIsResponse(false)}
                >
                  <img
                    src={myIcons.plus_icon}
                    alt=""
                    className="mobile-newchat-icon"
                  />
                  <p className="mobile-newchat">New Chat</p>
                </div>
                <div className="mobile-setting">
                  <img
                    src={myIcons.setting_icon}
                    alt=""
                    className="mobile-setting-img"
                  />
                  <p className="mobile-setting-text">Settings</p>
                </div>
                <div className="mobile-recent-prompt-container">
                  <p className="recent-text">Recent Chats</p>
                
                    <div className="each-recent-prompt">
                      {prevPrompts.map((item, idx) => (
                        <div key={idx} className="recent-prompt-item"
                        onClick={async()=>{
                          await setPrompt(item);
                          await HandleSend(item);
                        }}
                        >
                          <img
                            src={myIcons.message_icon}
                            alt=""
                            className="recent-prompt-message-img"
                          />
                          <p className="prev-prompt-menu">
                            {item.slice(0, 50)}...
                          </p>
                        </div>
                      ))}
                    </div>
                </div>
              </div>
            )}

            <div
              className="ai-name"
              style={{ marginLeft: `${isBar ? 250 : 50}px` }}
            >
              AI-Divie
            </div>
          </div>
          <div>
            <img
              className="chat-profile-img"
              src={myIcons.gibliImage}
              alt="image"
              onClick={()=>window.open("https://purushottam-gurjar.vercel.app" ,"_blank")}
            />
          </div>
        </div>
        <div className="chat-main-content">
          

          {!isResponse && (
            <div className="welcome-container">
              <div className="chat-home-content-heading">
                Welcome to AI-Divie
              </div>
              <div className="chat-home-content-subheading">
                <span className="highlight">AI-Divie</span> - Your Personal AI Assistant
                <br />
                
              </div>
            </div>
          )}


          {isResponse && (
            <div className="chat-response-container">
              <div className="prompt-container">
                <img
                  className="response-prompt-img"
                  src={myIcons.gibliImage}
                  alt="AI-Divie"
                />
                <div className="response-prompt-text">{lastPrompt}</div>
              </div>
              <div className="response-container">
                <img
                  className="gemini-response-img"
                  src={myIcons.aiDivieImg}
                  alt=""
                />
                {isLoading ? (
                  <div className="chat-loading-animation">
                    <hr className="loading-hr " />
                    <hr className="loading-hr " />
                    <hr className="loading-hr" />
                  </div>
                ) : (
                  <div
                    dangerouslySetInnerHTML={{ __html: apiResponse }}
                    className="response-text"
                  />
                )}
              </div>
            </div>
          )}
        </div>
        <div className="chat-search-box">
          <div className="chat-search-box-inner">
            <div className="search-body-first">
              <textarea
                className="chat-search-prompt"
                type="text"
                value={prompt}
                placeholder="How can i help you ?"
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={HandleEnter}
              />
            </div>
            <div className="search-body-second">
              <div className="search-body-second-first">
                <img
                  src={myIcons.plus_icon}
                  alt=""
                  className="search-box-plus"
                />
                <div className="search-box-deepsearch"> Research</div>
                <div className="search-box-deepsearch">Reasoning</div>
              </div>
              <img
                src={myIcons.send_icon}
                alt="send"
                className="search-box-plus"
                onClick={()=>HandleSend(prompt)}
              />
            </div>
          </div>
        </div>
        <p className="chat-footer">&copy; AI-Divie | Purushottam Gurjar 2025</p>
      </div>
    </div>
  );
};

export default ChatMain;
