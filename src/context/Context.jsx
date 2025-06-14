import React from "react";
import { useState, useEffect } from "react";
import { createContext } from "react";
import runChat from "../config/Gemini";

export const ChatContext = createContext();

const Context = ({ children }) => {
  const [isBar, setIsBar] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [isResponse, setIsResponse] = useState(false);
  const [apiResponse, setApiResponse] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [recentPrompt, setRecentPrompt] = useState("");

  const HandleSend = async () => {
    // setIsResponse(true);
    // const lastprompt = prompt;
    // setIsLoading(true);
    // let response = await runChat(prompt);
    // setIsLoading(false);
    // setRecentPrompt(prompt);
    
    // setPrevPrompts((prev) => [...prev, prompt]);
    // setPrompt("");
    setIsResponse(true);
    let response=await runChat(prompt);
    setApiResponse(response);

  };

  const ContextValues = {
    isBar,
    setIsBar,
    prompt,
    setPrompt,
    isResponse,
    setIsResponse,
    apiResponse,
    setApiResponse,
    HandleSend,
  };

  return (
    <>
      <ChatContext.Provider value={ContextValues}>
        {children}
      </ChatContext.Provider>
    </>
  );
};

export default Context;
