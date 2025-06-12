import { GoogleGenerativeAI } from "@google/generative-ai";

const MY_AI_API_KEY = import.meta.env.VITE_MY_AI_API_KEY;
console.log("inside main before api validate");
const ai = new GoogleGenerativeAI({ apiKey: MY_AI_API_KEY});
console.log("this is my api inside main " , MY_AI_API_KEY)

async function main() {
    console.log("inside main after call");
  
  const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });

  const result = await model.generateContent("How does AI work?");
  const response = result.response;
  const text = await response.text();

  console.log("Inside main");
  console.log(text);
}

export default main;