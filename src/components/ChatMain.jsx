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
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [lastPrompt, setLastPrompt] = useState("");


  const delayPara=(i,word)=>{
    setTimeout(() => {
      setApiResponse(prev=>prev+word);
    }, 25*i);
  }


function formatGeminiResponse(rawText) {
  // Convert triple-backtick code blocks
  let formatted = rawText.replace(/```([\s\S]*?)```/g, (match, code) => {
    return `<pre class="code-block"><code>${escapeHtml(code.trim())}</code></pre>`;
  });

  // Convert **bold**
  formatted = formatted.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");

  // Convert `inline code`
  formatted = formatted.replace(/`([^`\n]+)`/g, "<code class='inline-code'>$1</code>");

  return formatted;
}

// Escape HTML to prevent injection
function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}






  const HandleSend = async () => {
    setIsResponse(true);
    setLastPrompt(prompt);
    setPrompt("");
    setIsLoading(true);
    let response = await runChat(prompt);
    let cleaned = formatGeminiResponse(response);
    setApiResponse(cleaned);
    console.log(response);




    // //taking headlines
    // let resArray=response.split("**");
    // let newboldArray=[""];
    // for(let i=0; i<resArray.length; i++){
    //   if(i%2==1){
    //     newboldArray+="<b>"+resArray[i]+"</b>";
    //   }
    //   else{
    //     newboldArray+=resArray[i];
    //   }
    // }

    // // adding in new lines
    // setApiResponse("");
    // let newbrArray=newboldArray.split("*").join("<br> <br>")
    // resArray=newbrArray.split(";").join("<br>");
    // let typeArray=resArray.split(" ");
    // for(let i=0; i<typeArray.length; i++){
    //   let word=typeArray[i]+" ";
    //   delayPara(i,word);
    // }
  
    

    setIsLoading(false);
  };

  return (
    <div className="chat-main">
      <div
        className="chat-sidebar-laptop"
        onMouseEnter={() => setIsBar(!isBar)}
        onMouseLeave={() => setIsBar(!isBar)}
        style={{ width: `${isBar ? 250 : 50}px` }}
      >
        <div className="chat-sidebar-first">
          <img
            className="chat-sidebar-eachicon chat-expand"
            src={myIcons.expand_icon}
            alt="Expand"
          />
          <div className="chat-sidebar-newchat-container">
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
            className="chat-sidebar-eachicon"
            src={myIcons.setting_icon}
            alt=""
          />
        </div>
      </div>
      <div
        className="chat-sidebar-tablet"
        onMouseEnter={() => setIsBar(!isBar)}
        onClick={() => setIsBar(!isBar)}
        style={{ width: `${isBar ? 250 : 50}px` }}
      >
        <div className="chat-sidebar-first">
          <img
            className="chat-sidebar-eachicon chat-expand"
            src={myIcons.expand_icon}
            alt="Expand"
          />
          <img
            className="chat-sidebar-eachicon chat-plus"
            src={myIcons.plus_icon}
            alt="New Chat"
          />
        </div>
        <div className="chat-sidebar-second">
          <img
            className="chat-sidebar-eachicon"
            src={myIcons.setting_icon}
            alt=""
          />
        </div>
      </div>

      <div className="chat-body">
        <div className="chat-header">
          <div className="chat-expand-name">
            <img
              className="chat-mobile-expand"
              src={myIcons.expand_icon}
              alt="Expand"
              onClick={() => setIsBar(!isBar)}
            />
            <div
              className="ai-name"
              style={{ marginLeft: `${isBar ? 270 : 70}px` }}
            >
              AI-Divie
            </div>
          </div>
          <div>
            <img className="chat-profile-img" src={myIcons.gibliImage} alt="image" />
          </div>
        </div>
        <div className="chat-main-content">
          {!isResponse && (
            <div className="chat-home-heading">
              Hi Developer , Welcome to AI-Divie
            </div>
          )}
          {!isResponse && (
            <div className="chat-home-subheading">
              Welcome to the AI- Divie . Divie stands for My Small World ( "
              Meri Choti si Duniya.. " )
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
                {isLoading ?
                  <div className="chat-loading-animation">
                    <hr className="loading-hr "/>
                    <hr className="loading-hr " />
                    <hr className="loading-hr" />
                  </div>
                :
                  <div
                    dangerouslySetInnerHTML={{ __html: apiResponse }}
                    className="response-text"
                  />
                }
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
                onClick={HandleSend}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMain;
