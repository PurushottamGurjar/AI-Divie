import React from 'react'
import {useState } from "react"
import { createContext } from 'react';
import AIDivie from '../components/AIDivie';
import main from '../components/Main';



export const ChatContext=createContext();

const Context = ({children}) => {
    const [isBar, setIsBar] = useState(false);
    const [prompt,setPrompt]=useState("Explain me about IIT Kharagpur");
    const [isResponse, setIsResponse]=useState(false);
    const [apiResponse, setApiResponse]=useState();
    

    const HandleSend= async ()=>{
        setIsResponse(true);
        setPrompt("");
        console.log("Entering main");
        main();
        console.log("Exiting main");
        // const response= await AIDivie({prompt});
        // setApiResponse(response);

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
