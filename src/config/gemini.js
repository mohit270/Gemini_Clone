import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = "AIzaSyAsFXwRKDNF68oNYyLe6TTn-yhSTuYD_ns"; // safer in React/Vite

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const runChat = async (prompt) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent(prompt);

    const text = result.response.text();
    console.log("Gemini response:", text);

    return text;
  } catch (err) {
    console.error("Error in runChat:", err);
    // return "⚠️ Something went wrong.";
  }
};
export default runChat;
