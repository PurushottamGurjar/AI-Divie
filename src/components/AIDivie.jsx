import React from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";


const AIDivie = async ({ prompt }) => {
  const MY_AI_API_KEY = import.meta.env.VITE_MY_AI_API_KEY;
  const ai = new GoogleGenerativeAI({ apiKey: MY_AI_API_KEY });

  console.log("API KEY:", MY_AI_API_KEY);
  console.log("hellow");
  console.log("Is this working or not")

  const model=ai.getGenerativeModel({model: "gemini-2.0-flash"});
   const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = await response.text();

  console.log(text);

  return text;




};

export default AIDivie;
