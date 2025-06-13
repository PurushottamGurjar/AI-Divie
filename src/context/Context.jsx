import React from 'react'
import {useState } from "react"
import { createContext } from 'react';
import runChat from '../config/Gemini';



export const ChatContext=createContext();

const Context = ({children}) => {
    const [isBar, setIsBar] = useState(false);
    const [prompt,setPrompt]=useState("Explain me about IIT Kharagpur");
    const [isResponse, setIsResponse]=useState(false);
    const [apiResponse, setApiResponse]=useState();
    

    const HandleSend= async ()=>{
        setIsResponse(true);
        setPrompt("");
        let response=await runChat("how does iits started give a long story");
        console.log("Hi is this working");
        console.log(response);
        

    }

    
    const ContextValues={
        isBar,setIsBar,
        prompt,setPrompt,
        isResponse, setIsResponse,
        apiResponse, setApiResponse,
        HandleSend,

    }

  return (
    <>
    <ChatContext.Provider value={ContextValues} >{children}</ChatContext.Provider>
      
    </>
  )
}

export default Context;
