import React from 'react'
import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({ apiKey: "YOUR_API_KEY" });

export const GeminAPI = () => {
    async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: "Explain how AI works in a few words",
  });
  console.log("Hi is this working or not tell me clearly")
  console.log(response.text);
}
  main();
  return (
    <div>
      
    </div>
  )
}

export default GeminAPI
