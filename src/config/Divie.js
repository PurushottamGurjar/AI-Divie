import {  GoogleGenerativeAI } from "@google/generative-ai";
import { ChatContext } from "../context/Context";
import { useContext } from "react";

const MY_AI_API_KEY=meta.process.env.MY_AI_API_KEY;

const ai = new  GoogleGenerativeAI({ apiKey: MY_AI_API_KEY });
const {prompt,setPrompt,
        apiResponse, setApiResponse,}=useContext(ChatContext);

async function GeminiResponse() {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents:`${prompt}`,
  });
  console.log(response.text);
  setApiResponse(response.text);
}

export default GeminiResponse;